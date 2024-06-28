import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Plant from '#models/plant'

export default class Period extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare plantId: number

  @column()
  declare type: string

  @column()
  declare january: boolean

  @column()
  declare february: boolean

  @column()
  declare march: boolean

  @column()
  declare april: boolean

  @column()
  declare may: boolean

  @column()
  declare june: boolean

  @column()
  declare july: boolean

  @column()
  declare august: boolean

  @column()
  declare september: boolean

  @column()
  declare october: boolean

  @column()
  declare november: boolean

  @column()
  declare december: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Plant)
  declare plant: BelongsTo<typeof Plant>
}
