import { Direction, Frames } from '../types'

interface Model {
	movement: Record<Direction, Frames>
}

class Model {
	constructor(private _directory: string) {
		this.movement = null
	}

	public async loadSprites(): Promise<void> {
		const directions: Direction[] = ['up', 'down', 'left', 'right']
		for (let direction of directions) {
			this.movement[direction].active[0] = (await import(`${this._directory}/${direction}_active_1.png`)) || ''
			this.movement[direction].active[1] = (await import(`${this._directory}/${direction}_active_2.png`)) || ''
			this.movement[direction].idle = (await import(`${this._directory}/${direction}_idle.png`)) || ''
		}
	}
}

export default Model
