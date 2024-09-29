import vine from '@vinejs/vine'

export const createGardenValidator = vine.compile(
  vine.object({
    name: vine.string().alphaNumeric({ allowSpaces: true }).minLength(3).maxLength(100),
    image: vine.string().url().nullable(),
  })
)
