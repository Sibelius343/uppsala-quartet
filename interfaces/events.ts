export interface PerformanceEvent {
  id: string,
  title: string,
  date?: string,
  location?: string,
  description?: string,
  imgUrl?: string
}

export interface NewPerformanceEvent {
  title: string,
  date?: string,
  location?: string,
  description?: string,
  imgUrl?: string
}

export interface EventObject {
  events: PerformanceEvent[]
}