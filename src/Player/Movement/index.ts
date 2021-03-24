import { Vector } from '@kobandavis/canvas'
import { Direction, DirectionKey, XDirection, YDirection } from '../../types'

interface Movement {
	lastXDirection: XDirection
	lastYDirection: YDirection
	direction: Direction
	move(direction: Direction): boolean
}

enum KeyDirectionMap {
	'w' = 'n',
	'a' = 'w',
	's' = 's',
	'd' = 'e',
}

class Movement {
	public animationFrameIndex = 0
	private heldKeys = new Set<DirectionKey>()
	private position = new Vector({ x: 0, y: 0 })

	constructor(private _animationLength: number) {
		this.lastYDirection = 's'
		this.lastXDirection = 'e'
	}

	public addHeldKey(key: DirectionKey) {
		this.heldKeys.add(key)
		this.setDirections(KeyDirectionMap[key])
	}

	public deleteHeldKey(key: DirectionKey) {
		this.heldKeys.delete(key)
		if (this.heldKeys.size === 0) {
			this.animationFrameIndex = 0
		}
	}

	public isMoving(): boolean {
		// No direction
		if (this.heldKeys.size === 0) return false
		// All directions, therefore going nowhere
		if (this.heldKeys.size === 4) return false
		// A direction
		if (this.heldKeys.size === 1) return true
		// A set of opposing, but with 1 direction
		if (this.heldKeys.size === 3) return true
		// The two opposite cases
		if (this.heldKeys.has('w') && this.heldKeys.has('s')) return false
		if (this.heldKeys.has('a') && this.heldKeys.has('d')) return false

		return true
	}

	public move(): boolean {
		// Todo: add collision detection with rooms
		this.heldKeys.forEach((key) => {
			switch (key) {
				case 'w':
					this.position.add({ x: 0, y: -2 })
					break
				case 'a':
					this.position.add({ x: -2, y: 0 })
					break
				case 's':
					this.position.add({ x: 0, y: 2 })
					break
				case 'd':
					this.position.add({ x: 2, y: 0 })
					break
			}
			return true
		})
		return true
	}

	public setDirections(direction: Direction): void {
		if (direction === 'w' || direction === 'e') {
			this.lastXDirection = direction
		} else {
			this.lastYDirection = direction
		}
	}

	public prepareNextFrame(frame: number): void {
		if (this.isMoving()) {
			this.move()
			if (frame % (this._animationLength * 4) === 0) {
				console.log(frame)
				this.updateAnimationFrameIndex()
			}
		}
	}

	private updateAnimationFrameIndex(): void {
		this.animationFrameIndex = (this.animationFrameIndex + 1) % this._animationLength
	}

	public getPosition(): Vector {
		return this.position
	}
}

export default Movement
