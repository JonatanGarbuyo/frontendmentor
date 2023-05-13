const SELECT_TEMPLATE = /*HTML*/ `
    <style>
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }
      
      label {
        position: relative;
        font-size: 12px;
      }

      ul{
        background-color: var(--bg-color-primary);
        border-radius: 4px;
        display: none;
        list-style: none;
        margin-top: 4px;
        padding-block: 8px;
        position: absolute;
        width: 200px;
        z-index: 1;
      }

      li {
        padding-block: 6px;
        padding-left: 24px;
      }

      li:hover {
        background-color: var(--bg-color-secondary);
      }
      
      select {
        appearance: none;
        -moz-appearance: none;
        -webkit-appearance: none;
        background-color: var(--bg-color-primary);
        border-radius: 4px;
        border: none;
        color:inherit;
        font-size: inherit;
        height: 48px;
        outline: none;
        padding-left: 22px;
        width: 200px;
      }

      .visible{
        display: block;
      }

      .flipped{
        transform: rotate(180deg);
      }

      .arrow{
        color: var(--color-primary);
        position: absolute;
        top: 2px;
        right: 12px;
      }

      
      /* Media queries  */
      @media (min-width: 768px) {
        label {
          font-size: 14px;
        }
    </style>

    <label>
      <select id="select">
      </select>
      <svg
        class="arrow"
        width="16px"
        height="16px"
        stroke-width="1"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        color="#000000"
      >
        <path
          d="M6 9l6 6 6-6"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
      </svg>
      
      <slot></slot>
      <ul id="display"></ul>
      </label>
`

class CustomSelect extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this._value = ''

    const template = document.createElement('template')
    template.innerHTML = `${SELECT_TEMPLATE}`
    this.shadowRoot.appendChild(template.content.cloneNode(true))

    this.display = this.shadowRoot.getElementById('display')
    this.select = this.shadowRoot.querySelector('select')
    this.arrow = this.shadowRoot.querySelector('.arrow')

    this.addEventListener('mousedown', this.showOptionsToggle)
    this.shadowRoot.addEventListener('slotchange', this.handleSlotChange)
  }

  get value() {
    return this._value
  }

  handleSlotChange = (e) => {
    let option = this.querySelector('option')
    option && this.select.append(option)

    if (option && option.value !== 'title') {
      const customOption = document.createElement('li')
      customOption.addEventListener('mousedown', (e) =>
        this.handleOptionSelection(e, option.value)
      )
      customOption.innerText = option.value
      this.display.append(customOption)
    }
  }

  handleOptionSelection = (e, value) => {
    e.stopPropagation()
    this.select.value = value
    this._value = value
    this.dispatchEvent(new Event('change'))
    this.hideOptions()
  }

  showOptionsToggle = (e) => {
    e.preventDefault()
    this.display.classList.toggle('visible')
    this.arrow.classList.toggle('flipped')
  }

  hideOptions = (e) => {
    this.display.classList.remove('visible')
    this.arrow.classList.remove('flipped')
  }

  connectedCallback() {
    // Agregar event listener a document para detectar click fuera del elemento
    document.addEventListener('click', this.handleOutsideClick)
  }

  disconnectedCallback() {
    // Remover event listener al desconectar el elemento
    document.removeEventListener('click', this.handleOutsideClick)
  }

  handleOutsideClick = (event) => {
    // Comprobar si el click se hizo fuera del fm-custom-select
    if (!this.contains(event.target)) {
      // Ocultar el elemento display
      this.hideOptions()
    }
  }
}

customElements.define('fm-custom-select', CustomSelect)
