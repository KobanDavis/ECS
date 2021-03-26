import { Rectangle } from '@kobandavis/canvas'
import Component from '../ECS/Component'
import { ComponentName } from '../types'

interface HitboxValue {
	hitbox: Rectangle
	collisionType: 'static' | 'dynamic'
}

class Hitbox implements Component<HitboxValue> {
	public name: ComponentName = 'hitbox'
	public value: HitboxValue
	constructor(value: HitboxValue) {
		this.value = value
	}
	public update(value: HitboxValue) {
		this.value = value
	}
}

export default Hitbox
