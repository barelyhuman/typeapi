export function createInputFocus(el: string | HTMLInputElement, code: string) {
  if (typeof el == 'string') {
    el = document.querySelector(el) as HTMLInputElement
    if (!el) {
      throw new Error(`element not found for selector ${el}`)
    }
  }
  const focusHandler = e => {
    if (e.code == code) {
      el.focus()
      e.preventDefault()
      return
    }
  }
  const escapeHandler = e => {
    if (e.code == 'Escape') {
      el.blur()
      e.preventDefault()
      return
    }
  }
  el.addEventListener('keydown', escapeHandler)
  document.addEventListener('keyup', focusHandler)

  return () => {
    el.removeEventListener('keydown', escapeHandler)
    document.removeEventListener('keyup', focusHandler)
  }
}
