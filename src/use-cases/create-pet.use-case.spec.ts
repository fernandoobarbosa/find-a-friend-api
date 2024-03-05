import { makeOrg } from '@tests/factories/make-org.factory'
import { OrgsRepository } from './../repositories/orgs.repository'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs.repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { PetsRepository } from '@/repositories/pets.repository'
import { CreatePetUseCase } from './create-pet.use-case'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets.repository'
import { makePet } from '@tests/factories/make-pet.factory'
import { OrgNotFoundError } from './errors/org-not-found.error'

let petsRepository: PetsRepository
let orgsRepository: OrgsRepository
let sut: CreatePetUseCase

describe('Create Pet Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()
    sut = new CreatePetUseCase(orgsRepository, petsRepository)
  })

  it('should be able to create a new pet', async () => {
    const org = await orgsRepository.create(makeOrg())
    const { pet } = await sut.execute(makePet({ orgId: org.id }))
    expect(pet.id).toEqual(expect.any(String))
  })

  it('should not be able to create a new pet with a non-existing org', async () => {
    const pet = makePet()

    await petsRepository.create(pet)

    await expect(sut.execute(pet)).rejects.toThrow(OrgNotFoundError)
  })
})
