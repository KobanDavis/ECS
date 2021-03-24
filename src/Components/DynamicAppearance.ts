import Component from '../ECS/Component'
import { ComponentName, Frames } from '../types'

interface DynamicAppearanceValue {
	model: Frames[]
	animationFrame: number
}

class DynamicAppearance implements Component<DynamicAppearanceValue> {
	public name: ComponentName = 'dynamicAppearance'
	public value: DynamicAppearanceValue
	constructor(value: DynamicAppearanceValue) {
		this.value = value
	}
	public update(value: DynamicAppearanceValue) {
		this.value = value
	}
}

export default DynamicAppearance
