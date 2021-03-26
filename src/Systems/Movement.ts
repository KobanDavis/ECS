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
			x: roundTo64(vector.position.x),
			y: roundTo64(vector.position.y),
		})
	}

	private _checkNearestCollisionHitbox(entity: Entity, direction: CardinalDirection): boolean {
		const roundedPlayerTile = this._getClosestTileVector(entity.getComponent('position').value)
		console.log(roundedPlayerTile.position)
		let position: Position
		switch (direction) {
			case 'n':
				position = roundedPlayerTile.add({ x: 0, y: -64 }).position
				break
			case 'e':
				position = roundedPlayerTile.add({ x: 64, y: 0 }).position
				break
			case 's':
				position = roundedPlayerTile.add({ x: 0, y: 64 }).position
				break
			case 'w':
				position = roundedPlayerTile.add({ x: -64, y: 0 }).position
				break
		}
		const { x, y } = position
		const staticHitbox = this._staticCollisionHitboxes?.[x]?.[y]
		if (staticHitbox) {
			const a_position = staticHitbox.getComponent('position').value.position
			const a_hitbox = staticHitbox.getComponent('hitbox').value.hitbox
			const a = new Rectangle(a_position.x + a_hitbox.x, a_position.y + a_hitbox.y, a_hitbox.width, a_hitbox.height)

			const b_position = entity.getComponent('position').value.position
			const b_hitbox = entity.getComponent('hitbox').value.hitbox
			const b = new Rectangle(b_position.x + b_hitbox.x, b_position.y + b_hitbox.y, b_hitbox.width, b_hitbox.height)

			if (a.intersects(b)) return true
		}
		return false
	}

	public enter(entity: Entity) {
		if (this._checkEntityCanMove(entity)) {
			this._entities.set(entity.id, entity)
		}
		if (this._checkEntityHasStaticCollision(entity)) {
			const hitbox = entity.getComponent('hitbox').value.hitbox
			const position = entity.getComponent('position').value.position

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
