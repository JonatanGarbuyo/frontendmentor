import './components/card.js'
import './components/filterTag.js'
import { getJobList } from './services/jobOffers.js'

class UI {
  static _offersList = []
  static _filterTagList = new Set()

  static set offersList(newOffersList) {
    UI._offersList = newOffersList.map((offer) => {
      offer.tagList = [
        offer.role,
        offer.level,
        ...offer.languages,
        ...offer.tools,
      ]
      return offer
    })

    UI.render()
  }

  static render() {
    UI.displayfilters()
    UI.displayOffers()
  }

  static displayfilters() {
    const filterContainer = document.getElementById('filter-container')
    const filterTagList = document.getElementById('filter-tag-list')

    if (UI._filterTagList.size) {
      filterContainer.classList.remove('hide-filter')
      filterTagList.replaceChildren(
        ...[...UI._filterTagList.values()].map((tagName) => {
          const filterTag = document.createElement('fem-filter-tag')
          filterTag.setAttribute('tag-name', tagName)
          return filterTag
        })
      )
    } else {
      filterTagList.replaceChildren()
      filterContainer.classList.add('hide-filter')
    }
  }

  static displayOffers() {
    const jobOffersList = document.getElementById('job-offers-list')
    const cards = []
    UI._offersList.forEach((offer) => {
      if (
        [...UI._filterTagList.values()].every((tag) =>
          offer.tagList.includes(tag)
        )
      ) {
        const card = document.createElement('fem-job-offer-card')
        card.offer = offer
        cards.push(card)
      }
    })

    jobOffersList.replaceChildren(...cards)
  }

  static addFilterTag(tag) {
    if (tag && !UI._filterTagList.has(tag)) {
      UI._filterTagList.add(tag)
      UI.render()
    }
  }

  static removeFilterTag(tag) {
    if (tag) {
      UI._filterTagList.delete(tag)
      UI.render()
    }
  }

  static clearFilterTag() {
    UI._filterTagList.clear()
    UI.render()
  }
}

UI.offersList = await getJobList()

document.addEventListener('add-filter-tag', (e) => {
  UI.addFilterTag(e.detail.tagName)
})

document.addEventListener('remove-filter-tag', (e) => {
  UI.removeFilterTag(e.target._tagName)
})

document.getElementById('clear').addEventListener('click', UI.clearFilterTag)
