import './components/toggle-switch.js'
import './components/custom-select.js'
import './components/country-card.js'
import './components/country-detail.js'

import UI from './models/ui.js'
import Router from './models/router.js'
import { CountryDataService } from './services/countries.js'

const dataService = CountryDataService.getInstance()
const router = new Router()
const ui = new UI(router, dataService)
ui.router.start()
