import Component from '../ECS/Component'
import { Vector } from '@kobandavis/canvas'
import { ComponentName } from '../types'

class Position implements Component {
	public name: ComponentName = 'position'
	public value: Vector
	constructor(vector: Vector) {
		this.value = vector
	}
	public update(value: Vector) {
		this.value = value
	}
}

export default Position
