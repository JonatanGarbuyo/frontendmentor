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

  disconnectedCallback() {
    this.tagList.forEach((tag) => {
      tag.removeEventListener('click', this.handleClick)
    })
  }

  handleClick(e) {
    if (e.type === 'click') {
      const event = new CustomEvent('add-filter-tag', {
        detail: { tagName: e.target.innerText },
        bubbles: true,
        composed: true,
      })
      this.dispatchEvent(event)
    }
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
    this.tagList = this._root.querySelectorAll('.tag-list li')
    this.tagList.forEach((tag) => {
      tag.addEventListener('click', this.handleClick)
    })
  }
}

customElements.define('fem-job-offer-card', jobOfferCard)
