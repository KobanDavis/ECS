import { Canvas } from '@kobandavis/canvas'
import Entity from '../../ECS/Entity'
import System from '../../ECS/System'
import KeyboardInput from '../../Systems/KeyboardInput'
import RenderStatic from '../../Systems/RenderStatic'

class Game {
	private _entities: Map<string, Entity>
	private canvas: Canvas
	private systems: System[]
	constructor() {
		this._entities = new Map()
		this.canvas = new Canvas(window.innerWidth, window.innerHeight)
		this.systems = [new RenderStatic(this.canvas.ctx), new KeyboardInput()]
		this.start = this.start.bind(this)
	}

	public start(): void {
		for (let system of this.systems) {
			system.update()
		}
		window.requestAnimationFrame(this.start)
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

export default Game
