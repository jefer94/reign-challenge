import express from 'express'
// import { rootHandler, helloHandler } from './handlers'

const app = express()
const port = process.env.PORT || '5000'

// app.get('/', rootHandler)
// app.get('/hello/:name', helloHandler)

export default function serve(): void {
  app.listen(port, () => {
    return console.log(`Server is listening on ${port}`)
  })
}
