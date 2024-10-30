export type UserForm = {
  email: string
  username: string
  password: string
}

export type PlantForm = {
  name: string
  image: string
  type: string
  seedPotPeriod: Array<string>
  seedSoilPeriod: Array<string>
  plantationPeriod: Array<string>
  maturePeriod: Array<string>
  comment: string
}

export type GardenForm = {
  name: string
  image: string
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
