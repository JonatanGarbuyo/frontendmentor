export default class GameStrategy {
  playRound(playerChoice, computerChoice) {
    if (playerChoice.beats.includes(computerChoice.name)) {
      return 'win'
    } else if (playerChoice === computerChoice) {
      return 'draw'
    } else {
      return 'lose'
    }
  }
}
