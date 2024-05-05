import vine from '@vinejs/vine'

export const createPlantValidator = vine.compile(
  vine.object({
    name: vine.string().alphaNumeric().minLength(3).maxLength(100),
    image: vine.string().url().nullable(),
    type: vine.enum(['flower', 'vegetable', 'aromatic']),
    seedPotPeriod: vine.array(vine.enum(['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'])),
    seedSoilPeriod: vine.array(vine.enum(['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'])),
    plantationPeriod: vine.array(vine.enum(['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'])),
    maturePeriod: vine.array(vine.enum(['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'])),
    comment: vine.string().maxLength(255).nullable(),
  })
)
