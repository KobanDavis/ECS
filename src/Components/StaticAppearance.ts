import Component from '../ECS/Component'
import { ComponentName } from '../types'

class StaticAppearance implements Component {
	public name: ComponentName = 'staticAppearance'
	public value: ImageBitmap
	constructor(value: ImageBitmap) {
		this.value = value
	}
	public update(value: ImageBitmap) {
		this.value = value
	}
}

export default StaticAppearance
