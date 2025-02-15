import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'plots'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('garden_id').unsigned().references('gardens.id').onDelete('CASCADE')
      table.integer('row').unsigned().notNullable()
      table.integer('column').unsigned().notNullable()
      table.integer('plant_id').unsigned().references('plants.id').onDelete('CASCADE')
      table.timestamp('planted_at').nullable()
      table.timestamp('removed_at').nullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
