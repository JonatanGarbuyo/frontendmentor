const currentUrl = window.location.pathname.split('/').pop()
const headerLinks = document.querySelectorAll('.header__list a')

headerLinks.forEach((link) => {
  const linkRef = link.getAttribute('href').split('/').pop()
  link.style.color =
    linkRef === currentUrl ? 'var(--txt-color-accent-primary)' : ''
})

// Form validations
const requiredMessage = 'This field is required'
const invalidEmailMessage = 'Please use a valid email address'

document.querySelectorAll('[required]').forEach((input) => {
  input.addEventListener('blur', validateField)
  input.addEventListener('change', validateField)
  input.addEventListener('input', validateField)
})

const emailInput = document.querySelector('#email')
emailInput.addEventListener('input', validateEmail)
emailInput.addEventListener('blur', validateEmail)

function validateEmail(e) {
  !e.target.validity.valid ? showError(e, invalidEmailMessage) : hideError(e)
}

function validateField(e) {
  e.target.value.length < 1 ? showError(e, requiredMessage) : hideError(e)
}

function showError(e, message) {
  e.target.nextElementSibling.innerText = message
  e.target.nextElementSibling.classList.add('show-error')
  e.target.classList.add('input-error')
}

function hideError(e) {
  e.target.nextElementSibling.classList.remove('show-error')
  e.target.classList.remove('input-error')
}
