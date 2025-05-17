export interface History {
  id: string
  name: string
  group: string
  hour: string
  created_at: string
}

export interface HistoryByDay {
  title: string
  data: History[]
}
