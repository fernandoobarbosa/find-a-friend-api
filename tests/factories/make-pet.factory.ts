import { faker } from '@faker-js/faker'
import crypto from 'node:crypto'

type Overwrite = {
  orgId?: string
  age?: string
  size?: string
}

export function makePet(overwrite?: Overwrite) {
  return {
    id: crypto.randomUUID(),
    orgId: overwrite?.orgId ?? crypto.randomUUID(),
    name: faker.animal.dog(),
    about: faker.lorem.paragraph(),
    age: overwrite?.age ?? faker.number.int().toString(),
    size:
      overwrite?.size ??
      faker.helpers.arrayElement(['small', 'medium', 'large']),
  }
}
