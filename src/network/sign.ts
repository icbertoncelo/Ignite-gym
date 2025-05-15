import {
  PostSignInApiResponse,
  PostSignInApiPayload,
  PostSignUpApiPayload,
} from '@dtos/sign'
import { api } from '@services/api'

export async function postSignIn(
  payload: PostSignInApiPayload,
): Promise<PostSignInApiResponse> {
  const { data } = await api.post<PostSignInApiResponse>('/sessions', payload)

  return data
}

export async function postSignUp(payload: PostSignUpApiPayload): Promise<void> {
  return await api.post('users', payload)
}
