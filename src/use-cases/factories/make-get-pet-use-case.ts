import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { GetPetUseCase } from '../get-pet.use-case'

export function makeGetPetUseCase() {
  return new GetPetUseCase(new PrismaPetsRepository())
}
