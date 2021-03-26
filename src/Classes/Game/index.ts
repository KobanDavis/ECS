import { Canvas } from '@kobandavis/canvas'
import { Entity, System } from '../../ECS'
import { KeyboardInput, Movement, RenderAnimated, RenderStatic } from '../../Systems'
import AssetManager from '../AssetManager'

class Game {
	public assetManager = new AssetManager()
	private _entities = new Map<string, Entity>()
	private _canvas: Canvas
	private _systems: System[]
	private _frame: number = 0
	constructor() {
		this._canvas = new Canvas(window.innerWidth, window.innerHeight)
		this._systems = [
			new RenderStatic(this._canvas.ctx, this.assetManager),
			new RenderAnimated(this._canvas.ctx, this.assetManager),
			new KeyboardInput(),
			new Movement(),
		]
		this.start = this.start.bind(this)
		this.addEntity = this.addEntity.bind(this)
		this._handleCanvasResize()
	}

	private _handleCanvasResize(): void {
		window.onresize = () => (console.log('test'), this._canvas.resizeCanvas(window.innerWidth, window.innerHeight))
	}

	public start(): void {
		this._frame++
		this._canvas.resetDraw()
		this._canvas.ctx.fillStyle = '#140c1c'
		this._canvas.ctx.fillRect(0, 0, this._canvas.boundary.width, this._canvas.boundary.height)
		for (let system of this._systems) {
			system.update(this._frame)
		}
		window.requestAnimationFrame(this.start)
	}

	public addEntity(entity: Entity): void {
		this._entities.set(entity.id, entity)
		for (let system of this._systems) {
			system.enter(entity)
		}
	}

	public removeEntity(id: Entity['id']): void {
		for (let system of this._systems) {
			system.exit(id)
		}
	}
}

export default Game
