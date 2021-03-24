import Entity from '../ECS/Entity'
import System from '../ECS/System'

class RenderStatic implements System {
	private _entities = new Map<string, Entity>()
	private _ctx: CanvasRenderingContext2D
	constructor(ctx: CanvasRenderingContext2D) {
		this._ctx = ctx
	}
	public enter(entity: Entity) {
		if (entity.hasComponent('staticAppearance') && entity.hasComponent('position')) {
			this._entities.set(entity.id, entity)
		}
	}

	public update(): void {
		const entities = this._entities.entries()
		for (let [_, entity] of entities) {
			const sprite = entity.getComponent('staticAppearance').value
			const vector = entity.getComponent('position').value
			const { x, y } = vector.position
			this._ctx.drawImage(sprite, x, y, 128, 128)
		}
	}

	public exit(id: Entity['id']): void {
		this._entities.delete(id)
	}
}

export default RenderStatic
