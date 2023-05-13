function detailTemplate(country) {
  return /*HTML*/ `
    <style>
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }

      .country-card {
        background-color: var(--bg-color-primary);
        border-radius: 4px;
        box-shadow: 0 0 5px var(--box-shadow);
        color: var(--text-color-primary);
        display: flex;
        flex-direction: column;
        font-weight: var(--font-weight-regular);
        max-width: 264px;
        overflow: hidden;
        text-decoration: none;
      }

      .country-card img {
        order: -1;
        position: relative;
      }

      .country-name {
        font-size: var(--font-size-500);
        padding-block: 24px;
        padding-inline: 25px;
      }

      .country-props {
        display: flex;
        flex-direction: column;
        gap: 12px;
        list-style: none;
        padding-bottom: 20px;
        padding-inline: 25px;
      }

      .country-card span {
        color: var(--text-color-secondary);
      }
    </style>

    <a id="country-card" class="country-card" href="/name/${
      country.name.common
    }" >
      <img
        src="${country.flags?.png}"
        alt="${country.name.official}"
        width="264"
        height="160"
      />
      <h2 class="country-name">${country.name.common}</h2>
      <ul class="country-props" role="list">
        <li role="list">Population: ${country.population.toLocaleString(
          'en-US'
        )}</li>
        <li role="list">Region: ${country.region}</li>
        <li role="list">Capital: ${country.capital}</li>
      </ul>
    </a>
  `
}

class CountryDetail extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this._country = {}
  }

  set country(country) {
    this._country = country
  }

  handleNavigation(e) {
    e.preventDefault()
    this.dispatchEvent(
      new CustomEvent('navigate-to', {
        detail: { route: this.getAttribute('href') },
        bubbles: true,
        composed: true,
      })
    )
  }

  render() {
    const template = document.createElement('template')
    template.innerHTML = detailTemplate(this._country)
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this.shadowRoot
      .getElementById('country-card')
      .addEventListener('click', this.handleNavigation)
  }

  connectedCallback() {
    this.render()
  }
}

customElements.define('fm-country-card', CountryDetail)
