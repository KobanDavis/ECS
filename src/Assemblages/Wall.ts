import { Rectangle, Vector } from '@kobandavis/canvas'
import { Position, StaticAppearance } from '../Components'
import Hitbox from '../Components/Hitbox'
import { Entity } from '../ECS'
import Assemblage, { withEntityFn } from './Assemblage'

class Wall implements Assemblage {
	private _entity: Entity
	constructor(private _position: Vector, private _imageName: string) {
		this._entity = this._createEntity()
	}

	private _createEntity(): Entity {
		const entity = new Entity()
		entity.addComponent(new Position(this._position))
		entity.addComponent(new Hitbox({ collisionType: 'static', hitbox: new Rectangle(0, 0, 64, 64) }))
		entity.addComponent(new StaticAppearance({ imageName: this._imageName, spriteSheetName: 'tiles' }))
		return entity
	}

	public withEntity(fn: withEntityFn) {
		fn(this._entity)
	}
}

export default Wall
