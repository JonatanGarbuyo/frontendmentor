const inputElement = document.querySelector('#url')
const errorMessage = document.querySelector('.error-message')
const ERRORS = {
  1: 'No URL specified ("url" parameter is empty)',
  2: 'Invalid URL submitted',
  3: 'Rate limit reached. Wait a second and try again',
  4: 'IP-Address has been blocked because of violating our terms of service',
  5: 'shrtcode code (slug) already taken/in use',
  6: 'Unknown error',
  7: 'No code specified ("code" parameter is empty)',
  8: 'Invalid code submitted (code not found/there is no such short-link)',
  9: 'Missing required parameters',
  10: 'Trying to shorten a disallowed Link. More information on disallowed links',
}

// check previous shorten links
document.addEventListener('DOMContentLoaded', () => {
  const links = JSON.parse(localStorage.getItem('myLinks'))
  links?.forEach((link) => prependCard(link))
})

inputElement.addEventListener('blur', (event) => {
  if (!event.target.value) {
    inputElement.classList.add('invalid')
    errorMessage.setAttribute('style', 'display: block;')
  }
})

inputElement.addEventListener('change', (event) => {
  if (event.target.validity.valid) {
    inputElement.classList.remove('invalid')
    errorMessage.setAttribute('style', 'display: none;')
  }
})

// submit URL
document.querySelector('.form').addEventListener('submit', async (e) => {
  e.preventDefault()
  const formData = new FormData(e.target)
  const url = formData.get('url')
  if (!url) {
    inputElement.classList.add('invalid')
    errorMessage.setAttribute('style', 'display: block;')
    return
  }
  const { result } = await getShortUrl(url)
  prependCard(result)
  saveToStorage(result)
  e.target.reset()
})

function prependCard(data) {
  if (!data) return
  const { short_link, original_link } = data
  const cardHTML = `
    <p class="url">${original_link}</p>
    <p class="short-url">${short_link}</p>
    <div>
      <button class="input button copy" value="${short_link}"
      onclick="copyToClipboard(event)">
        Copy
      </button>
    </div>`

  const card = document.createElement('div')
  card.classList.add('card-link')
  card.innerHTML = cardHTML
  document.querySelector('.link-list').prepend(card)
}

async function getShortUrl(url) {
  const fetchURI = `https://api.shrtco.de/v2/shorten?url=${url}`

  try {
    const response = await fetch(fetchURI, { method: 'POST' })
    if (!response.ok) {
      const errorResponse = await response.json()
      throw new Error('Something went wrong', { cause: errorResponse })
    }

    return await response.json()
  } catch (error) {
    if (error.cause?.error_code) alert(ERRORS[error.cause?.error_code])
    return {}
  }
}

function copyToClipboard(event) {
  const button = event.target
  navigator.clipboard.writeText(button.value)
  button.innerText = 'Copied!'
  button.classList.add('dark-background')

  setTimeout(() => {
    button.innerText = 'Copy'
    button.classList.remove('dark-background')
  }, 1000)
}

function saveToStorage(result) {
  var links = JSON.parse(localStorage.getItem('myLinks'))
  const myLinks = JSON.stringify([...(links ?? []), result])
  localStorage.setItem('myLinks', myLinks)
}
