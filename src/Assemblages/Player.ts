import { Direction, Position, StaticAppearance, Type } from '../Components'
import { Entity } from '../ECS'
import Model from '../Classes/Model'
import Assemblage from './Assemblage'
import idle from '../../assets/circle.png'
import { Vector } from '@kobandavis/canvas'
import Game from '../Classes/Game'

class Player implements Assemblage {
	private _entity: Entity = null
	public async init(): Promise<Entity> {
		const entity = new Entity()
		const image = await new Model().imageToBitmap(idle)
		entity.addComponent(new Type('player'))
		entity.addComponent(new Direction(null))
		entity.addComponent(new Position(new Vector({ x: 0, y: 0 })))
		entity.addComponent(new StaticAppearance(image))
		this._entity = entity
		return entity
	}
	public loadIntoGame(game: Game) {
		if (!this._entity) throw new Error('Entity not loaded')
		game.addEntity(this._entity)
	}
}

export default Player
