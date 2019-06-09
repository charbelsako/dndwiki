function clearPage(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild)
  }
}
