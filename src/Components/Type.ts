import Component from '../ECS/Component'
import { ComponentName } from '../types'

class Type implements Component<string> {
	public name: ComponentName = 'type'
	public value: string
	constructor(value: string) {
		this.value = value
	}
	public update(value: string) {
		this.value = value
	}
}

export default Type
