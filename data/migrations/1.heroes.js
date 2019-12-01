exports.up = knex =>
  knex.schema.createTable('heroes', tbl => {
    tbl.increments('id').primary()
    tbl.string('name', 128).unique().notNullable()
    tbl.string('title', 128).unique().notNullable()
  })

exports.down = knex => knex.schema.dropTableIfExists('heroes')
