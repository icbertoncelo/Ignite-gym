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

export interface User {
  id: string
  name: string
  email: string
  avatar: string
}
