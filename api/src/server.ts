import express from 'express'
import postRoute from './routes/postRoute'

const app = express()
const port = process.env.PORT || '5000'

app.use('/posts', postRoute)

export default function serve(): void {
  app.listen(port, () => {
    return console.log(`Server is listening on ${port}`)
  })
}
