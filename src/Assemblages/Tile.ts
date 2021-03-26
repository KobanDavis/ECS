import { Vector } from '@kobandavis/canvas'
import { Position, StaticAppearance } from '../Components'
import { Entity } from '../ECS'
import Assemblage, { withEntityFn } from './Assemblage'

class Tile implements Assemblage {
	private _entity: Entity
	constructor(private _position: Vector, private _imageName: string) {
		this._entity = this._createEntity()
	}

	private _createEntity(): Entity {
		const entity = new Entity()
		entity.addComponent(new Position(this._position))
		entity.addComponent(
			new StaticAppearance({
				imageName: this._imageName,
				spriteSheetName: 'tiles',
			})
		)
		return entity
	}

	public withEntity(fn: withEntityFn) {
		fn(this._entity)
	}
}

export default Tile
