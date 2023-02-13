document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('#slider')
  slider.addEventListener('change', toggleVisibility)
})

function toggleVisibility(event) {
  const subscriptions = document.querySelectorAll('.subscription')
  subscriptions.forEach((subscription) => {
    subscription.classList.toggle('visible')
  })
}
