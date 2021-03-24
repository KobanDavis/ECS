import Game from '../Classes/Game'
import { Entity } from '../ECS'

class Assemblage {
	public init: () => Promise<Entity>
	public loadIntoGame: (game: Game) => void
}

export default Assemblage
