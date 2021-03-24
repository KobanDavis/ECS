import { DynamicAppearance, StaticAppearance, Position, Direction as DirectionComponent } from './Components'
import Type from './Components/Type'

export type Direction = 'n' | 's' | 'w' | 'e' | 'nw' | 'ne' | 'sw' | 'se'
export type DirectionKey = 'w' | 'a' | 's' | 'd'

export interface Frames {
	active: ImageBitmap[]
	idle: ImageBitmap[]
}

export interface Model {
	up: Frames
	down: Frames
	left: Frames
	right: Frames
}

export interface Components {
	staticAppearance: StaticAppearance
	dynamicAppearance: DynamicAppearance
	position: Position
	type: Type
	direction: DirectionComponent
}

export type ComponentName = keyof Components
