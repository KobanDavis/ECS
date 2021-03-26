import './index.css'
import Game from './Classes/Game'
import { Player, Tile, Wall } from './Assemblages'
import AssetManager from './Classes/AssetManager'
import loadTileAssets from './Classes/AssetManager/Tiles/tileAssets'
import { Rectangle, Vector } from '@kobandavis/canvas'
import player from '../assets/player.png'
import { Entity } from './ECS'
import Hitbox from './Components/Hitbox'

const loadAssets = async (assetManager: AssetManager) => {
	return Promise.all([
		loadTileAssets(assetManager),
		assetManager.loadAnimatedSpriteSheet({
			animationOrder: [0, 1, 2, 1],
			width: 3,
			height: 4,
			idleFrameIndex: 1,
			name: 'player',
			order: ['s', 'w', 'e', 'n'],
			resolution: 16,
			desiredResolution: 64,
			spriteSheet: player,
		}),
	])
}

// hardcode room
const loadRoom = (game: Game) => {
	// left wall
	new Wall(new Vector({ x: 0, y: 0 }), `wall_gray_corner`).withEntity(game.addEntity)
	for (let i = 1; i < 6; i++) {
		new Wall(new Vector({ x: 0, y: i * 64 }), `wall_gray_side`).withEntity(game.addEntity)
		new Wall(new Vector({ x: i * 64, y: 0 }), `wall_gray_horizontal_edge`).withEntity(game.addEntity)
	}
	// floor
	for (let i = 1; i < 6; i++) {
		for (let j = 1; j < 6; j++) {
			new Tile(new Vector({ x: i * 64, y: 64 * j }), `floor_moss`).withEntity(game.addEntity)
		}
	}
	// right wall
	new Wall(new Vector({ x: 64 * 6, y: 0 }), `wall_gray_corner`).withEntity(game.addEntity)
	for (let i = 1; i < 6; i++) {
		if (i === 4) {
			new Tile(new Vector({ x: 6 * 64, y: 64 * i }), `floor_moss`).withEntity(game.addEntity)
			continue
		}

		new Wall(new Vector({ x: 64 * 6, y: i * 64 }), `wall_gray_side`).withEntity(game.addEntity)
	}
	// bottom wall
	new Wall(new Vector({ x: 0, y: 64 * 6 }), `wall_gray_bottom_corner`).withEntity(game.addEntity)
	for (let i = 1; i < 6; i++) {
		new Wall(new Vector({ x: i * 64, y: 64 * 6 }), `wall_gray_horizontal_edge`).withEntity(game.addEntity)
	}
	new Wall(new Vector({ x: 6 * 64, y: 64 * 6 }), `wall_gray_bottom_corner`).withEntity(game.addEntity)
}

const init = async () => {
	const r = new Rectangle(0, 0, 1, 1)
	console.log(r)
	const game = new Game()
	await loadAssets(game.assetManager)

	new Player().withEntity(game.addEntity)

	loadRoom(game)

	game.start()
}

init()
