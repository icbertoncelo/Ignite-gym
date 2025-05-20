import {
  PostSignInApiResponse,
  PostSignInApiPayload,
  PostSignUpApiPayload,
  Auth,
} from '@dtos/sign'
import { api } from '@services/api'

export async function postSignIn(payload: PostSignInApiPayload): Promise<Auth> {
  const { data } = await api.post<PostSignInApiResponse>('/sessions', payload)

  const dataWithUri: Auth = {
    ...data,
    user: {
      ...data.user,
      avatarUri: `${api.defaults.baseURL}/avatar/${data.user.avatar}`,
    },
  }

  return dataWithUri
}

export async function postSignUp(payload: PostSignUpApiPayload): Promise<void> {
  return await api.post('users', payload)
}
