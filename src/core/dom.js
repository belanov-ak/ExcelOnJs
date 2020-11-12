class Dom {
}

//method similar to jquery $. Allowing to simplify the code
export function $() {
  return new Dom()
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName)
  if (classes) {
    el.classList.add(classes)
  }
  return el
}
