const data = require('./../data/bestiary-mm.json').monster;
const fs = require('fs');

function preprocess(data) {
    // for each monster check if it has an image
    let i = 0;
    for (let i = 0; i < data.length; i++) {
        try {
            fs.readFileSync(`../img/bestiary/MM_tokens/${data[i].name}.png`);
            data[i].image = `../img/bestiary/MM_tokens/${data[i].name}.png`;
        } catch (err) {
            console.log(err);
        }
    }
    newData = JSON.stringify(data);
    // fs.writeFileSync('../data/new-bestiary-mm.json', newData)
}

preprocess(data);
