export default class Router {
  constructor() {
    this.routes = {}
    this.currentRoute = ''
    this.defaultRoute = '/'
  }

  addRoute(path, callback) {
    this.routes[path] = callback
  }

  navigateTo(route = '') {
    this.currentRoute = route
    window.history.pushState(null, null, route)

    if (route.includes('name')) {
      let [root, path, prop] = route.split('/')
      path = '/' + path + '/:countryName'
      this.routes[path](prop)
    } else {
      this.routes[route]()
    }
  }

  start() {
    const path = window.location.pathname
    this.currentRoute = path
    this.routes[path]()
  }

  extractParam(route, pattern) {
    const params = {}
    const routeParts = route.split('/')
    const patternParts = pattern.split('/')

    for (let i = 0; i < patternParts.length; i++) {
      if (patternParts[i].startsWith(':')) {
        const paramName = patternParts[i].slice(1)
        const paramValue = routeParts[i]
        params[paramName] = paramValue
      }
    }

    return params
  }
}
