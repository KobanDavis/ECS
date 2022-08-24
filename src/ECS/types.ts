export interface Components {}

export type ComponentName = Extract<keyof Components, string>
