import './index.css'
import { Vector } from '@kobandavis/canvas'
import Game from './Classes/Game'
import Entity from './ECS/Entity'
import { Direction, Position, StaticAppearance } from './Components'
import Type from './Components/Type'

import idle from '../assets/player/s_idle.png'
import Model from './Classes/Model'

const createPlayer = async () => {
	const entity = new Entity()
	entity.addComponent(new Type('player'))
	entity.addComponent(new Direction(null))
	entity.addComponent(new Position(new Vector({ x: 0, y: 0 })))
	const image = await new Model().imageToBitmap(idle)
	entity.addComponent(new StaticAppearance(image))
	return entity
}

const init = async () => {
	const player = await createPlayer()
	const game = new Game()
	game.addEntity(player)
	game.start()
}

init()
// const assetMananger = new AssetManager('../assets')
