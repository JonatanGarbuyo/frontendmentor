function detailTemplate(country) {
  return /*HTML*/ `
    <style>
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }

      ul {
        list-style: none;
      }
      
      a {
        text-decoration: none;
      }

      .button {
        align-items: center;
        background-color: var(--bg-color-primary);
        box-shadow: 0 0 5px var(--box-shadow);
        color: var(--text-color-primary);
        display: flex;
        height: 32px;
        justify-content: center;
        position: relative;
        width: 104px;
      }

      .btn-small {
        height: 28px;
        width: 96px;
      }
      
      .flex {
        display: flex;
      }

      .country-detail {
        max-width: 1440px;
        padding-inline: 28px;
        width: 100%;
      }
      .country-detail-nav {
        padding-block: 40px;
      }
      .arrow-left-icon {
        -webkit-mask-image: url('../images/arrow-left.svg');
        -webkit-mask-size: cover;
        background: var(--text-color-primary);
        display: inline-block;
        height: 16px;
        left: 12px;
        mask-image: url('../images/arrow-left.svg');
        mask-size: cover;
        position: absolute;
        top: 8px;
        width: 16px;
      }

      .country-detail-container {
        flex-direction: column;
        padding-block: 24px;
      }
      .country-detail-container img {
        align-self: center;
      }

      .country-detail-name {
       margin-block: 28px;
      }

      .country-detail-props {
        flex-direction: column;
        gap: 28px;
      }
      .country-detail-props li {
        margin-bottom: 16px;
      }
      .country-detail-props span {
        font-weight: var(--font-weight-bold);
      }

      .country-detail-borders p{
        font-size: var(--font-size-500);
        font-weight: var(--font-weight-bold);
        margin-block: 24px;
      }

      .country-detail-borders-list{
        flex-wrap: wrap;
        gap: 10px;
      }

      /* Media queries  */
      @media (min-width: 768px) {
        .country-detail {
          padding-inline: 80px;
        }

        .country-detail-container {
          justify-content: center;
          flex-direction: row;
          gap: clamp(20px, 8vw, 120px)
        }        
      }

      @media (min-width: 1024px) {
        .country-detail-container img {
          width: 460px;
          height: 329px;
        }
      }
      @media (min-width: 1200px) {
        .country-detail-container img {
          width: 560px;
          height: 400px;
        }
      }

    </style>

    <div class="country-detail" >
      <div class="country-detail-nav">
        <a class="button" href="/">
          <i class="arrow-left-icon"></i>
          <span>Back</span>
        </a>
      </div>
      <div class="flex country-detail-container" >
        <img
          src="${country.flags?.png}"
          alt="${country.name.official}"
          width="320"
          height="229"
        />
        <div class="country-detail-content" >
          <h2 class="country-detail-name">${country.name.common}</h2>
          <div class="flex country-detail-props">
            <ul role="list">
              <li role="list"><span>Native Name: </span>${
                country.nativeName
              }</li>
              <li role="list"><span>Population: </span>${country.population.toLocaleString(
                'en-US'
              )}</li>
              <li role="list"><span>Region: </span>${country.region}</li>
              <li role="list"><span>Sub Region: </span>${country.subregion}</li>
              <li role="list"><span>Capital: </span>${country.capital}</li>
            </ul>
            <ul role="list">
              <li role="list"><span>Top Level Domain: </span>${country.tld}</li>
              <li role="list"><span>Currencies: </span>${
                country.allCurrencies
              }</li>
              <li role="list"><span>Languages: </span>${
                country.languagesList
              }</li>
            </ul>
          </div>
          <div class="country-detail-borders">
            <p>Border Countries:</p>
            <div  class="flex country-detail-borders-list">
              ${
                country.bordersCountries &&
                country.bordersCountries
                  .map(
                    (countryName) =>
                      /*HTML*/ `<a class="button btn-small" href="/name/${countryName}">${countryName}</a>`
                  )
                  .join('')
              }
            </div>
          </div>
        </div>
      </div>
    </div>
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
      .querySelectorAll('a')
      .forEach((link) => link.addEventListener('click', this.handleNavigation))
  }

  connectedCallback() {
    this.render()
  }
}

customElements.define('fm-country-detail', CountryDetail)
