import AssetManager, { SpriteSheetConfig } from '..'
import tiles from './basictiles.png'

const imageNames = [
	[
		'wall_gray_horizontal_edge',
		'wall_gray_side',
		'wall_gray_bottom_corner',
		'wall_gray_corner',
		'wall_red_1',
		'floor_red_1',
		'wall_red_2',
		'floor_red_2',
	],
	['floor_wooden_diagonal', 'floor_carpet', 'floor_road', 'floor_grass', 'floor_grass_flowers', 'floor_water', 'floor_moss', 'wall_rock'],
]

const config: SpriteSheetConfig = {
	resolution: 16,
	desiredResolution: 64,
	count: 16,
	height: 12,
	width: 8,
	imageNames,
	name: 'tiles',
	spriteSheet: tiles,
}

const loadTileAssets = async (manager: AssetManager) => {
	return await manager.loadSpriteSheet(config)
}

export default loadTileAssets
