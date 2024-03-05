import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeCreatePetUseCase } from '@/use-cases/factories/make-create-pet-use-case'
import { OrgNotFoundError } from '@/use-cases/errors/org-not-found.error'

const bodySchema = z.object({
  name: z.string(),
  about: z.string(),
  age: z.string(),
  size: z.string(),
})

export async function createPetController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const body = bodySchema.parse(request.body)
  const orgId = request.user.sub

  const createPetUseCase = makeCreatePetUseCase()

  try {
    const { pet } = await createPetUseCase.execute({ ...body, orgId })

    return reply.status(201).send(pet)
  } catch (error) {
    if (error instanceof OrgNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }
  }
}
