document.addEventListener('DOMContentLoaded', async () => {
    const data = await loadData('../data/full-spells.json')

    function generateSpellTable(num) {
        clear_page(spellContainer)
        let start = num
        let end = num + 10
        if (end > data.length) {
            end = data.length
        }
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
             ${`  ${
               spell.range.distance
                 ? spell.range.distance.amount
                     ? spell.range.distance.amount
                     : ''
                     : ''
             } ${spell.range.distance.type ? spell.range.distance.type : ''}`}
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
        } else if (start < 5) {
            start = 1
            begin = start
        }
        let end = start + 5
        if (end > data.length / 10) {
            end = Math.ceil(data.length / 10)
        }
        for (let i = begin; i <= end; i++) {
            let btn = document.createElement('button')
            btn.innerHTML = `${i}`
            btn.onclick = function() {
                let newStart = (parseInt(this.innerHTML) - 1) * 10
                generateSpellTable(newStart)
            }
            pagination.append(btn)
        }
    }

    // custom sorting function to sort by any
    function sortByInnerHtml() {
        let sortingBy = this.innerHTML.toLowerCase()
        if (sortingBy === 'range') {
            console.warn('Cannot sort by range because of many aspects of the range object')
        }

        if (sortingBy === 'name' || sortingBy === 'school') {
            data.sort((a, b) => {
                let fname = a[sortingBy]
                let sname = b[sortingBy]
                if (fname < sname) {
                    return -1
                }
                if (fname > sname) {
                    return 1
                }
                return 0
            })
        }
        if (sortingBy === 'level') {
            data.sort((a, b) => a[sortingBy] - b[sortingBy])
        }

        if (sortingBy === 'time') {
            data.sort((a, b) => a[sortingBy][0].number - b[sortingBy][0].number)
        }

        generateSpellTable(0)
    }

    // sorting by name, type, school, range
    function addSortingToButtons() {
        let buttons = document.querySelectorAll('th > button')
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].onclick = sortByInnerHtml
        }
    }

    // search function
    function search() {}

    // start the chain of functions
    generateSpellTable(0)

    addSortingToButtons()
})
