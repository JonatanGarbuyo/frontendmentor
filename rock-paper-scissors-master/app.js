import './components/choice.js'

const headerLogo = document.getElementById('header-logo')
const rulesButton = document.querySelector('.rules-button')
const rulesModal = document.querySelector('.rules-modal')
const rulesModalContainer = document.querySelector('.rules-modal-container')
const closeModalButton = document.querySelector('.close-modal')
const extendedGame = document.getElementById('extended')
const choicesContainer = document.getElementById('choices')
const scoreNumber = document.getElementById('score')

rulesButton.addEventListener('click', (e) => {
  rulesModal.classList.add('display-modal')
})

closeModalButton.addEventListener('click', (e) => {
  rulesModal.classList.remove('display-modal')
})

extendedGame.addEventListener('click', (e) => {
  const isExtendedGame = e.target.checked
  Game.isExtendedGame = isExtendedGame
  rulesModalContainer.children['image-rules'].src = isExtendedGame
    ? './images/image-rules-bonus.svg'
    : './images/image-rules.svg'
  headerLogo.src = isExtendedGame
    ? './images/logo-bonus.svg'
    : './images/logo.svg'
  Game.start()
})

document.addEventListener('DOMContentLoaded', () => {
  Game.newGame()
})

class Game {
  static isExtendedGame = false
  static choiceSize = 'normal'
  static choiceSizeSmall = 'small'
  static choices = [
    { name: 'paper', beats: ['rock', 'spock'] },
    { name: 'scissors', beats: ['paper', 'lizard'] },
    { name: 'rock', beats: ['scissors', 'lizard'] },
    { name: 'lizard', beats: ['paper', 'spock'] },
    { name: 'spock', beats: ['rock', 'scissors'] },
  ]

  static newGame() {
    scoreNumber.innerText = 0
    Game.start()
  }

  static start() {
    if (Game.isExtendedGame) {
      Game.displayExtendedGame()
    } else {
      Game.displayGame()
    }
  }

  static displayGame() {
    Game.displayChoices(Game.choices.slice(0, 3), Game.choiceSize)
    choicesContainer.style.backgroundImage = 'url(./images/bg-triangle.svg)'
    for (let child of choicesContainer.children) {
      child.classList.add('triangle')
    }
  }

  static displayExtendedGame() {
    Game.displayChoices(Game.choices, Game.choiceSizeSmall)
    choicesContainer.style.backgroundImage = 'url(./images/bg-pentagon.svg)'
    for (let child of choicesContainer.children) {
      child.classList.add('pentagram')
    }
  }

  static displayChoices(choices, size) {
    const choicesList = []
    choices.forEach((choice) => {
      const gameChoice = document.createElement('fem-game-choice')
      gameChoice.props = { choice, size }
      gameChoice.addEventListener('click', () => {
        this.play(choice)
      })
      choicesList.push(gameChoice)
    })
    choicesContainer.replaceChildren(...choicesList)
  }

  static play(choice) {
    const playerChoice = new Choice(choice)
    const choicesLength = Game.isExtendedGame
      ? Game.choices.length
      : Game.choices.length - 2
    const randomIndex = Math.floor(Math.random() * choicesLength)
    const computerChoice = new Choice(Game.choices[randomIndex])
    const matchResult = playerChoice.compare(computerChoice)

    Game.showMatch(playerChoice, computerChoice)
    Game.showResults(matchResult)
  }

  static showMatch(playerChoice, computerChoice) {
    choicesContainer.style.backgroundImage = 'none'

    const playerLabel = document.createElement('p')
    const computerLabel = document.createElement('p')
    playerLabel.classList.add('match')
    playerLabel.innerText = 'You picked'
    computerLabel.classList.add('match')
    computerLabel.innerText = 'The house Picked'

    const gameChoicePlayer = document.createElement('fem-game-choice')
    const gameChoiceComputer = document.createElement('fem-game-choice')
    gameChoicePlayer.classList.add('match')
    gameChoicePlayer.props = { choice: playerChoice, size: Game.choiceSize }
    gameChoiceComputer.classList.add('match')
    gameChoiceComputer.props = {
      choice: computerChoice,
      size: Game.choiceSize,
    }
    choicesContainer.replaceChildren(
      gameChoicePlayer,
      gameChoiceComputer,
      playerLabel,
      computerLabel
    )
  }

  static showResults(result) {
    const resultTitle = document.createElement('h2')
    resultTitle.classList.add('result-title')
    const playAgainButton = document.createElement('button')
    playAgainButton.classList.add('play-again')
    playAgainButton.innerText = 'Play Again'
    playAgainButton.addEventListener('click', () => Game.start())

    const posibilities = {
      lose: () => {
        resultTitle.innerText = 'You lose'
      },
      draw: () => {
        resultTitle.innerText = "It's a draw"
      },
      win: () => {
        resultTitle.innerText = 'You win!'
        let score = parseInt(scoreNumber.textContent)
        scoreNumber.innerText = ++score
      },
    }
    posibilities[result]()
    choicesContainer.appendChild(resultTitle)
    choicesContainer.appendChild(playAgainButton)
  }
}

class Choice {
  constructor(choice) {
    this.name = choice.name
    this.beats = choice.beats
  }

  compare(other) {
    if (other.name === this.name) return 'draw'
    return this.beats.includes(other.name) ? 'win' : 'lose'
  }
}
