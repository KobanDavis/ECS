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

	public update() {
		for (let entity of this._entities.values()) {
			const position = entity.getComponent('position')
			const currentPosition = position.value
			const direction = entity.getComponent('direction')
			if (direction.value.current) {
				for (let i = 0; i < direction.value.current.length; i++) {
					switch (direction.value.current[i]) {
						case 'n':
							currentPosition.add({ x: 0, y: -2 })
							break
						case 's':
							currentPosition.add({ x: 0, y: 2 })
							break
						case 'w':
							currentPosition.add({ x: -2, y: 0 })
							break
						case 'e':
							currentPosition.add({ x: 2, y: 0 })
							break
					}
				}
			}
		}
	}
}

export default Movement
