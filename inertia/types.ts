import type { Errors, ErrorBag } from '@inertiajs/core'

export type InertiaProps = {
  errors: Errors & ErrorBag
  message: {
    type: string
    content: string
  }
  isAuth: boolean
}

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
