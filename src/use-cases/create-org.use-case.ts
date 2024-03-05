import { Org } from '@prisma/client'

import { OrgsRepository } from '@/repositories/orgs.repository'
import { OrgAlreadyExistsError } from '@/use-cases/errors/org-already-exists.error'
import { hash } from 'bcryptjs'

interface CreateOrgUseCaseRequest {
  name: string
  email: string
  whatsapp: string
  password: string
  cep: string
  state: string
  city: string
  neighborhood: string
  street: string
  latitude: number
  longitude: number
}

interface CreateOrgUseCaseResponse {
  org: Org
}

export class CreateOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    name,
    email,
    whatsapp,
    password,
    cep,
    state,
    city,
    neighborhood,
    street,
    latitude,
    longitude,
  }: CreateOrgUseCaseRequest): Promise<CreateOrgUseCaseResponse> {
    const orgByEmail = await this.orgsRepository.findByEmail(email)

    if (orgByEmail) throw new OrgAlreadyExistsError()

    const passwordHash = await hash(password, 8)

    const org = await this.orgsRepository.create({
      name,
      email,
      whatsapp,
      password: passwordHash,
      cep,
      state,
      city,
      neighborhood,
      street,
      latitude,
      longitude,
    })

    return { org }
  }
}
