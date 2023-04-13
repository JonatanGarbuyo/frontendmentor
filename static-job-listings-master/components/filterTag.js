class FilterTag extends HTMLElement {
  constructor() {
    super()
    this._root = this.attachShadow({ mode: 'closed' })
  }

  static get observedAttributes() {
    return ['tag-name']
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    if (newVal !== oldVal) {
      switch (attrName) {
        case 'tag-name':
          this._tagName = newVal
          break
        default:
          break
      }
    }
  }

  async connectedCallback() {
    this.render()
  }

  disconnectedCallback() {
    this.button.removeEventListener('click', this)
  }

  handleClick(e) {
    if (e.type === 'click') {
      const event = new CustomEvent('remove-filter-tag', {
        detail: { tagName: e.target.id },
        bubbles: true,
        composed: true,
      })
      this.dispatchEvent(event)
    }
  }

  render() {
    const template = document.createElement('template')
    template.innerHTML = /*HTML*/ `
      <link rel="stylesheet" href="./styles/reset.css" />
      <link rel="stylesheet" href="./styles/utility.css" />
      <link rel="stylesheet" href="./styles/filter-tag.css" />
      <li
      class="bg-neutral-100 text-primary-400 fw-bold filter-tag"
      aria-label="${this._tagName}"
      >
        <p>${this._tagName}</p>
        <button id="${this._tagName}" class="bg-primary-400 text-white remove">
        </button>
      </li>
    `
    this._root.appendChild(template.content.cloneNode(true))
    this.button = this._root.getElementById(`${this._tagName}`)
    this.button.addEventListener('click', this.handleClick)
  }
}

customElements.define('fem-filter-tag', FilterTag)
