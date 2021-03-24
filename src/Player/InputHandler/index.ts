import Player from '..'
import { Direction, DirectionKey } from '../../types'

interface InputHandler {
	enable(): void
	disable(): void
}

const movementKeys: DirectionKey[] = ['w', 'a', 's', 'd']

class InputHandler {
	private startHandler: (e: KeyboardEvent) => void
	private stopHandler: (e: KeyboardEvent) => void
	private heldKeys: Set<string> = new Set()
	constructor(private _player: Player) {}

	private createStartHandler() {
		return (e: KeyboardEvent): void => {
			const key = e.key.toLowerCase() as DirectionKey
			if (movementKeys.includes(key)) {
				this._player.movement.addHeldKey(key)
			}
		}
	}

	private createStopHandler() {
		return (e: KeyboardEvent): void => {
			const key = e.key.toLowerCase() as DirectionKey
			if (movementKeys.includes(key)) {
				this._player.movement.deleteHeldKey(key)
			}
		}
	}

	public enable(): void {
		this.startHandler = this.createStartHandler()
		this.stopHandler = this.createStopHandler()
		window.addEventListener('keydown', this.startHandler)
		window.addEventListener('keyup', this.stopHandler)
	}

	public disable(): void {
		window.removeEventListener('keydown', this.startHandler)
		window.removeEventListener('keyup', this.stopHandler)
	}
}

export default InputHandler
