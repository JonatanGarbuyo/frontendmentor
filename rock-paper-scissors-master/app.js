const rulesButton = document.querySelector('.rules-button')
const rulesModal = document.querySelector('.rules-modal')
const closeModalButton = document.querySelector('.close-modal')

rulesButton.addEventListener('click', (e) => {
  console.log('click')
  rulesModal.classList.add('display-modal')
})

closeModalButton.addEventListener('click', (e) => {
  rulesModal.classList.remove('display-modal')
})
