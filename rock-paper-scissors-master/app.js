import './components/choice.js'
import Game from './models/game.js'
import UI from './models/ui.js'

/* 
The game object has the game state.
The ui observes the game state and changes accordingly
*/
const ui = new UI()
const game = new Game()
game.addObserver(ui)
game.start()
