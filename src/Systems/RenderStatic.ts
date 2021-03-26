import AssetManager from '../Classes/AssetManager'
import Entity from '../ECS/Entity'
import System from '../ECS/System'

class RenderStatic implements System {
	private _entities = new Map<string, Entity>()
	constructor(private _ctx: CanvasRenderingContext2D, private _assetManager: AssetManager) {
		this.drawEntity = this.drawEntity.bind(this)
	}

	public enter(entity: Entity) {
		if (entity.hasComponent('staticAppearance') && entity.hasComponent('position')) {
			this._entities.set(entity.id, entity)
		}
	}

	private drawEntity(entity: Entity) {
		const sprite = entity.getComponent('staticAppearance').value
		const vector = entity.getComponent('position').value
		const { x: dx, y: dy } = vector.position
		const { bitmap, images, resolution } = this._assetManager.getSpriteSheet(sprite.spriteSheetName)
		const { x: sx, y: sy } = images[sprite.imageName]
		this._ctx.drawImage(bitmap, sx, sy, resolution, resolution, dx, dy, resolution, resolution)
	}

	public update(): void {
		const entities = this._entities.entries()
		for (let [_, entity] of entities) {
			this.drawEntity(entity)
		}
	}

	public exit(id: Entity['id']): void {
		this._entities.delete(id)
	}
}

export default RenderStatic
