document.addEventListener('DOMContentLoaded', async () => {
  // there are 2 files that we need
  const data = await loadData('../data/full-spells.json')
  console.log(data)
})
