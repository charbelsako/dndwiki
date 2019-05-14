function clear_page(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild)
  }
}
