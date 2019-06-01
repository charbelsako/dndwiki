document.addEventListener('DOMContentLoaded', async () => {
  const data = await loadData('../data/full-spells.json')
  console.log(data.length)
  function generateSpellTable(num) {
    clear_page(spellContainer)
    let start = num
    let end = num + 10
    for (let i = start; i < end; i++) {
      let spell = data[i]
      spellContainer.innerHTML += `
            <td>
              ${spell.name}
            </td>
            <td>
              ${spell.level}
            </td>
            <td>
              ${` ${spell.time[0].number} ${spell.time[0].unit}`}
            </td>
            <td>
              ${spell.school}
            </td>
            <td class="onlargeonly">
              ${` ${spell.range.distance.amount ? spell.range.distance.amount : ''} ${
                spell.range.distance.type ? spell.range.distance.type : ''
              }`}
            </td>
            <td class="onlargeonly">
              ${spell.source}
            </td>
              `
    }
    start = start / 10 + 1
    generatePagination(start)
  }

  // pagination
  function generatePagination(start) {
    clear_page(pagination)
    let begin = start
    if (start >= 5) {
      begin = start - 4
    }
    for (let i = begin; i <= start + 5; i++) {
      let btn = document.createElement('button')
      btn.innerHTML = `${i}`
      btn.onclick = function() {
        generateSpellTable((parseInt(this.innerHTML) - 1) * 10)
      }
      pagination.append(btn)
    }
  }
  // sorting by name, type, school, range
  function addSortingToButtons() {}

  // search function
  function search() {}

  // start the chain of functions
  generateSpellTable(0)
})
