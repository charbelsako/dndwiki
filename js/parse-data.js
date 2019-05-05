async function loadData(path) {
  const result = await fetch(path)
  const data = await result.json()
  console.log(data)
}

loadData('../data/fluff-bestiary-mm.json')
