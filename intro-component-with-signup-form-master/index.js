addEventListener('DOMContentLoaded', () => {
  const inputList = document.querySelectorAll('input')

  inputList.forEach((element) => {
    element.addEventListener('blur', validate)
    element.addEventListener('input', validate)
  })
})

function validate(event) {
  const element = event.target

  if (isEmpty(element) && element.type !== 'email') {
    element.parentElement.children[0].classList.add('error')
    element.parentElement.children['err-icon'].classList.remove('hidden-error')
    element.parentElement.children['err-msg'].classList.remove('hidden-error')
  }
  if (!isEmpty(element) && element.type !== 'email') {
    element.parentElement.children[0].classList.remove('error')
    element.parentElement.children['err-icon'].classList.add('hidden-error')
    element.parentElement.children['err-msg'].classList.add('hidden-error')
  }

  if (!validEmail(element) && element.type == 'email') {
    element.parentElement.children[0].classList.add('error')
    element.parentElement.children['err-icon'].classList.remove('hidden-error')
    element.parentElement.children['err-msg'].classList.remove('hidden-error')
  }
  if (validEmail(element) && element.type == 'email') {
    element.parentElement.children[0].classList.remove('error')
    element.parentElement.children['err-icon'].classList.add('hidden-error')
    element.parentElement.children['err-msg'].classList.add('hidden-error')
  }
}

function isEmpty(element) {
  return element.value.trim().length < 1
}

function validEmail(element) {
  return element.validity.valid
}
