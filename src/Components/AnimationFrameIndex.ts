import { Component } from '../ECS'
import { ComponentName } from '../types'

class AnimationFrameIndex implements Component<number> {
	public name: ComponentName = 'animationFrameIndex'
	public value: number
	constructor(value: number) {
		this.value = value
	}

	public update(value: number) {
		this.value = value
	}
}

export default AnimationFrameIndex
