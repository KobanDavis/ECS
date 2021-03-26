import Component from '../ECS/Component'
import { ComponentName } from '../types'

class DynamicAppearance implements Component<string> {
	public name: ComponentName = 'dynamicAppearance'
	public value: string
	/**
	 * @param value The name of the `animatedSpriteSheet` to be loaded from `AssetManager`
	 */
	constructor(value: string) {
		this.value = value
	}
	public update(value: string) {
		this.value = value
	}
}

export default DynamicAppearance
