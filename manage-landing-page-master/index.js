/* Slider */
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
  delay: 200,
})

document.querySelectorAll('.carousel-card').forEach((card) => {
  observer.observe(card)
})

function checkCarouselControl(entries) {
  entries.forEach((entry) => {
    const id = entry.target.id
    const control = document.querySelector(`input[data-card-id=${id}]`)
    if (entry.isIntersecting) {
      control.checked = true
    }
  })
}

/* Form */
const inputEmail = document.querySelector('input[type=email]')
const errorMessage = document.querySelector('.error-message')

document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault()
  alert('Email submited, thank you')
  e.target.reset()
})

inputEmail.addEventListener('blur', (e) => {
  if (e.target.validity.valid) {
    errorMessage.classList.remove('error-visible')
  } else {
    errorMessage.classList.add('error-visible')
  }
})
