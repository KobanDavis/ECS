import { Canvas } from '@kobandavis/canvas'
import { Entity, System } from '../../ECS'
import { KeyboardInput, Movement, RenderStatic } from '../../Systems'

class Game {
	private _entities: Map<string, Entity>
	private _canvas: Canvas
	private _systems: System[]
	constructor() {
		this._entities = new Map()
		this._canvas = new Canvas(window.innerWidth, window.innerHeight)
		this._systems = [new RenderStatic(this._canvas.ctx), new KeyboardInput(), new Movement()]
		this.start = this.start.bind(this)
	}

	public start(): void {
		this._canvas.resetDraw()
		for (let system of this._systems) {
			system.update()
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
