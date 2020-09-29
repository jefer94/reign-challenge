import serve from './server'
import db from './db'

db(process.env.MONGO)
serve()
