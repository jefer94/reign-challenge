import { MongoMemoryServer } from 'mongodb-memory-server-core'
import mongoose from 'mongoose'
import axios from 'axios'
import fetchPosts, { Hit, parseHitToPost } from '../src/fetchPosts'
import db from '../src/db'
import { Post } from '../src/models/Post'
// eslint-disable-next-line import/extensions
import hn from '../src/seeds/hn.json'

// eslint-disable-next-line functional/immutable-data
global.console.log = jest.fn()

jest.setTimeout(600000)
jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

let mongod: MongoMemoryServer
let connection: typeof mongoose

beforeAll(async () => {
  mongod = new MongoMemoryServer()
  connection = await db(await mongod.getUri())
})

afterAll(async () => {
  connection.disconnect()
  await mongod.stop()
})

test('db is empty', async () => {
  expect(await Post.find({}).lean()).toEqual([])
  // fetchPosts
})

test('db with seeds create', async () => {
  mockedAxios.get.mockResolvedValue({ data: hn })
  await fetchPosts()
  const posts = await Post.find({}).lean()

  hn.hits.forEach((hit, index) => {
    const { _id, ...post } = posts[index]
    const { _highlightResult, ...current } = hit

    expect({ ...parseHitToPost(current), createdAt: new Date(current.created_at) }).toEqual(post)
    //
  })
})

test('db with seeds update', async () => {
  mockedAxios.get.mockResolvedValue({ data: hn })
  await fetchPosts()
  const posts = await Post.find({}).lean()

  hn.hits.forEach((hit, index) => {
    const { _id, ...post } = posts[index]
    const { _highlightResult, ...current } = hit

    expect({ ...parseHitToPost(current), createdAt: new Date(current.created_at) }).toEqual(post)
    //
  })
})
