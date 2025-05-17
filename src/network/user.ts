import { PutProfileApiPayload, User } from '@dtos/user'
import { api } from '@services/api'

export async function putProfile(payload: PutProfileApiPayload): Promise<User> {
  const { data } = await api.put<User>('/users', payload)

  return data
}
