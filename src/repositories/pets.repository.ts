import { Prisma, Pet } from '@prisma/client'

export interface FindAllParams {
  city: string
  age?: string
  size?: string
}

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findById(id: string): Promise<Pet | null>
  findAll(params: FindAllParams): Promise<Pet[]>
}
