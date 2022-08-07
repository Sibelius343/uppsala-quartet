export interface PerformanceEvent {
  id: number,
  title: string,
  date?: string,
  description?: string
}

export interface NewPerformanceEvent {
  title: string,
  date?: string,
  description?: string
}

export interface EventObject {
  events: PerformanceEvent[]
}