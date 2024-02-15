export type Message = {
  message?: {
    type: string
    content: string
  }
}

export type Auth = {
  isAuthenticated: boolean
}

export type FieldFormValue = string | number | Array<string>

export type UserForm = {
  email: string
  username: string
  password: string
  _csrf: string
}

export type PlantForm = {
  name: string
  image: string
  type: string
  depth: string
  distance: string
  height: string
  brightness: string
  seedPotPeriod: Array<string>
  seedSoilPeriod: Array<string>
  plantationPeriod: Array<string>
  maturePeriod: Array<string>
  comment: string
  _csrf: string
}

export type FieldForm = {
  label: string
  modelValue: FieldFormValue
  type?: string
  labelFor?: string
  placeholder?: string
  options?: Array<{ id?: string; value: string; label: string }>
  errors?: Array<string>
}
