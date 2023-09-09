document.querySelectorAll('.card__button').forEach((btn) =>
  btn.addEventListener('click', (e) => {
    e.target.classList.toggle('btn-active')
  })
)
