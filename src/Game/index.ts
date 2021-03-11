import { Canvas } from '@kobandavis/canvas'
import Player from '../Player'

interface Game {
	player: Player
	start(): void
}

class Game {
	constructor(private _canvas: Canvas) {
		this.player = new Player()
		this.player.init()
	}

	private setDrawFunction(): void {
		this._canvas.setDrawFunction((ctx: CanvasRenderingContext2D): void => {
			this.player.draw(ctx)
		})
	}

	public start(): void {
		this.setDrawFunction()
		this._canvas.startDrawLoop()
	}
}

export default Game
