import GameStrategy from './strategy.js'

export default class Game {
  constructor(isExtended = false) {
    this.observers = []
    this.setIsExtended(isExtended)
    this.strategy = new GameStrategy()
  }

  #score = 0
  #isExtended = false
  #choices = [
    { name: 'rock', beats: ['scissors', 'lizard'] },
    { name: 'paper', beats: ['rock', 'spock'] },
    { name: 'scissors', beats: ['paper', 'lizard'] },
    { name: 'lizard', beats: ['paper', 'spock'] },
    { name: 'spock', beats: ['rock', 'scissors'] },
  ]

  addObserver(o) {
    this.observers.push(o)
  }

  notifyObservers(event) {
    for (let observer of this.observers) {
      observer.update(this, event)
    }
  }

  start() {
    this.notifyObservers('start')
    this.notifyObservers('updateScore')
  }

  setIsExtended(boolean) {
    this.#isExtended = boolean
    this.notifyObservers('updateIsExtended')
  }

  getIsExtended() {
    return this.#isExtended
  }

  getChoices() {
    const choicesList = this.#isExtended
      ? this.#choices
      : this.#choices.slice(0, 3)
    return choicesList
  }

  getScore() {
    return this.#score
  }

  incrementScore() {
    this.#score++
    this.notifyObservers('updateScore')
  }

  playRound(playerChoice) {
    this.playerChoice = playerChoice
    this.computerChoice =
      this.getChoices()[Math.floor(Math.random() * this.getChoices().length)]
    this.result = this.strategy.playRound(
      this.playerChoice,
      this.computerChoice
    )

    if (this.result === 'win') {
      this.incrementScore()
    }

    this.notifyObservers('displayRoundResult')
  }
}
