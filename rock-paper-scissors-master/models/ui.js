export default class UI {
  constructor() {
    this.headerLogo = document.getElementById('header-logo')
    this.rulesButton = document.querySelector('.rules-button')
    this.rulesModal = document.querySelector('.rules-modal')
    this.rulesModalContainer = document.querySelector('.rules-modal-container')
    this.closeModalButton = document.querySelector('.close-modal')
    this.choicesContainer = document.getElementById('choices-container')
    this.scoreNumber = document.getElementById('score')
    this.extendedGameSelector = document.getElementById('extended')

    this.extendedGameSelector.addEventListener('click', (e) =>
      this.game.setIsExtended(e.target.checked)
    )
    this.rulesButton.addEventListener('click', () =>
      this.toggleDisplayRulesModal()
    )
    this.closeModalButton.addEventListener('click', () =>
      this.toggleDisplayRulesModal()
    )
  }

  update(game, event) {
    switch (event) {
      case 'updateScore':
        this.updateScore()
        break
      case 'start':
        this.game = game
        this.displayGame()
        break
      case 'updateIsExtended':
        this.displayGame()
        break
      case 'displayRoundResult':
        this.updateResult()
        break
      default:
        break
    }
  }

  displayGame() {
    const isExtended = this.game.getIsExtended()
    const choiceElements = this.game.getChoices().map((choice) => {
      const gameChoice = document.createElement('fem-game-choice')
      const size = isExtended ? 'small' : 'normal'
      gameChoice.props = { choice, size }
      gameChoice.addEventListener('click', () => this.game.playRound(choice))
      gameChoice.classList.add(isExtended ? 'pentagram' : 'triangle')
      return gameChoice
    })
    this.choicesContainer.replaceChildren(...choiceElements)
    this.toggleDisplayModes()
  }

  updateScore() {
    this.scoreNumber.innerText = this.game.getScore()
  }

  toggleDisplayRulesModal() {
    this.rulesModal.classList.toggle('display-modal')
  }

  toggleDisplayModes() {
    const isExtendedGame = this.game.getIsExtended()
    this.rulesModalContainer.children['image-rules'].src = isExtendedGame
      ? './images/image-rules-bonus.svg'
      : './images/image-rules.svg'

    this.headerLogo.src = isExtendedGame
      ? './images/logo-bonus.svg'
      : './images/logo.svg'

    this.choicesContainer.style.backgroundImage = isExtendedGame
      ? 'url(./images/bg-pentagon.svg)'
      : 'url(./images/bg-triangle.svg)'
  }

  updateResult() {
    this.showSelections()
    setTimeout(() => {
      this.showResults()
    }, 500)
  }

  showSelections() {
    this.choicesContainer.style.backgroundImage = 'none'
    const size = this.game.getIsExtended() ? 'small' : 'normal'
    const playerLabel = document.createElement('p')
    const computerLabel = document.createElement('p')
    const playerSelection = document.createElement('fem-game-choice')
    const computerSelection = document.createElement('fem-game-choice')

    playerLabel.classList.add('match')
    playerLabel.innerText = 'You picked'
    playerSelection.classList.add('match')

    computerLabel.classList.add('match')
    computerLabel.innerText = 'The house Picked'
    computerSelection.classList.add('match')

    playerSelection.props = {
      choice: this.game.playerChoice,
      size,
    }
    computerSelection.props = {
      choice: this.game.computerChoice,
      size,
    }

    this.choicesContainer.replaceChildren(
      playerSelection,
      computerSelection,
      playerLabel,
      computerLabel
    )
  }

  showResults() {
    const resultTitle = document.createElement('h2')
    resultTitle.classList.add('result-title')
    const playAgainButton = document.createElement('button')
    playAgainButton.classList.add('play-again')
    playAgainButton.innerText = 'Play Again'
    playAgainButton.addEventListener('click', () => this.game.start())

    const posibilities = {
      lose: () => {
        resultTitle.innerText = 'You lose'
      },
      draw: () => {
        resultTitle.innerText = "It's a draw"
      },
      win: () => {
        resultTitle.innerText = 'You win!'
      },
    }
    posibilities[this.game.result]()
    this.choicesContainer.appendChild(resultTitle)
    this.choicesContainer.appendChild(playAgainButton)
  }
}
