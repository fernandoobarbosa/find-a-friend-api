import { FastifyInstance } from 'fastify'

import { createPetController } from './create-pet.controller'
import { verifyJwt } from '@/http/middleware/verify-jwt'

export async function petsRoutes(app: FastifyInstance) {
  app.post('/orgs/pets', { onRequest: [verifyJwt] }, createPetController)
}
