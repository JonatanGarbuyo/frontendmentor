export function cardTemplate({ offer }) {
  return /*html*/ ` 
    <div class="bg-white fw-bold card ${offer.featured ? 'featured' : ''}">
      <img class="card-image"
        src="${offer.logo}"
        alt="company logo"
      />
    <div class="text-neutral-500 card-content">
      <span class="fs-secondary-heading text-primary-400 name"
        >${offer.company}</span
      > 
      <span>
        ${
          offer.new
            ? `<span
          class="bg-primary-400 fs-text text-white fw-regular badge new"
          >New!</span
          >`
            : ''
        }  
        ${
          offer.featured
            ? `<span class="bg-neutral-700 fs-text text-white fw-regular badge"
          >Featured</span
          >`
            : ''
        }
      </span>
      <h2
        class="fs-primary-heading fw-bold text-neutral-700 card-title"
      >${offer.position}</h2>
      <ul class="fw-regular">
        <li>${offer.postedAt}</li>
        <li>${offer.contract}</li>
        <li>${offer.location}</li>
      </ul>
    </div>
    <ul class="text-primary-400 tag-list" aria-label="tag list">
      ${
        offer.tagList.length
          ? offer.tagList
              .map(
                (tag) => `
        <li
          class="bg-neutral-100 text-primary-400 tag"
          aria-label="laguage"
        >${tag}          
        </li>
      `
              )
              .join('')
          : null
      }
    </ul>
  </div>
    `
}
