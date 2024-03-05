import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs.repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateOrgUseCase } from './create-org.use-case'
import { makeOrg } from '@tests/factories/make-org.factory'
import { OrgAlreadyExistsError } from './errors/org-already-exists.error'
import { compare } from 'bcryptjs'

let orgsRepository: InMemoryOrgsRepository
let sut: CreateOrgUseCase

describe('Create Org Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new CreateOrgUseCase(orgsRepository)
  })

  it('should be able to create a new org', async () => {
    const { org } = await sut.execute(makeOrg())
    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to create a new org if email already exists', async () => {
    const org = makeOrg()
    await sut.execute(org)
    await expect(sut.execute(org)).rejects.toThrow(OrgAlreadyExistsError)
  })
  it('should hash password upon creation', async () => {
    const password = '123456'
    const { org } = await sut.execute(makeOrg({ password }))
    expect(await compare(password, org.password)).toBe(true)
  })
})
