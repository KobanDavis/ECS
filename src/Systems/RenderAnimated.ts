import { Position } from '@kobandavis/canvas'
import AssetManager from '../Classes/AssetManager'
import Entity from '../ECS/Entity'
import System from '../ECS/System'
import { CardinalDirection, ComponentName } from '../types'

class RenderAnimated implements System {
	private _entities = new Map<string, Entity>()
	constructor(private _ctx: CanvasRenderingContext2D, private _assetManager: AssetManager) {
		this.drawEntity = this.drawEntity.bind(this)
	}

	public enter(entity: Entity) {
		const requiredComponents: ComponentName[] = ['dynamicAppearance', 'position', 'direction', 'animationFrameIndex']
		if (requiredComponents.every(entity.hasComponent)) {
			this._entities.set(entity.id, entity)
		}
	}

	private drawEntity(entity: Entity, frame: number) {
		const animationFrameIndex = entity.getComponent('animationFrameIndex')
		const animatedSpriteSheetName = entity.getComponent('dynamicAppearance').value
		const direction = entity.getComponent('direction').value
		const vector = entity.getComponent('position').value
		const { x: dx, y: dy } = vector.position
		const { bitmap, model, resolution } = this._assetManager.getAnimatedSpriteSheet(animatedSpriteSheetName)

		const cardinal = (direction.last?.charAt(direction.last.length - 1) || 's') as CardinalDirection
		const frames = model[cardinal]
		let position: Position
		if (direction.current === null) {
			if (animationFrameIndex.value !== 0) {
				animationFrameIndex.update(0)
			}
			position = frames.idle
		} else {
			position = frames.active[animationFrameIndex.value]
			if (frame % 16 == 0) {
				animationFrameIndex.update((frames.active.length % (animationFrameIndex.value + 1)) + 1)
			}
		}
		const sx = position.x
		const sy = position.y
		this._ctx.drawImage(bitmap, sx, sy, resolution, resolution, dx, dy, resolution, resolution)
	}

	public update(frame: number): void {
		const entities = this._entities.entries()
		for (let [_, entity] of entities) {
			this.drawEntity(entity, frame)
		}
	}

	public exit(id: Entity['id']): void {
		this._entities.delete(id)
	}
}

export default RenderAnimated
