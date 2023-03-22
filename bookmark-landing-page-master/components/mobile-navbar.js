class MobileNavbar extends HTMLElement {
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
  attributeChangedCallback(attrName, oldVal, newVal) {
    // ...
  }

  async connectedCallback() {
    const response = await fetch('./components/mobile-navbar.html')
    const navbarText = await response.text()
    const navbarTemplate = document.createElement('template')
    navbarTemplate.innerHTML = navbarText
    this._root.appendChild(navbarTemplate.content.cloneNode(true))
  }

  disconnectedCallback() {
    // ...
  }
  // attributeChangedCallback is invoked each time one of the custom element's
  // attributes is added, removed, or changed.
  // Which attributes to notice change for is specified in a
  // static get observedAttributes method.
  static get observedAttributes() {
    return ['']
  }
}
window.customElements.define('fm-mobile-navbar', MobileNavbar)
