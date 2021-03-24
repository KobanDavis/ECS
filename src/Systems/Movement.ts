import Entity from '../ECS/Entity'
import System from '../ECS/System'
import { ComponentName } from '../types'

class Movement implements System {
	private _entities = new Map<string, Entity>()
	private _checkEntityCanMove(entity: Entity) {
		const requiredComponents: ComponentName[] = ['direction', 'position']
		return requiredComponents.every(entity.hasComponent)
	}

	public enter(entity: Entity) {
		if (this._checkEntityCanMove(entity)) {
			this._entities.set(entity.id, entity)
		}
	}
	public exit(id: string) {
		this._entities.delete(id)
	}
	public update() {}
}

export default Movement
