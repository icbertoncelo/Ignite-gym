export interface UserApiResponse {
  id: string
  name: string
  email: string
  avatar: string
}

export interface User extends UserApiResponse {
  avatarUri: string
}

export interface ProfileFormData {
  name: string
  email: string
  newPassword: string
  newPasswordConfirmation: string
  oldPassword: string
}

export interface PutProfileApiPayload {
  name: string
  password: string
  old_password: string
}
