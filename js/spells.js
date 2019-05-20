document.addEventListener('DOMContentLoaded', async () => {
    const data = await loadData('../data/full-spells.json')
    console.log(data[0])
    function generateSpellTable(num) {
        let i = 0
        for (const spell of data) {
            i++
            if (i == num) return
            spellContainer.innerHTML += `
            <td>
              ${spell.name}
            </td>
            <td>
              ${spell.level}
            </td>
            <td>
              ${` ${spell.time[0].unit} ${spell.time[0].number}`}
            </td>
            <td>
              ${spell.concentration}
            </td>
            <td>
              ${spell.school}
            </td>
            <td class="onlargeonly">
              ${`${spell.range.type} ${spell.range.amount ? spell.range.amount : ''} ${
                spell.range.distance ? spell.range.distance.type : ''
              }`}
            </td>
            <td class="onlargeonly">
              ${spell.source}
            </td>
              `
        }
    }
    generateSpellTable(10)
    // still needs pagination
    // sorting by name type blah blah blah.
    // search function
})
