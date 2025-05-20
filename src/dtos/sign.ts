import { User, UserApiResponse } from './user'

export interface SignUpFormData {
  name: string
  email: string
  password: string
  passwordConfirmation: string
}

export interface SignInFormData {
  email: string
  password: string
}

export interface PostSignUpApiPayload {
  name: string
  email: string
  password: string
}

export interface PostSignInApiPayload extends SignInFormData {}
export type TokenInfo = {
  token: string
  refresh_token: string
}

export type PostSignInApiResponse = TokenInfo & {
  user: UserApiResponse
}

export type Auth = TokenInfo & {
  user: User
}
