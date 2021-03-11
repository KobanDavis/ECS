import Player from '..'
import { Direction } from '../../types'

interface InputHandler {
	enable(): void
	disable(): void
}

const movementKeysMap: { [k: string]: Direction } = {
	w: 'up',
	a: 'left',
	s: 'down',
	d: 'right',
}

class InputHandler {
	private startHandler: (e: KeyboardEvent) => void
	private stopHandler: (e: KeyboardEvent) => void
	constructor(private _player: Player) {}

	private createStartHandler() {
		return (e: KeyboardEvent): void => {
			const direction = movementKeysMap[e.key.toLowerCase()]
			if (direction !== null) {
				this._player.movement.setDirection(direction)
			}
		}
	}

	private createStopHandler() {
		return (e: KeyboardEvent): void => {
			const direction = movementKeysMap[e.key.toLowerCase()]
			if (direction !== null) {
				this._player.movement.setDirection(null)
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
