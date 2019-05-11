const data = require('./../data/bestiary-mm.json').monster
const fs = require('fs')
// data has been loaded

// preprocess the data
function preprocess(data) {
  // for each monster check if it has an image
  let i = 0
  for (let i = 0; i < data.length; i++) {
    try {
      fs.readFileSync(`../img/bestiary/MM/${data[i].name}.jpg`)
      data[i].image = `../img/bestiary/MM/${data[i].name}.jpg`
    } catch (err) {
      console.log(err)
    }
  }
  newData = JSON.stringify(data)
  // fs.writeFileSync('../data/new-bestiary-mm.json', newData)
}

preprocess(data)
