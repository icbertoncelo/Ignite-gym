import { TokenInfo } from '@dtos/sign'
import { AppError } from '@utils/AppError'
import { getTokensFromStorage, setTokensOnStorage } from '@utils/auth'
import { isExpiredTokenError, isUnauthorizedError } from '@utils/http'
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  isAxiosError,
} from 'axios'

type SignOut = () => void
type PromiseType = {
  onSuccess: (token: string) => void
  onFailure: (error: AxiosError) => void
}
interface ApiInstanceProps extends AxiosInstance {
  registerInterceptTokenManager: (signOut: SignOut) => () => void
}

const api = axios.create({
  baseURL: 'http://192.168.15.165:3333',
}) as ApiInstanceProps

let isRefreshing = false
let failedQueue: PromiseType[] = []

api.registerInterceptTokenManager = (signOut) => {
  const interceptorManager = api.interceptors.response.use(
    (response) => response,
    async (requestError: AxiosResponse) => {
      if (isAxiosError(requestError) && requestError.response) {
        if (isUnauthorizedError(requestError.response?.status)) {
          if (isExpiredTokenError(requestError.response.data?.message)) {
            const authTokens = await getTokensFromStorage()

            if (!authTokens?.refresh_token) {
              signOut()
              return Promise.reject(requestError)
            }

            const originalRequest = requestError.config

            if (isRefreshing) {
              return new Promise((resolve, reject) => {
                failedQueue.push({
                  onSuccess(token) {
                    originalRequest.headers.Authorization = `Bearer ${token}`
                    resolve(api(originalRequest))
                  },
                  onFailure(error) {
                    reject(error)
                  },
                })
              })
            }

            isRefreshing = true

            // eslint-disable-next-line no-async-promise-executor
            return new Promise(async (resolve, reject) => {
              try {
                const { data } = await api.post<TokenInfo>(
                  'sessions/refresh-token',
                  { refresh_token: authTokens.refresh_token },
                )
                await setTokensOnStorage({
                  refresh_token: data.refresh_token,
                  token: data.token,
                })

                if (originalRequest.data) {
                  originalRequest.data = JSON.parse(originalRequest.data)
                }

                originalRequest.headers.Authorization = `Bearer ${data.token}`
                api.defaults.headers.common.Authorization = `Bearer ${data.token}`

                failedQueue.forEach((request) => {
                  request.onSuccess(data.token)
                })
                resolve(api(originalRequest))
              } catch (err) {
                const error = err as AxiosError
                failedQueue.forEach((request) => {
                  request.onFailure(error)
                })

                signOut()
                reject(error)
              } finally {
                isRefreshing = false
                failedQueue = []
              }
            })
          }

          signOut()
        }

        return Promise.reject(new AppError(requestError.response.data.message))
      }

      return Promise.reject(requestError)
    },
  )

  return () => {
    api.interceptors.response.eject(interceptorManager)
  }
}

export { api }
