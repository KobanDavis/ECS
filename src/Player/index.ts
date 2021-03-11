import Model from '../Model'
import InputHandler from './InputHandler'
import Movement from './Movement'

export type OnloadFunction = (player: Player) => void

interface Player {
	draw(ctx: CanvasRenderingContext2D): void
	model: Model
	inputHandler: InputHandler
	movement: Movement
	// room: Room
}

class Player {
	constructor() {}

	public async init(): Promise<void> {
		// Load model
		// this.model = await this.loadModel()

		// Init InputHandler
		this.inputHandler = new InputHandler(this)
		this.inputHandler.enable()

		// Load room
		// this.room = new Room()

		// Init movement
		this.movement = new Movement(this)
	}

	private async loadModel(): Promise<Model> {
		const model = new Model('./assets/model')
		await model.loadSprites()
		return model
	}

	public draw(ctx: CanvasRenderingContext2D): void {
		this.movement.prepareNextFrame()
		const { position } = this.movement.getPosition()
		ctx.strokeStyle = 'black'
		ctx.strokeRect(position.x, position.y, 16, 16)
	}
}

export default Player
