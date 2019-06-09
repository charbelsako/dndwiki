window.addEventListener('load', async () => {
  const data = await loadData('../data/new-bestiary-mm.json')

  function generateButtons() {
    var alphabet = 'ABCDEFGHIGKLMNOPQRSTUVWXYZ'.split('')
    clearPage(pagination)
    // pagination
    for (var i = 0; i < 26; i++) {
      // pagination buttons
      button = document.createElement('button')
      button.innerHTML = alphabet[i]
      button.onclick = movePage
      pagination.append(button)
    }
  }

  function movePage() {
    filteredData = data.filter(row => row.name[0] == this.innerHTML)
    renderPage(filteredData)
  }

  function renderPage(displayData) {
    clearPage(mainContainer)
    for (let i = 0; i < displayData.length; i++) {
      // generate the cards

      const card = `
            <div class="card">
                <a class="card_anchor" href="#" data-name=${displayData[i].name}>
                    <img class="image" width="300" height="300" src="../img/beastiary/MM_tokens/${
                      displayData[i].name
                    }.png"/>
                </a>
                    <p>${displayData[i].name}</p>
            </div>
          `
      mainContainer.innerHTML += card
    }
  }

  function injectFunctionToAnchors() {
    let anchors = document.getElementsByClassName('card_anchor')
    anchors = Array.from(anchors)
    anchors.map(anchor => {
      anchor.onclick = showModal
    })
  }

  function showModal() {
    // monster contains all the information of that monster
    let monster = data.filter(row => row.name == this.dataset.name)[0]
    console.log(monster)
    // remake the modal here.
    //Size, type and  alignment mappings
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

    let type = monster.type
    if (typeof monster.type == 'object') {
      type = monster.type.type
    }
    let size = size_mappings[monster.size]
    let alignment = `${alignment_mappings[monster.alignment[0]]} ${
      alignment_mappings[monster.alignment[1]]
    }
    `
    let armorClass = typeof monster.ac[0] == 'object' ? monster.ac[0].ac[0] : monster.ac[0]
    let mask = `
    <div id="mask">
        <div id="modal">
            <table id="modal_content">
                <tr>
                    <td colspan="6">${monster['name']}</td>
                </tr>
                <tr>
                    <td colspan="6">${size} ${type}, ${alignment}</td>
                </tr>
                <tr>
                    <td colspan="6">
                        <div class="seperator"></div>
                    </td>
                </tr>
                <tr>
                    <td colspan="6">Armor Class: ${armorClass}</td>
                </tr>
                <tr>
                    <td colspan=6>
                        Hit Points: ${monster.hp.average} (${monster.hp.formula})
                    </td>
                </tr>
            </table>
        </div>
    </div>
    `
    document.onkeydown = function(evt) {
      let mask = document.querySelector('#mask')
      evt = evt || window.event
      if (evt.keyCode == 27) {
        mask.remove()
      }
    }
    console.log(mask)
    document.body.innerHTML += mask
  }

  generateButtons()
  renderPage(data.filter(row => row.name[0] == 'A'))
  injectFunctionToAnchors()

  /*


    let mask = `
    <div id="mask">
        <div id="modal">
            <table id="modal_content">
            </table>
        </div>
    </div>
    `
    document.body.insertAdjacentHTML("beforeend", mask);
    //Get some elements we'll need a lot
    mask = document.getElementById("mask");
    let modal_content = document.getElementById("modal_content");
    //Close modal when user clicks outside it


    //Monster name
    let element =`
    <tr>
        <td colspan=6>${data[i]["name"]}</td>
    </tr>
    `;
    modal_content.innerHTML += element;

    //  size
    let size = size_mappings[data[i]["size"]];
    //  type
    let type = "";
    if (typeof data[i]["type"] == "string"){
        type = data[i]["type"];
    }
    else if (typeof data[i]["type"] == "object"){
        type = data[i]["type"]["type"];
    }
    type = type.charAt(0).toUpperCase() + type.slice(1);
    //  alignment
    let alignment = "";
    for (let j = 0; j < data[i]["alignment"].length; j++){
        alignment += alignment_mappings[data[i]["alignment"][j]] + " ";
    }
    if (alignment == "Neutral Neutral"){
        alignment = "True Neutral";
    }
    // Adding it all up
    element =`

    `;
    modal_content.innerHTML += element;
    //Seperator
    element =`
    <tr>
        <td colspan=6>
            <div class="seperator"></div>
        </td>
    </tr>
    `;
    modal_content.innerHTML += element;
    //Armor class
    let armor_class = "";
    if (typeof data[i]["ac"][0] == "number"){
        armor_class = data[i]["ac"][0];
    }
    else if (typeof data[i]["ac"][0] == "object"){
        armor_class = data[i]["ac"][0]["ac"];
    }
    element = `
    <tr>
        <td colspan=6>Armor Class: ${armor_class}</td>
    </tr>
    `;
    modal_content.innerHTML += element;
    //Hit points
    element = `

    `;
    modal_content.innerHTML += element;
    //Speed
    let speed = "";
    let speed_array = get_block(i, "speed");
    for (let j = 0; j < speed_array.length; j++){
        speed += speed_array[j] + "ft. ";
    }
    speed = speed.split(":").join("");
    element =`
    <tr>
        <td colspan=6>Speed: ${speed}</td>
    </tr>
    `;
    modal_content.innerHTML += element;
    //Seperator
    element =`
    <tr>
        <td colspan=6>
            <div class="seperator"></div>
        </td>
    </tr>
    `;
    modal_content.innerHTML += element;
    //Ability labels
    element=`
    <tr>
        <td>STR</td>
        <td>DEX</td>
        <td>CON</td>
        <td>INT</td>
        <td>WIS</td>
        <td>CHA</td>
    </tr>
    `;
    modal_content.innerHTML += element;
    //Ability Scores
    element=`
    <tr>
        <td>${data[i]["str"]}</td>
        <td>${data[i]["dex"]}</td>
        <td>${data[i]["con"]}</td>
        <td>${data[i]["int"]}</td>
        <td>${data[i]["wis"]}</td>
        <td>${data[i]["cha"]}</td>
    </tr>
    `;
    modal_content.innerHTML += element;
    //Seperator
    element =`
    <tr>
        <td colspan=6>
            <div class="seperator"></div>
        </td>
    </tr>
    `;
    modal_content.innerHTML += element;
    //Skills
    if (data[i]["skill"] != undefined){
        let skills_array = get_block(i, "skill");
        let skills = "";
        for (let j = 0; j < skills_array.length; j++){
            skills += skills_array[j] + " ";
        }
        element =`
        <tr>
            <td colspan=6>Skills: ${skills}</td>
        </tr>
        `;
        modal_content.innerHTML += element;
    }
    //Senses
    if (data[i]["senses"] != undefined){
        let senses = data[i]["senses"];
        let senses_bits = senses.split(" ");
        for (let j = 0; j < senses_bits.length; j++){
            senses_bits[j] = senses_bits[j].charAt(0).toUpperCase() +
                senses_bits[j].slice(1);
        }
        senses = senses_bits.join(" ");
        element =`
        <tr>
            <td colspan=6>Senses: ${senses}</td>
        </tr>
        `;
        modal_content.innerHTML += element;
    }
    //Languages
    if (data[i]["languages"] != undefined){
        let languages = data[i]["languages"].charAt(0).toUpperCase() +
            data[i]["languages"].slice(1);
        element =`
        <tr>
            <td colspan=6>Languages: ${languages}</td>
        </tr>
        `;
        modal_content.innerHTML += element;
    }
    //Challenge
    let challenge_rating = "";
    if (typeof data[i]["cr"] == "string"){
        challenge_rating = data[i]["cr"];
    }
    else if (typeof data[i]["cr"] == "object"){
        challenge_rating = data[i]["cr"]["cr"];
    }
    element =`
    <tr>
        <td colspan=6>Challenge Rating: ${challenge_rating}</td>
    </tr>
    `;
    modal_content.innerHTML += element;
    //Seperator
    element =`
    <tr>
        <td colspan=6>
            <div class="seperator"></div>
        </td>
    </tr>
    `;
    modal_content.innerHTML += element;
    //Traits
    if (data[i]["trait"] != undefined){
        let traits = data[i]["trait"];
        for (let j = 0; j < traits.length; j++){
            let entries = ""
            for (let k = 0; k < traits[j]["entries"].length; k++){
                entries += traits[j]["entries"][k] + "\n";
            }
            element =`
            <tr>
                <td colspan=6>${traits[j]["name"]}: ${entries}</td>
            </tr>
        `;
            modal_content.innerHTML += element;
        }
    }
    //Seperator
    element =`
    <tr>
        <td colspan=6>
            <div class="seperator"></div>
        </td>
    </tr>
    `;
    modal_content.innerHTML += element;
    //Actions
    if (data[i]["action"] != undefined){
        let actions = data[i]["action"];
        for (let j = 0; j < actions.length; j++){
            let entries = ""
            for (let k = 0; k < actions[j]["entries"].length; k++){
                entries += actions[j]["entries"][k] + "\n";
            }
            element =`
            <tr>
                <td colspan=6>${actions[j]["name"]}: ${entries}</td>
            </tr>
        `;
            modal_content.innerHTML += element;
        }
    }

*/
})
