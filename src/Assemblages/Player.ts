import { AnimationFrameIndex, Direction, DynamicAppearance, Position, StaticAppearance, Type } from '../Components'
import { Entity } from '../ECS'
import Assemblage, { withEntityFn } from './Assemblage'
import { Rectangle, Vector } from '@kobandavis/canvas'
import Hitbox from '../Components/Hitbox'

class Player implements Assemblage {
	private _entity: Entity
	constructor() {
		this._entity = this._createEntity()
	}

	public _createEntity(): Entity {
		const entity = new Entity()
		entity.addComponent(new Type('player'))
		entity.addComponent(new Direction(null))
		entity.addComponent(new Position(new Vector({ x: 64, y: 64 })))
		entity.addComponent(new DynamicAppearance('player'))
		entity.addComponent(new AnimationFrameIndex(0))
		entity.addComponent(
			new Hitbox({
				collisionType: 'dynamic',
				hitbox: new Rectangle(0, 0, 64, 64),
			})
		)
		this._entity = entity
		return entity
	}

	public withEntity(fn: withEntityFn) {
		fn(this._entity)
	}
}

export default Player
