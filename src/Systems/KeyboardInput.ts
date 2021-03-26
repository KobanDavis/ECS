import { Entity, System } from '../ECS'
import { ComponentName, Direction, DirectionKey } from '../types'

const movementKeys: DirectionKey[] = ['w', 'a', 's', 'd']

class KeyboardInput implements System {
	private _playerEntity: Entity
	private _startHandler: (e: KeyboardEvent) => void
	private _stopHandler: (e: KeyboardEvent) => void
	private _heldKeys: Set<DirectionKey> = new Set()
	private _direction: Direction = null

	private _updateDirection(): void {
		this._direction = this._getDirectionFromHeldKeys()
	}

	private _createStartHandler() {
		return (e: KeyboardEvent): void => {
			const key = e.key.toLowerCase() as DirectionKey
			if (movementKeys.includes(key)) {
				this._heldKeys.add(key)
				this._updateDirection()
			}
		}
	}

	private _createStopHandler() {
		return (e: KeyboardEvent): void => {
			const key = e.key.toLowerCase() as DirectionKey
			if (movementKeys.includes(key)) {
				this._heldKeys.delete(key)
				this._updateDirection()
			}
		}
	}

	private _checkEntityIsPlayer(entity: Entity): boolean {
		const requiredComponents: ComponentName[] = ['direction', 'position', 'type']
		return requiredComponents.every(entity.hasComponent) && entity.getComponent('type').value === 'player'
	}

	private _getDirectionFromHeldKeys(): Direction {
		// no movement
		if (this._heldKeys.size === 0) return null
		if (this._heldKeys.size === 4) return null

		const directions: Direction[] = []

		if (this._heldKeys.has('w') && !this._heldKeys.has('s')) directions.push('n')
		else if (this._heldKeys.has('s') && !this._heldKeys.has('w')) directions.push('s')
		if (this._heldKeys.has('a') && !this._heldKeys.has('d')) directions.push('w')
		else if (this._heldKeys.has('d') && !this._heldKeys.has('a')) directions.push('e')

		switch (directions.length) {
			case 0:
				return null
			case 1:
				return directions[0]
			default:
				return directions.join('') as Direction
		}
	}

	public enter(entity: Entity): void {
		if (this._playerEntity === undefined && this._checkEntityIsPlayer(entity)) {
			this._playerEntity = entity
			this._startHandler = this._createStartHandler()
			this._stopHandler = this._createStopHandler()
			window.addEventListener('keydown', this._startHandler)
			window.addEventListener('keyup', this._stopHandler)
		}
	}

	public update() {
		// should this even be called every update?
		// maybe just update when this._getDirectionFromHeldKeys is called
		if (this._playerEntity) {
			const direction = this._playerEntity.getComponent('direction')
			if (direction.value.current !== this._direction) {
				direction.update(this._direction)
			}
		}
	}

	public exit(id: string): void {
		if (this._playerEntity?.id === id) {
			window.removeEventListener('keydown', this._startHandler)
			window.removeEventListener('keyup', this._stopHandler)
		}
	}
}

export default KeyboardInput
