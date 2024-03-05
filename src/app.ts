import fastify from 'fastify'
import { env } from './env'
import { ZodError } from 'zod'
import { orgsRoutes } from './http/controllers/orgs/orgs.routes'
import fastifyJwt from '@fastify/jwt'

export const app = fastify({
  logger: env.NODE_ENV === 'dev',
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: '7d',
  },
})

app.register(orgsRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
