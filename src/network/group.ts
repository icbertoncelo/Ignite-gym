import { api } from '@services/api'

export async function getGroups(): Promise<string[]> {
  const { data } = await api.get<string[]>('/groups')

  return data
}
