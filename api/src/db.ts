/* eslint-disable guard-for-in */
/* eslint-disable functional/no-loop-statement */
/* eslint-disable no-restricted-syntax */
import mongoose from 'mongoose'

export function clearCollections(): void {
  for (const collection in mongoose.connection.collections) {
    mongoose.connection.collections[collection].remove({})
  }
}

/** Database connection. */
export default function db(connection = 'mongodb://localhost/choco'): Promise<typeof mongoose> {
  return mongoose.connect(connection, { useNewUrlParser: true, useUnifiedTopology: true })
}
