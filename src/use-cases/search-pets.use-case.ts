import { PetsRepository } from '@/repositories/pets.repository'
import { Pet } from '@prisma/client'

interface SearchPetsUseCaseRequest {
  city: string
  age?: string
  size?: string
}

interface SearchPetsUseCaseResponse {
  pets: Pet[]
}

export class SearchPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
    age,
    size,
  }: SearchPetsUseCaseRequest): Promise<SearchPetsUseCaseResponse> {
    const pets = await this.petsRepository.findAll({
      city,
      age,
      size,
    })

    return { pets }
  }
}
