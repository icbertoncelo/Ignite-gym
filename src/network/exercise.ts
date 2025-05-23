import { Exercise, ExerciseApiResponse } from '@dtos/exercises'
import { api } from '@services/api'

export async function getExercises(): Promise<Exercise[]> {
  const { data } = await api.get<Exercise[]>('/exercises')

  return data
}

export async function getExercisesByGroup(group: string): Promise<Exercise[]> {
  const { data } = await api.get<ExerciseApiResponse[]>(
    `/exercises/bygroup/${group}`,
  )

  const dataWithUri: Exercise[] = data.map((exercise) => ({
    ...exercise,
    thumbUri: `${api.defaults.baseURL}/exercise/thumb/${exercise.thumb}`,
  }))

  return dataWithUri
}

export async function getExercise(exerciseId: string): Promise<Exercise> {
  const { data } = await api.get<ExerciseApiResponse>(
    `/exercises/${exerciseId}`,
  )

  const dataWithUri: Exercise = {
    ...data,
    demoUri: `${api.defaults.baseURL}/exercise/demo/${data.demo}`,
  }

  return dataWithUri
}
