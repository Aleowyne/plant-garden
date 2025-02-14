import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Garden from '#models/garden'
import Plant from '#models/plant'

export default class Plot extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare gardenId: number

  @column()
  declare row: number

  @column()
  declare column: number

  @column()
  declare plantId: number

  @column.dateTime()
  declare plantedAt: DateTime | null

  @column.dateTime()
  declare removedAt: DateTime | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Garden)
  declare garden: BelongsTo<typeof Garden>

  @belongsTo(() => Plant)
  declare plant: BelongsTo<typeof Plant>
}
