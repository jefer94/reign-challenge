/* eslint-disable functional/immutable-data */
/* eslint-disable functional/no-loop-statement */
/* eslint-disable no-restricted-syntax */
import { MongoMemoryServer } from 'mongodb-memory-server-core'
import mongoose from 'mongoose'
import request from 'supertest'
import { app } from '../src/server'
import db from '../src/db'
import { Post, PostFields } from '../src/models/Post'
// eslint-disable-next-line import/extensions
import posts from '../src/seeds/posts.json'

jest.setTimeout(600000)
jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000

let mongod: MongoMemoryServer
let connection: typeof mongoose | null

beforeAll(async () => {
  mongod = new MongoMemoryServer()
  connection = await db(await mongod.getUri())
})

afterAll(async () => {
  if (connection) connection.disconnect()
  await mongod.stop()
})

test('GET /posts empty', async () => {
  process.env.NODE_ENV = ''
  const { text } = await request(app).get('/posts')
  expect(JSON.parse(text)).toEqual([])
})

test('GET /posts with NODE_ENV=cypress', async () => {
  process.env.NODE_ENV = 'cypress'
  const { text } = await request(app).get('/posts')

  const res: readonly PostFields[] = JSON.parse(text)
  // eslint-disable-next-line guard-for-in
  for (const index in res) {
    const post = res[index]
    const { _id, ...data } = post

    expect(/^[^ ]+$/.test(_id)).toBeTruthy()
    expect(posts[index]).toEqual(data)
  }
})

test('GET /posts empty again', async () => {
  process.env.NODE_ENV = ''
  const { text } = await request(app).get('/posts')
  expect(JSON.parse(text)).toEqual([])
})

test('GET /posts', async () => {
  for (const post of posts) {
    const data = new Post(post)
    // eslint-disable-next-line no-await-in-loop
    await data.save()
  }
  const { text } = await request(app).get('/posts')

  const res: readonly PostFields[] = JSON.parse(text)
  // eslint-disable-next-line guard-for-in
  for (const index in res) {
    const post = res[index]
    const { _id, ...data } = post

    expect(/^[^ ]+$/.test(_id)).toBeTruthy()
    expect(posts[index]).toEqual(data)
  }
})
