import { User } from './user'

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

export interface PostSignInApiResponse {
  user: User
  token: string
}
