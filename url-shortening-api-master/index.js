const inputElement = document.querySelector('#url')
const errorMessage = document.querySelector('.error-message')

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

function copyToClipboard(event) {
  navigator.clipboard.writeText(event.target.value)
}

// submit URL
document.querySelector('.form').addEventListener('submit', (e) => {
  e.preventDefault()
  const formData = new FormData(e.target)
  const url = formData.get('url')
  getShortUrl(url).then(prependCard)
  e.target.reset()
})

function prependCard({ result }) {
  const { short_link, original_link } = result
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

function getShortUrl(url) {
  const fetchURI = `https://api.shrtco.de/v2/shorten?url=${url}`

  return fetch(fetchURI, {
    method: 'POST',
  })
    .then((res) => res.json())
    .catch((error) => {
      alert(error)
    })
}
