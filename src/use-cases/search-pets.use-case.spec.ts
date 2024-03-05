import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs.repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets.repository'
import { SearchPetsUseCase } from '@/use-cases/search-pets.use-case'
import { makeOrg } from '@tests/factories/make-org.factory'
import { makePet } from '@tests/factories/make-pet.factory'
import { beforeEach, expect, describe, it } from 'vitest'

describe('Search Pets Use Case', () => {
  let orgsRepository: InMemoryOrgsRepository
  let petsRepository: InMemoryPetsRepository
  let sut: SearchPetsUseCase

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    sut = new SearchPetsUseCase(petsRepository)
  })

  it('should be able to search pets by city', async () => {
    const org = await orgsRepository.create(makeOrg())

    await petsRepository.create(makePet({ orgId: org.id }))
    await petsRepository.create(makePet({ orgId: org.id }))

    const org2 = await orgsRepository.create(makeOrg())

    await petsRepository.create(makePet({ orgId: org2.id }))

    const { pets } = await sut.execute({ city: org.city })

    expect(pets).toHaveLength(2)

    const { pets: pets2 } = await sut.execute({ city: org2.city })

    expect(pets2).toHaveLength(1)
  })
  it('should be able to search pets by params', async () => {
    const org = await orgsRepository.create(makeOrg())

    await petsRepository.create(
      makePet({ orgId: org.id, age: '12', size: 'SMALL' }),
    )

    const { pets } = await sut.execute({
      city: org.city,
      age: '12',
      size: 'SMALL',
    })

    expect(pets).toHaveLength(1)
  })
})
