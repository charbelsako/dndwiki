window.addEventListener('load', async () => {
  const data = await loadData('../data/new-bestiary-mm.json')
  var start = 0 // where to start
  var end
  for (var i = start; i < data.length; i++) {
    if (data[i].name[0] != data[start].name[0]) {
      break
    }
    if (data[i].name[0] == data[start].name[0]) {
      end = i
    }
  }
  render_page(start, end)

  function move_page() {
    var end
    var start
    for (var i = 0; i < data.length; i++) {
      if (data[i].name[0] == this.innerHTML) {
        start = i
        break
      }
    }
    for (var i = start; i < data.length; i++) {
      if (data[i].name[0] != data[start].name[0]) {
        break
      }
      if (data[i].name[0] == data[start].name[0]) {
        end = i
      }
    }
    render_page(start, end)
    generate_buttons()
  }

  function generate_buttons() {
    var alphabet = 'ABCDEFGHIGKLMNOPQRSTUVWXYZ'.split('')
    clear_page(pagination)
    // pagination
    for (var i = 0; i < 26; i++) {
      // pagination buttons
      button = document.createElement('button')
      button.innerHTML = alphabet[i]
      button.onclick = move_page
      pagination.append(button)
    }
  }
  generate_buttons()

  function render_page(start, end) {
    clear_page(mainContainer)
    for (let i = start; i <= end; i++) {
      // generate the cards
      const card = `
            <div class="card">
                <a class="card_anchor" href="#">
                    <img class="image" width="300" height="300" src="../img/beastiary/MM_tokens/${
                      data[i].name
                    }.png"/>
                </a>
                    <p>${data[i].name}</p>
            </div>
          `
      mainContainer.innerHTML += card
    }

    function get_block(index, json_key) {
      let object = data[index][json_key]
      let array = Object.keys(object).map(function(key) {
        let string = `${key}: ${data[index][json_key][key].toString()}`
        return string.charAt(0).toLocaleUpperCase() + string.slice(1)
      })
      return array
    }

    var anchors = document.getElementsByClassName('card_anchor')
    for (let i = start; i <= end; i++) {
      let anchor = anchors[i - start]
      anchor.onclick = function() {
        //Add the base element
        let mask = `
                <div id="mask">
                    <div id="modal">
                        <table id="modal_content">
                        </table>
                    </div>
                </div>
                `
        document.body.insertAdjacentHTML('beforeend', mask)
        //Get some elements we'll need a lot
        mask = document.getElementById('mask')
        let modal_content = document.getElementById('modal_content')
        //Close modal when user clicks outside it
        window.onclick = function(event) {
          if (event.target == mask) {
            mask.outerHTML = ''
          }
        }
        document.onkeydown = function(evt) {
          evt = evt || window.event
          if (evt.keyCode == 27 && mask != null) {
            mask.outerHTML = ''
          }
        }
        //Monster name
        let element = `
                <tr>
                    <td colspan=6>${data[i]['name']}</td>
                </tr>
                `
        modal_content.innerHTML += element
        //Size, type and  alignment
        let size_mappings = {
          T: 'Tiny',
          S: 'Small',
          M: 'Medium',
          L: 'Large',
          H: 'Huge'
        }
        let alignment_mappings = {
          N: 'Neutral',
          G: 'Good',
          E: 'Evil',
          C: 'Chaotic',
          L: 'Lawful',
          A: 'Any Alignment'
        }
        //  size
        let size = size_mappings[data[i]['size']]
        //  type
        let type = ''
        if (typeof data[i]['type'] == 'string') {
          type = data[i]['type']
        } else if (typeof data[i]['type'] == 'object') {
          type = data[i]['type']['type']
        }
        type = type.charAt(0).toUpperCase() + type.slice(1)
        //  alignment
        let alignment = ''
        for (let j = 0; j < data[i]['alignment'].length; j++) {
          alignment += alignment_mappings[data[i]['alignment'][j]] + ' '
        }
        if (alignment == 'Neutral Neutral') {
          alignment = 'True Neutral'
        }
        // Adding it all up
        element = `
                <tr>
                    <td colspan=6>${size} ${type}, ${alignment}</td>
                </tr>
                `
        modal_content.innerHTML += element
        //Seperator
        element = `
                <tr>
                    <td colspan=6>
                        <div class="seperator"></div>
                    </td>
                </tr>
                `
        modal_content.innerHTML += element
        //Armor class
        let armor_class = ''
        if (typeof data[i]['ac'][0] == 'number') {
          armor_class = data[i]['ac'][0]
        } else if (typeof data[i]['ac'][0] == 'object') {
          armor_class = data[i]['ac'][0]['ac']
        }
        element = `
                <tr>
                    <td colspan=6>Armor Class: ${armor_class}</td>
                </tr>
                `
        modal_content.innerHTML += element
        //Hit points
        element = `
                <tr>
                    <td colspan=6>Hit Points: ${data[i]['hp']['average']} (${
          data[i]['hp']['formula']
        })</td>
                </tr>
                `
        modal_content.innerHTML += element
        //Speed
        let speed = ''
        let speed_array = get_block(i, 'speed')
        for (let j = 0; j < speed_array.length; j++) {
          speed += speed_array[j] + 'ft. '
        }
        speed = speed.split(':').join('')
        element = `
                <tr>
                    <td colspan=6>Speed: ${speed}</td>
                </tr>
                `
        modal_content.innerHTML += element
        //Seperator
        element = `
                <tr>
                    <td colspan=6>
                        <div class="seperator"></div>
                    </td>
                </tr>
                `
        modal_content.innerHTML += element
        //Ability labels
        element = `
                <tr>
                    <td>STR</td>
                    <td>DEX</td>
                    <td>CON</td>
                    <td>INT</td>
                    <td>WIS</td>
                    <td>CHA</td>
                </tr>
                `
        modal_content.innerHTML += element
        //Ability Scores
        element = `
                <tr>
                    <td>${data[i]['str']}</td>
                    <td>${data[i]['dex']}</td>
                    <td>${data[i]['con']}</td>
                    <td>${data[i]['int']}</td>
                    <td>${data[i]['wis']}</td>
                    <td>${data[i]['cha']}</td>
                </tr>
                `
        modal_content.innerHTML += element
        //Seperator
        element = `
                <tr>
                    <td colspan=6>
                        <div class="seperator"></div>
                    </td>
                </tr>
                `
        modal_content.innerHTML += element
        //Skills
        if (data[i]['skill'] != undefined) {
          let skills_array = get_block(i, 'skill')
          let skills = ''
          for (let j = 0; j < skills_array.length; j++) {
            skills += skills_array[j] + ' '
          }
          element = `
                    <tr>
                        <td colspan=6>Skills: ${skills}</td>
                    </tr>
                    `
          modal_content.innerHTML += element
        }
        //Senses
        if (data[i]['senses'] != undefined) {
          let senses = data[i]['senses']
          let senses_bits = senses.split(' ')
          for (let j = 0; j < senses_bits.length; j++) {
            senses_bits[j] = senses_bits[j].charAt(0).toUpperCase() + senses_bits[j].slice(1)
          }
          senses = senses_bits.join(' ')
          element = `
                    <tr>
                        <td colspan=6>Senses: ${senses}</td>
                    </tr>
                    `
          modal_content.innerHTML += element
        }
        //Languages
        if (data[i]['languages'] != undefined) {
          let languages =
            data[i]['languages'].charAt(0).toUpperCase() + data[i]['languages'].slice(1)
          element = `
                    <tr>
                        <td colspan=6>Languages: ${languages}</td>
                    </tr>
                    `
          modal_content.innerHTML += element
        }
        //Challenge
        let challenge_rating = ''
        if (typeof data[i]['cr'] == 'string') {
          challenge_rating = data[i]['cr']
        } else if (typeof data[i]['cr'] == 'object') {
          challenge_rating = data[i]['cr']['cr']
        }
        element = `
                <tr>
                    <td colspan=6>Challenge Rating: ${challenge_rating}</td>
                </tr>
                `
        modal_content.innerHTML += element
        //Seperator
        element = `
                <tr>
                    <td colspan=6>
                        <div class="seperator"></div>
                    </td>
                </tr>
                `
        modal_content.innerHTML += element
        //Traits
        if (data[i]['trait'] != undefined) {
          let traits = data[i]['trait']
          for (let j = 0; j < traits.length; j++) {
            let entries = ''
            for (let k = 0; k < traits[j]['entries'].length; k++) {
              entries += traits[j]['entries'][k] + '\n'
            }
            element = `
                        <tr>
                            <td colspan=6>${traits[j]['name']}: ${entries}</td>
                        </tr>
                    `
            modal_content.innerHTML += element
          }
        }
        //Seperator
        element = `
                <tr>
                    <td colspan=6>
                        <div class="seperator"></div>
                    </td>
                </tr>
                `
        modal_content.innerHTML += element
        //Actions
        if (data[i]['action'] != undefined) {
          let actions = data[i]['action']
          for (let j = 0; j < actions.length; j++) {
            let entries = ''
            for (let k = 0; k < actions[j]['entries'].length; k++) {
              entries += actions[j]['entries'][k] + '\n'
            }
            element = `
                        <tr>
                            <td colspan=6>${actions[j]['name']}: ${entries}</td>
                        </tr>
                    `
            modal_content.innerHTML += element
          }
        }
        return false
      }
    }
  }
})
