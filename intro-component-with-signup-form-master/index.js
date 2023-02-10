addEventListener('DOMContentLoaded', () => {
  const inputList = document.querySelectorAll('input')

  inputList.forEach((element) => {
    element.addEventListener('blur', validate)
    element.addEventListener('input', validate)
  })
})

function validate(event) {
  const element = event.target
  const input = element.parentElement.children[0]
  const icon = element.parentElement.children[1]
  const message = element.parentElement.children[2]

  if (isEmpty(element) && element.type !== 'email') {
    input.classList.add('error')
    icon.classList.remove('hidden-error')
    message.classList.remove('hidden-error')
  }
  if (!isEmpty(element) && element.type !== 'email') {
    input.classList.remove('error')
    icon.classList.add('hidden-error')
    message.classList.add('hidden-error')
  }

  if (!validEmail(element) && element.type == 'email') {
    message.classList.remove('hidden-error')
    input.classList.add('error')
    icon.classList.remove('hidden-error')
  }
  if (validEmail(element) && element.type == 'email') {
    input.classList.remove('error')
    icon.classList.add('hidden-error')
    message.classList.add('hidden-error')
  }
}

function isEmpty(element) {
  return element.value.trim().length < 1
}

function validEmail(element) {
  return element.validity.valid
}
