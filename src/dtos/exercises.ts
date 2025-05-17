export interface ExerciseApiResponse {
  id: string
  demo: string
  group: string
  name: string
  series: number
  thumb: string
  repetitions: number
  created_at: string
  updated_at: string
}

export interface Exercise extends ExerciseApiResponse {
  demoUri?: string
  thumbUri?: string
}
