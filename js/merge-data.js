const fs = require('fs')

const spellPHB = require('./../data/spells-phb.json').spell
const spellXGE = require('./../data/spells-xge.json').spell

fullData = spellPHB.concat(spellXGE)
console.log(fullData)
fs.writeFileSync('../data/full-spells.json', JSON.stringify(fullData))
