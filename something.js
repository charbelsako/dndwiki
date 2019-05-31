const data = require('./data/new-bestiary-mm.json')
const newA = data.filter(rows => rows.name[0] == 'B')
console.log(newA.length)
