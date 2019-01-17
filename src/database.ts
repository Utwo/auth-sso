import mongoose from 'mongoose'
import Debug from 'debug'
const debug = Debug('*')
import { config } from './config'

export async function createMongooseConnection() {
  const protocol = config.database.mongodb.protocol
  const user = config.database.mongodb.user
  const password = config.database.mongodb.password
  const server = config.database.mongodb.server
  const port = config.database.mongodb.port
  const database = config.database.mongodb.database

  try {
    await mongoose.connect(
      `${protocol}://${user}:${password}@${server}:${port}/${database}`,
      {
        retryWrites: true,
        useNewUrlParser: true,
      }
    )
    debug(`Connected to Mongo database: ${database}`)
  } catch (error) {
    throw new Error(`Mongo connection error: ${error}`)
  }
}
