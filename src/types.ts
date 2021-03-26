import { Position } from '@kobandavis/canvas'
import {
	DynamicAppearance,
	StaticAppearance,
	Position as PositionComponent,
	Direction as DirectionComponent,
	AnimationFrameIndex,
} from './Components'
import Hitbox from './Components/Hitbox'
import Type from './Components/Type'

type OrdinalDirection = 'nw' | 'ne' | 'sw' | 'se'
export type CardinalDirection = 'n' | 's' | 'w' | 'e'
export type Direction = OrdinalDirection | CardinalDirection

export type DirectionKey = 'w' | 'a' | 's' | 'd'

export interface Frames {
	active: Position[]
	idle: Position
}

export type Model = Record<CardinalDirection, Frames>

export interface Components {
	staticAppearance: StaticAppearance
	dynamicAppearance: DynamicAppearance
	position: PositionComponent
	type: Type
	direction: DirectionComponent
	animationFrameIndex: AnimationFrameIndex
	hitbox: Hitbox
}

export type ComponentName = keyof Components
