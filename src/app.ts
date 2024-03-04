import fastify from 'fastify'
import { env } from './env'

export const app = fastify({
  logger: env.NODE_ENV === 'dev',
})
