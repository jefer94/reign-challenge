import fetchPosts from './fetchPosts'
import db from './db'

db(process.env.MONGO)
fetchPosts()

setInterval(fetchPosts, 1000 * 3600) // 1 hour
