class Choice extends HTMLElement {
  constructor() {
    super()
    this._root = this.attachShadow({ mode: 'closed' })
  }

  set props({ choice, size }) {
    this._choiceName = choice.name
    this._choiceSize = size
    this.render()
  }

  async connectedCallback() {
    this.render()
  }

  get style() {
    return /*CSS*/ `
      <style>
      .choice {
        -moz-box-shadow: 0px -5px 0px 0px rgba(0, 0, 0, 0.2) inset;
        -webkit-box-shadow: 0px -5px 0px 0px rgba(0, 0, 0, 0.2) inset;
        box-shadow: 0px -5px 0px 0px rgba(0, 0, 0, 0.2) inset;
        background-image: linear-gradient(to top, var(--color-${this._choiceName}-gradient));
        align-items: center;
        border-radius: 100%;
        border: none;
        display: flex;
        height: 132px;
        height: var(--choice-${this._choiceSize}-height);
        justify-content: center;
        position: relative;
        width: var(--choice-${this._choiceSize}-width);
      }

      .choice:active {
        transform: translatey(1px);
      }

      .choice::before {
        -moz-box-shadow: 0px 5px 0px 0px rgba(0, 0, 0, 0.15) inset;
        -webkit-box-shadow: 0px 5px 0px 0px rgba(0, 0, 0, 0.15) inset;
        box-shadow: 0px 5px 0px 0px rgba(0, 0, 0, 0.15) inset;
        background-color: var(--color-light-gray);
        border-radius: 100%;
        content: '';
        display: block;
        height: 76%;
        width: 85%;
      }

      .choice::after {
        background-image: url('./images/icon-${this._choiceName}.svg');
        background-position: center;
        background-repeat: no-repeat;
        background-size: 80%;
        content: '';
        height: 50%;
        position: absolute;
        width: 50%;
      }
    </style>
  `
  }

  render() {
    const template = document.createElement('template')
    template.innerHTML = /*HTML*/ `
      ${this.style}
      <button id="${this._choiceName}" class="choice"></button>
    `
    this._root.replaceChildren(template.content.cloneNode(true))
  }
}

customElements.define('fem-game-choice', Choice)
