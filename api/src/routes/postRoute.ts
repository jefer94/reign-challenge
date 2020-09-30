import { Router } from 'express'
import { Post } from '../models/Post'
// eslint-disable-next-line import/extensions
import posts from '../seeds/posts.json'

const router = Router()

router.get('/', async (req, res) => {
  res.json(process.env.NODE_ENV !== 'cypress' ? await Post.find({}) : posts)
})

export default router
