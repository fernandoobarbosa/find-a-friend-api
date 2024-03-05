import { Pet, Prisma } from '@prisma/client'
import { FindAllParams, PetsRepository } from '../pets.repository'
import { prisma } from '@/lib/prisma'

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({ data })
    return pet
  }

  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    })

    return pet
  }

  async findAll(params: FindAllParams): Promise<Pet[]> {
    const pets = await prisma.pet.findMany({
      where: {
        age: params.age,
        size: params.size,
        org: {
          city: {
            contains: params.city,
            mode: 'insensitive',
          },
        },
      },
    })

    return pets
  }
}
