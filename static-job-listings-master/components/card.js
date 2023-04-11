import { cardTemplate } from './cardTemplate.js'

class jobOfferCard extends HTMLElement {
  _offerData = {}
  _tagsList = []

  constructor() {
    super()
    this._root = this.attachShadow({ mode: 'closed' })
  }

  set offer(data) {
    this._offerData = data
    this.render()
  }

  render() {
    const template = document.createElement('template')
    template.innerHTML = `
      <link rel="stylesheet" href="./styles/reset.css" />
      <link rel="stylesheet" href="./styles/utility.css" />
      <link rel="stylesheet" href="./styles/card.css" />
      ${cardTemplate({
        offer: this._offerData,
      })}
    `
    this._root.appendChild(template.content.cloneNode(true))
  }
}

customElements.define('fem-job-offer-card', jobOfferCard)
