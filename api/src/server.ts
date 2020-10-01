import express from 'express'
import cors from 'cors'
import postRoute from './routes/postRoute'

export const app = express()
const port = process.env.PORT || '5000'

app.use(cors())
app.use('/posts', postRoute)

export default function serve(): void {
  app.listen(port, () => console.log(`Server is listening on ${port}`))
}
