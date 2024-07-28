export type stateField<T> = {
  [K in keyof T]: {
    [P in K]: T[P]
  }
}[keyof T]

export type _ChildNode = { children: React.ReactNode }

export type Activity = {
  id: number
  completed: boolean
  activity: string
  activityType: string
  location: string
  contact: string
  time: string
}[]
