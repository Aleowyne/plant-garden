import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Period from '#models/period'
import Plot from '#models/plot'

export default class Plant extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare image: string | null

  @column()
  declare type: string

  @column()
  declare comment: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Period)
  declare periods: HasMany<typeof Period>

  @hasMany(() => Plot)
  declare plots: HasMany<typeof Plot>
}
