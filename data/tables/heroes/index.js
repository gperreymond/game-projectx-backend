const csv = require('csvtojson')
const path = require('path')

module.exports = async () => {
  const filepath = path.resolve(__dirname, 'data.csv')
  const data = await csv({
    trim: true,
    delimiter: ';'
  }).fromFile(filepath)
  return data
}
