import './index.css'
import Game from './Classes/Game'
import { Player } from './Assemblages'

const init = async () => {
	const game = new Game()

	const player = new Player()
	await player.init()
	player.loadIntoGame(game)

	game.start()
}

init()
