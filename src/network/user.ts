import { PutProfileApiPayload, User, UserApiResponse } from '@dtos/user'
import { api } from '@services/api'

export async function putProfile(payload: PutProfileApiPayload): Promise<User> {
  const { data } = await api.put<User>('/users', payload)

  return data
}

export async function patchAvatar(payload: FormData): Promise<User> {
  const { data } = await api.patch<UserApiResponse>('/users/avatar', payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  const dataWithUri: User = {
    ...data,
    avatarUri: `${api.defaults.baseURL}/avatar/${data.avatar}`,
  }

  return dataWithUri
}
