export type UserForm = {
  email: string
  username: string
  password: string
}

export type PlantForm = {
  name: string
  image: string
  type: string
  seedPotPeriod: string[]
  seedSoilPeriod: string[]
  plantationPeriod: string[]
  maturePeriod: string[]
  comment: string
}

export type GardenForm = {
  name: string
  image: string
  nbCol: number
  nbRow: number
  plantPositions: PlantPosition[]
}

export type PlantPosition = {
  id?: number
  row: number
  column: number
  plantId: number
  plantName: string
  plantImage: string
  plantationDate: string
  removeDate?: string
}

export type OptionForm = {
  id: string
  label: string
  value: string
  disabled?: boolean
}

export type CheckboxForm = {
  id: string
  label: string
  value: string
  checked?: boolean
  disabled?: boolean
}
