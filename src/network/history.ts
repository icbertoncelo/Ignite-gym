import { HistoryByDay } from '@dtos/history'
import { api } from '@services/api'

export async function getHistory(): Promise<HistoryByDay[]> {
  const { data } = await api.get<HistoryByDay[]>('/history')

  return data
}

export async function postHistory(exerciseId: string): Promise<void> {
  await api.post('/history', {
    exercise_id: exerciseId,
  })
}
