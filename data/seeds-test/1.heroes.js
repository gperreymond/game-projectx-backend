const data = require('../tables/heroes')

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('heroes').del()
    .then(function () {
      // Inserts seed entries
      return knex('heroes').insert(data)
    })
}
