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
export default async function db(connection = 'mongodb://localhost/reign'): Promise<void> {
  if (process.env.NODE_ENV !== 'cypress') await mongoose.connect(connection, { useNewUrlParser: true, useUnifiedTopology: true })
}
