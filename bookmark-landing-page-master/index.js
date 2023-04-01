import './components/mobile-navbar.js'
import './components/tab-card.js'

const tabs = document.querySelectorAll('.features input')

tabs.forEach((tab) => {
  tab.addEventListener('input', (e) => {
    const value = e.target.value

    const cardsList = document.querySelectorAll('fm-tab-card')
    cardsList.forEach((card) => {
      card.setAttribute('visible', card.id === `${value}-card`)
    })
  })
})
