import axios from 'axios'
import { Post, PostFields } from './models/Post'

const url = process.env.URL || 'https://hn.algolia.com/api/v1/search_by_date?query=nodejs'

type Hits = PostFields & {
  readonly objectID: number
}

type SearchResponse = {
  readonly hits: readonly Hits[]
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
  console.log('== Fetching data ==')

  data.hits.forEach(async (hit) => {
    const { objectID } = hit
    if (await Post.exists({ objectID })) {
      console.log(`updating ${objectID}`)
      try {
        // _highlightResult
        await Post.updateOne({ objectID }, { $set: hit })
      }
      catch (e) {
        console.error('Error', e.message)
      }
    }
    else {
      console.log(`saving ${objectID}`)
      try {
        // const post = new Post({ _id: objectID, ...hit })
        const post = new Post(hit)
        await post.save()
      }
      catch (e) {
        console.error('Error', e.message)
      }
    }
  })
}
