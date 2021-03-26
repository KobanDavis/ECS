import Component from '../ECS/Component'
import { ComponentName } from '../types'

interface StaticAppearanceValue {
	spriteSheetName: string
	imageName: string
}

class StaticAppearance implements Component<StaticAppearanceValue> {
	public name: ComponentName = 'staticAppearance'
	public value: StaticAppearanceValue
	constructor(value: StaticAppearanceValue) {
		this.value = value
	}
	public update(value: StaticAppearanceValue) {
		this.value = value
	}
}

export default StaticAppearance
