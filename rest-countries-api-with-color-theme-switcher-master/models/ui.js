export default class UI {
  constructor(router, dataService) {
    this.router = router
    this.dataService = dataService
    this.debounceTimer = null
    this.debounceDuration = 500

    this.countryDetail = document.getElementById('country-detail')
    this.countriesList = document.getElementById('countries-list')
    this.filterContainer = document.getElementById('filter-container')
    this.searchInput = document.getElementById('search')
    this.customSelect = document.querySelector('fm-custom-select')
    this.toggleSwitch = document.querySelector('fm-toggle-switch')

    this.toggleSwitch.isChecked =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme:dark)').matches

    this.router.addRoute('/', this.home.bind(this))
    this.router.addRoute(
      '/name/:countryName',
      this.showCountryByName.bind(this)
    )

    document.addEventListener('toggle-theme', this.toggleTheme.bind(this))
    document.addEventListener('navigate-to', this.handleNavigation.bind(this))
    this.searchInput.addEventListener('input', this.handleSearch.bind(this))
    this.customSelect.addEventListener(
      'change',
      this.handleRegionChange.bind(this)
    )

    // Si se utiliza el evento 'popstate' para manejar los cambios de historial
    window.addEventListener('popstate', () => {
      this.router.start()
    })
  }

  displayCountriesList(countries) {
    this.countriesList.style.display = 'grid'
    this.filterContainer.style.display = 'flex'
    this.countryDetail.style.display = 'none'
    this.countriesList.replaceChildren(
      ...countries.map((country) => {
        const countryCard = document.createElement('fm-country-card')
        countryCard.country = country
        return countryCard
      })
    )
  }

  displayCountryDetail(country) {
    this.searchInput.value = ''
    this.countriesList.style.display = 'none'
    this.filterContainer.style.display = 'none'
    this.countryDetail.style.display = 'block'
    const detail = document.createElement('fm-country-detail')
    detail.country = country
    this.countryDetail.replaceChildren(detail)
  }

  showCountryByName(name) {
    const country = this.dataService.getCountryByName(name)
    this.displayCountryDetail(country)
  }

  async home() {
    const countries = await this.dataService.getAllCountries()
    this.displayCountriesList(countries)
  }

  debounce(func, delay) {
    clearTimeout(this.debounceTimer)
    this.debounceTimer = setTimeout(func, delay)
  }

  handleSearch() {
    this.debounce(() => {
      const searchTerm = this.searchInput.value.toLowerCase()
      const countriesByName = this.dataService.getCountriesByName(searchTerm)
      this.displayCountriesList(countriesByName)
    }, this.debounceDuration)
  }

  handleRegionChange(e) {
    const region = e.target.value
    const countriesByRegion = this.dataService.getCountriesByRegion(region)
    this.displayCountriesList(countriesByRegion)
    this.searchInput.value = ''
  }

  toggleTheme(e) {
    const { isChecked } = e.detail
    const currentTheme = document.documentElement.getAttribute('theme')

    if (isChecked || currentTheme === 'light') {
      document.documentElement.setAttribute('theme', 'dark')
    } else {
      document.documentElement.setAttribute('theme', 'light')
    }
  }

  handleNavigation(e) {
    const { route } = e.detail
    this.router.navigateTo(route)
  }
}
