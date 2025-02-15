import vine from '@vinejs/vine'

export const createGardenValidator = vine.compile(
  vine.object({
    name: vine.string().alphaNumeric({ allowSpaces: true }).minLength(3).maxLength(100),
    image: vine.string().url().nullable(),
    nbCol: vine.number().min(0).max(20),
    nbRow: vine.number().min(0).max(20),
    plantPositions: vine.array(
      vine.object({
        row: vine.number().min(0).max(20),
        column: vine.number().min(0).max(20),
        plantId: vine.number(),
        name: vine.string().alphaNumeric({ allowSpaces: true }).minLength(3).maxLength(100).nullable(),
        image: vine.string().url().nullable(),
        plantationDate: vine.string().nullable(),
        removeDate: vine.string().optional(),
      })
    ),
  })
)
