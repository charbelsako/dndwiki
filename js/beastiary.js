window.addEventListener('load', async () => {
    const data = await loadData('../data/new-bestiary-mm.json');
    var start = 0; // where to start
    var end;
    for (var i = start; i < data.length; i++){
        if (data[i].name[0] != data[start].name[0]){
            break;
        }
        if (data[i].name[0] == data[start].name[0]){
            end = i;
        }
    }
    render_page(start, end);

    function move_page() {
        var end;
        var start;
        for (var i = 0; i < data.length; i++){
            if (data[i].name[0] == this.innerHTML){
                start = i;
                break;
            }
        }
        for (var i = start; i < data.length; i++){
            if (data[i].name[0] != data[start].name[0]){
                break;
            }
            if (data[i].name[0] == data[start].name[0]){
                end = i;
            }
        }
        render_page(start, end);
        generate_buttons();
    }

    function generate_buttons() {
        var alphabet = "ABCDEFGHIGKLMNOPQRSTUVWXYZ".split('');
        clear_page(pagination);
        // pagination
        for (var i = 0; i < 26; i++) {
            // pagination buttons
            button = document.createElement('button');
            button.innerHTML = alphabet[i];
            button.onclick = move_page;
            pagination.append(button);
        }
    }
    generate_buttons();

    function clear_page(element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }

    function render_page(start, end) {
        clear_page(mainContainer);
        for (let i = start; i <= end; i++) {
            // generate the cards
            const card = `
            <div class="card">
              <img class="image" width="300" height="300" src="../img/beastiary/MM_tokens/${data[i].name}.png"/>
              <p>${data[i].name}</p>
            </div>
          `;
            mainContainer.innerHTML += card;
        }
    }
})
