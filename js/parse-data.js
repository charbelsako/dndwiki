async function loadData(path) {
  const result = await fetch(path)
  const data = await result.json()
  return data
}
