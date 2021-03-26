import { Entity } from '../ECS'

export type withEntityFn = (entity: Entity) => void

class Assemblage {
	public withEntity: (cb: withEntityFn) => void
}

export default Assemblage
