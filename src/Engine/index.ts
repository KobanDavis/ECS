import { Canvas } from '@kobandavis/canvas'
import { Entity, System } from '../ECS'

class Engine {
	public systems: System[]
	public canvas: Canvas
	private _entities = new Map<string, Entity>()
	private _frame: number = 0
	constructor() {
		this.canvas = new Canvas(window.innerWidth, window.innerHeight)
		this.systems = []

		this.nextTick = this.nextTick.bind(this)
		this.addEntity = this.addEntity.bind(this)

		this._handleCanvasResize()
	}

	private _handleCanvasResize(): void {
		window.onresize = () => this.canvas.resizeCanvas(window.innerWidth, window.innerHeight)
	}

	public nextTick(): void {
		this._frame++
		this.canvas.resetDraw()
		for (let system of this.systems) {
			system.update(this._frame)
		}
	}

	public addEntity(entity: Entity): void {
		this._entities.set(entity.id, entity)
		for (let system of this.systems) {
			system.enter(entity)
		}
	}

	public removeEntity(id: Entity['id']): void {
		for (let system of this.systems) {
			system.exit(id)
		}
	}
}

export default Engine
