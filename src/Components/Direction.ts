import Component from '../ECS/Component'
import { ComponentName, Direction as DirectionType } from '../types'

interface DirectionValue {
	current: DirectionType
	last: DirectionType
}

class Direction implements Component<DirectionValue> {
	public name: ComponentName = 'direction'
	public value: DirectionValue
	constructor(value: DirectionType) {
		this.value = {
			current: value,
			last: value,
		}
	}

	public update(value: DirectionType) {
		if (value !== null) {
			this.value.last = value
		}
		this.value.current = value
	}
}

export default Direction
