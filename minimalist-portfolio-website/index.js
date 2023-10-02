const currentUrl = window.location.pathname.split('/').pop()
const headerLinks = document.querySelectorAll('.header__list a')

headerLinks.forEach((link) => {
  const linkRef = link.getAttribute('href').split('/').pop()
  link.style.color =
    linkRef === currentUrl ? 'var(--txt-color-accent-primary)' : ''
})
