import { Router } from 'express'
// import bodyParser from 'body-parser'
import { Post } from '../models/Post'

const router = Router()

// // parse application/x-www-form-urlencoded
// router.use(bodyParser.urlencoded({ extended: false }))

// // parse application/json
// router.use(bodyParser.json())

router.get('/', async (req, res) => {
  res.json(await Post.find({}))
})

// router.delete('/:objectID', async (req, res) => {
//   const { objectID } = req.params
//   res.json(await Post.find({}))
// })

export default router
