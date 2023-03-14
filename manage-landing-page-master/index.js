document.querySelectorAll('.carousel-control-input').forEach((control) => {
  control.addEventListener('click', (e) => {
    const cardId = e.target.dataset.cardId
    document.querySelector(`#${cardId}`).scrollIntoView({
      inline: 'nearest',
      behavior: 'smooth',
      block: 'nearest',
    })
  })
})

const observer = new IntersectionObserver(checkCarouselControl, {
  root: document.querySelector('.carousel'),
  rootMargin: '0px',
  threshold: 1.0,
  trackVisibility: true,
  delay: 100,
})

document.querySelectorAll('.carousel-card').forEach((card) => {
  observer.observe(card)
})

function checkCarouselControl(entries /*observer*/) {
  entries.forEach((entry) => {
    const id = entry.target.id
    const control = document.querySelector(`input[data-card-id=${id}]`)
    if (entry.isIntersecting) {
      control.checked = true
    }
  })
}
