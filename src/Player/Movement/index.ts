import { Vector } from '@kobandavis/canvas'
import Player from '..'
import { Direction } from '../../types'

interface Movement {
	direction: Direction
	move(direction: Direction): boolean
}

class Movement {
	private position = new Vector({ x: 0, y: 0 })
	constructor(private _player: Player) {
		this.direction = null
	}

	public move(direction: Direction): boolean {
		// Todo: add collision detection with rooms
		switch (direction) {
			case 'up':
				this.position.add({ x: 0, y: 1 })
				break
			case 'down':
				this.position.add({ x: 0, y: -1 })
				break
			case 'left':
				this.position.add({ x: -1, y: 0 })
				break
			case 'right':
				this.position.add({ x: 1, y: 0 })
				break
		}
		return true
	}

	public setDirection(direction: Direction): void {
		this.direction = direction
	}

	public prepareNextFrame(): void {
		if (this.direction !== null) {
			this.move(this.direction)
		}
	}
	public getPosition(): Vector {
		return this.position
	}
}

export default Movement
