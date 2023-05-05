import './components/toggle-switch.js'
import './components/custom-select.js'

const headerContainer = document.getElementById('header-container')
const toggleSwitch = document.createElement('fm-toggle-switch')
toggleSwitch.isChecked =
  window.matchMedia && window.matchMedia('(prefers-color-scheme:dark)').matches
headerContainer.appendChild(toggleSwitch)

function toggleTheme(e) {
  const { isChecked } = e.detail
  const currentTheme = document.documentElement.getAttribute('theme')

  if (isChecked || currentTheme === 'light') {
    document.documentElement.setAttribute('theme', 'dark')
  } else {
    document.documentElement.setAttribute('theme', 'light')
  }
}

document.addEventListener('toggle-dark-mode', toggleTheme)
document
  .querySelector('fm-custom-select')
  .addEventListener('change', (e) =>
    console.log('app-- SelectedEvent:', e.target.value)
  )
