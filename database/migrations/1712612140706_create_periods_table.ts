import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'periods'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('plant_id').unsigned().references('plants.id').onDelete('CASCADE')
      table.enu('type', ['mature', 'plantation', 'seedPot', 'seedSoil']).notNullable()
      table.boolean('january').defaultTo(false)
      table.boolean('february').defaultTo(false)
      table.boolean('march').defaultTo(false)
      table.boolean('april').defaultTo(false)
      table.boolean('may').defaultTo(false)
      table.boolean('june').defaultTo(false)
      table.boolean('july').defaultTo(false)
      table.boolean('august').defaultTo(false)
      table.boolean('september').defaultTo(false)
      table.boolean('october').defaultTo(false)
      table.boolean('november').defaultTo(false)
      table.boolean('december').defaultTo(false)

      table.timestamp('created_at')
      table.timestamp('updated_at')

      table.unique(['plant_id', 'type'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
