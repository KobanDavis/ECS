import './index.css'
import { Canvas } from '@kobandavis/canvas'
import Game from './Game'

const canvas = new Canvas(window.innerWidth, window.innerHeight)
const game = new Game(canvas)
game.start()
