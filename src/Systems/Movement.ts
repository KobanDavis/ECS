import { Position, Rectangle, Vector } from '@kobandavis/canvas'
import Entity from '../ECS/Entity'
import System from '../ECS/System'
import { CardinalDirection, ComponentName } from '../types'

interface HitboxCoordinates {
	[x: number]: {
		[y: number]: Entity
	}
}

class Movement implements System {
	private _entities = new Map<string, Entity>()
	private _staticCollisionHitboxes: HitboxCoordinates = {}

	private _checkEntityCanMove(entity: Entity) {
		const requiredComponents: ComponentName[] = ['direction', 'position', 'hitbox']
		return requiredComponents.every(entity.hasComponent)
	}

	private _checkEntityHasStaticCollision(entity: Entity) {
		const requiredComponents: ComponentName[] = ['position', 'hitbox']
		return requiredComponents.every(entity.hasComponent) && entity.getComponent('hitbox').value.collisionType === 'static'
	}

	private _getClosestTileVector(vector: Vector): Vector {
		const roundTo64 = (n: number) => Math.round(n / 64) * 64
		return new Vector({
			x: roundTo64(vector.x),
			y: roundTo64(vector.y),
		})
	}

	private _checkNearestCollisionHitbox(entity: Entity, direction: CardinalDirection): boolean {
		const roundedPlayerTile = this._getClosestTileVector(entity.getComponent('position').value)
		let vector: Vector
		switch (direction) {
			case 'n':
				vector = roundedPlayerTile.add({ x: 0, y: -64 })
				break
			case 'e':
				vector = roundedPlayerTile.add({ x: 64, y: 0 })
				break
			case 's':
				vector = roundedPlayerTile.add({ x: 0, y: 64 })
				break
			case 'w':
				vector = roundedPlayerTile.add({ x: -64, y: 0 })
				break
		}

		const { x, y } = vector
		const staticHitboxEntity = this._staticCollisionHitboxes?.[x]?.[y]
		if (staticHitboxEntity) {
			const a = this._getHitbox(entity)
			const b = this._getHitbox(staticHitboxEntity)
			if (a.intersects(b)) return true
		}
		return false
	}

	private _getHitbox(entity: Entity): Rectangle {
		// add caching of static hitboxes?
		const { x, y } = entity.getComponent('position').value
		const { position, width, height } = entity.getComponent('hitbox').value.hitbox
		const { x: offsetX, y: offsetY } = position

		return new Rectangle(x + offsetX, y + offsetY, width, height)
	}

	public enter(entity: Entity) {
		if (this._checkEntityCanMove(entity)) {
			this._entities.set(entity.id, entity)
		}
		if (this._checkEntityHasStaticCollision(entity)) {
			const hitbox = entity.getComponent('hitbox').value.hitbox.position
			const position = entity.getComponent('position').value

			if (!this._staticCollisionHitboxes[position.x + hitbox.x]) this._staticCollisionHitboxes[position.x + hitbox.x] = {}
			this._staticCollisionHitboxes[position.x + hitbox.x][position.y + hitbox.y] = entity
		}
	}

	public update() {
		for (let entity of this._entities.values()) {
			const position = entity.getComponent('position')
			const currentPosition = position.value
			const direction = entity.getComponent('direction')
			if (direction.value.current) {
				for (let i = 0; i < direction.value.current.length; i++) {
					if (this._checkNearestCollisionHitbox(entity, direction.value.current[i] as CardinalDirection)) continue

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

	public exit(id: string) {
		this._entities.delete(id)
	}
}

export default Movement
