/* eslint-disable guard-for-in */
/* eslint-disable functional/no-loop-statement */
/* eslint-disable no-restricted-syntax */
import mongoose from 'mongoose'

/** Database connection. */
export default function db(connection = 'mongodb://localhost/reign'): Promise<typeof mongoose | null> {
  if (process.env.NODE_ENV !== 'cypress') return mongoose.connect(connection, { useNewUrlParser: true, useUnifiedTopology: true })
  return Promise.resolve(null)
}
