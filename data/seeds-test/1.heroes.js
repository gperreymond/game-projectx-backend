const heroes = require('../tables/heroes')

exports.seed = async function (knex) {
  const data = await heroes()
  // Deletes ALL existing entries
  return knex('heroes').del()
    .then(function () {
      // Inserts seed entries
      return knex('heroes').insert(data)
    })
}
