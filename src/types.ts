export type Direction = 'up' | 'down' | 'left' | 'right'

export interface Frames {
	active: [string, string]
	idle: string
}

export interface Model {
	up: Frames
	down: Frames
	left: Frames
	right: Frames
}
