import axios from 'axios'
import { Post, PostFields } from './models/Post'

const url = process.env.URL || 'https://hn.algolia.com/api/v1/search_by_date?query=nodejs'

type SearchResponse = {
  readonly hits: readonly PostFields[]
  readonly nbHits: number
  readonly page: number
  readonly nbPages: number
  readonly hitsPerPage: number
  readonly exhaustiveNbHits: boolean
  readonly query: string
  readonly params: string
  readonly processingTimeMS: number
}

export default async function fetchPosts() {
  const { data } = await axios.get<SearchResponse>(url)
  console.log('== Fetching data ==', data)

  data.hits.forEach(async (hit) => {
    if (await Post.exists({ objectID: hit.objectID })) {
      console.log(`updating ${hit.objectID}`)
      Post.updateOne({ objectID: hit.objectID}, { $set: hit })
    }
    else {
      console.log(`saving ${hit.objectID}`)
      const post = new Post(hit)
      post.save()
    }
  })
}
