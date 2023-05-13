import all from '../all.json' assert { type: 'json' }

// Endpoint de la API
const API_ENDPOINT = 'https://restcountries.com/v3.1'
const FIELDS = [
  'name',
  'population',
  'region',
  'subregion',
  'capital',
  'tld',
  'currencies',
  'languages',
  'borders',
  'cca3',
  'flags',
]

export class CountryDataService {
  constructor() {
    // this.countryData = all
    this.countryData = []
  }

  async getAllCountryData() {
    try {
      const response = await fetch(
        `${API_ENDPOINT}/all/?fields=${FIELDS.join(',')}`
      )
      const data = await response.json()
      this.countryData = data
    } catch (error) {
      // alert(error)
      this.countryData = all
    }
  }

  async getAllCountries() {
    if (!this.countryData.length) {
      await this.getAllCountryData()
    }
    return this.countryData
  }

  getCountriesByRegion(region) {
    return this.countryData.filter((country) => country.region === region)
  }

  getCountryNameByCCA3(cca3) {
    const code = cca3.toLowerCase()
    const country = this.countryData.find(
      (country) => country.cca3.toLowerCase() === code
    )
    return country?.name.common || null
  }

  getCountriesByName(name = '') {
    return this.countryData.filter((country) => {
      return country.name.common.toLowerCase().includes(name.toLowerCase())
    })
  }

  getCountryByName(name = '') {
    let countryName = name.toLowerCase()

    const country = this.countryData.find((country) => {
      return country.name.common.toLowerCase() === countryName
    })

    if (country.borders) {
      country.bordersCountries = country.borders?.map((ISO) =>
        this.getCountryNameByCCA3(ISO)
      )
    }
    country.nativeName = Object.values(country.name.nativeName)[0].common
    country.languagesList = Object.values(country.languages).join(', ')
    country.allCurrencies = Object.values(country.currencies)
      .map((curr) => curr.name)
      .join(', ')
    return country
  }

  getLanguagesList(country) {
    const languagesList = []
    for (let lang of Object.values(country.languages)) {
      languagesList.push(lang)
    }
    return languagesList
  }

  static getInstance() {
    if (!CountryDataService.instance) {
      CountryDataService.instance = new CountryDataService()
    }
    return CountryDataService.instance
  }
}
