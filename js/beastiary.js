window.addEventListener('load', async () => {
    const data = await loadData('../data/new-bestiary-mm.json');
    let len = 20; // amount of images on one page
    let maxPages = Math.ceil(data.length / len);
    let start = 0; // where to start
    renderPage(start);

    function movePage() {
        start = (+this.innerHTML - 1) * len;
        renderPage(start);
        generateButtons();
    }

    function generateButtons() {
        clearPage(pagination);
        // pagination
        let numButtons = maxPages / len;
        let startIndex = start / len - 3;
        if (startIndex <= 0) {
            startIndex = 1;
        }
        endIndex = startIndex + 7 > maxPages ? maxPages : startIndex + 7;
        for (let i = startIndex; i <= endIndex; i++) {
            // pagination buttons
            button = document.createElement('button');
            button.innerHTML = i;
            button.onclick = movePage;
            pagination.append(button);
        }
    }
    generateButtons()

    function clearPage(element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }

    function renderPage(start) {
        clearPage(mainContainer);
        end = start + len > data.length ? data.length : start + len;
        for (let i = start; i < end; i++) {
            // generate the cards
            const card = `
            <div class="card">
              <img class="image" width="300" height="300" src="${
                data[i].image
                  ? `../img/beastiary/MM/${data[i].name}.jpg`
                      : `../img/beastiary/MM_tokens/${data[i].name}.png`
              }" alt="${data[i].name}" />
              <p>${data[i].name}</p>
            </div>
          `;
            mainContainer.innerHTML += card;
        }
    }
})
