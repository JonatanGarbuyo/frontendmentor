class TabCard extends HTMLElement {
  constructor() {
    super()
    this._root = this.attachShadow({ mode: 'closed' })
  }

  // There are four special lifecycle callbacks for custom elements
  // that we can use to append custom markdown to the page:
  // adoptedCallback, attributeChangeCallback, connectedCallback and
  // disconnectedCallback.
  adoptedCallback() {
    // ...
  }

  // attributeChangedCallback is invoked each time one of the custom element's
  // attributes is added, removed, or changed.
  // Which attributes to notice change for is specified in a
  // static get observedAttributes method.
  attributeChangedCallback(attrName, oldVal, newVal) {
    if (newVal !== oldVal && this.isConnected)
      switch (attrName) {
        case 'image-url':
          this.imageUrl = newVal
          break
        case 'image-width':
          this.imageWidth = newVal
          break
        case 'image-height':
          this.imageHeight = newVal
          break
        case 'title':
          this.title = newVal
          break
        case 'text':
          this.text = newVal
          break
        case 'visible':
          this.visible = newVal
          const card = this._root.querySelector('.tab-card')
          if (card)
            card.style =
              newVal === 'true' ? 'display: flex !important' : 'display: none '
          break
      }
  }

  static get observedAttributes() {
    return [
      'image-url',
      'image-width',
      'image-height',
      'title',
      'text',
      'visible',
    ]
  }

  connectedCallback() {
    const tabCardTemplate = document.createElement('template')
    tabCardTemplate.innerHTML = `
    <link rel="stylesheet" href="index.css" />
    <link rel="stylesheet" href="media-queries.css" />
    <div class="tab-card" id="card"  style="${
      this.visible === 'true' ? 'display: flex !important' : ''
    }">
      <img
        class="tab-card-image"
        src="${this.imageUrl}"
        width="${this.imageWidth}"
        height="${this.imageHeight}"
        alt="organize"
      />
      <div>
        <h3 class="tab-card-title subtitle">${this.title}</h3>
        <p class="text tab-card-text">${this.text}
        </p>
        <button class="button hover-blue">More Info</button>
      </div>
    </div>
    `
    this._root.appendChild(tabCardTemplate.content.cloneNode(true))
  }

  disconnectedCallback() {
    // ...
  }
}

window.customElements.define('fm-tab-card', TabCard)
