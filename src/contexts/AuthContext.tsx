import { SignInFormData } from '@dtos/sign'
import { User } from '@dtos/user'
import { api } from '@services/api'
import { storageRemoveItem } from '@utils/storage'
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { AUTH_TOKEN_STORAGE, USER_STORAGE } from '@constants/storage'
import { postSignIn } from 'src/network/sign'
import {
  getTokensFromStorage,
  getUserFromStorage,
  setTokensOnStorage,
  setUserOnStorage,
} from '@utils/auth'

interface AuthContextType {
  user: User | null
  signIn: ({ email, password }: SignInFormData) => Promise<void>
  signOut: () => Promise<void>
  isLoggedUserLoading: boolean
  onUpdateUserProfile: (user: User) => Promise<void>
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoggedUserLoading, setIsLoggedUserLoading] = useState(false)

  const signIn = useCallback(async ({ email, password }: SignInFormData) => {
    try {
      setIsLoggedUserLoading(true)
      const data = await postSignIn({
        email,
        password,
      })

      const responseSuccess = data.user && data.token && data.refresh_token

      if (responseSuccess) {
        const tokenStorageValue = {
          token: data.token,
          refresh_token: data.refresh_token,
        }

        await Promise.all([
          setUserOnStorage(data.user),
          setTokensOnStorage(tokenStorageValue),
        ])
        setUser(data.user)
        api.defaults.headers.common.Authorization = `Bearer ${data.token}`
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoggedUserLoading(false)
    }
  }, [])

  const signOut = useCallback(async () => {
    try {
      setIsLoggedUserLoading(true)
      await Promise.all([
        storageRemoveItem(USER_STORAGE),
        storageRemoveItem(AUTH_TOKEN_STORAGE),
      ])
      setUser(null)
      api.defaults.headers.common.Authorization = undefined
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoggedUserLoading(false)
    }
  }, [])

  const loadLoggedUserFromAsyncStorage = useCallback(async () => {
    try {
      setIsLoggedUserLoading(true)
      const [loggedUser, authTokens] = await Promise.all([
        getUserFromStorage(),
        getTokensFromStorage(),
      ])

      if (loggedUser && authTokens) {
        setUser(loggedUser)
        api.defaults.headers.common.Authorization = `Bearer ${authTokens.token}`
      }
    } catch (error) {
      console.log(error)
      setUser(null)
    } finally {
      setIsLoggedUserLoading(false)
    }
  }, [])

  const onUpdateUserProfile = useCallback(async (updatedProfile: User) => {
    try {
      setIsLoggedUserLoading(true)
      await setUserOnStorage(updatedProfile)
      setUser(updatedProfile)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoggedUserLoading(false)
    }
  }, [])

  useEffect(() => {
    loadLoggedUserFromAsyncStorage()
    const subscribe = api.registerInterceptTokenManager(signOut)

    return () => {
      subscribe()
    }
  }, [loadLoggedUserFromAsyncStorage, signOut])

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signOut,
        isLoggedUserLoading,
        onUpdateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
