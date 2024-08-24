import vine from '@vinejs/vine'
import PlantService from "#services/plant_service"

export const createPlantValidator = vine.compile(
  vine.object({
    name: vine.string().alphaNumeric({ allowSpaces: true }).minLength(3).maxLength(100),
    image: vine.string().url().nullable(),
    type: vine.enum(['flower', 'vegetable', 'aromatic']),
    seedPotPeriod: vine.array(
      vine.enum(
        PlantService.months
      )
    ),
    seedSoilPeriod: vine.array(
      vine.enum(
        PlantService.months
      )
    ),
    plantationPeriod: vine.array(
      vine.enum(
        PlantService.months
      )
    ),
    maturePeriod: vine.array(
      vine.enum(
        PlantService.months
      )
    ),
    comment: vine.string().maxLength(255).nullable(),
  })
)

export const filterPlantValidator = vine.compile(
  vine.object({
    name: vine.string().regex(/^[a-zA-Z0-9]*$/).optional(),
    type: vine.enum(['', 'flower', 'vegetable', 'aromatic']).optional(),
  })
)
