import axios from 'axios'
import { Post, PostFields } from './models/Post'

const url = process.env.URL || 'https://hn.algolia.com/api/v1/search_by_date?query=nodejs'

/* eslint-disable camelcase */
export type Hit = {
  readonly created_at: string
  readonly title?: string
  readonly url?: string
  readonly author: string
  readonly points?: number
  readonly story_text?: string
  readonly comment_text?: string
  readonly num_comments?: number
  readonly story_id?: number
  readonly story_title?: string
  readonly story_url?: string
  readonly parent_id?: number
  readonly created_at_i: number
  readonly _tags: readonly string[]
  readonly objectID: number
}

function parseHitToPost(hit: Hit): PostFields {
  const { created_at, story_text, comment_text, num_comments, story_id, story_title, story_url,
    parent_id, created_at_i, _tags, ...rest } = hit
  return {
    ...rest,
    createdAt: created_at,
    storyText: story_text,
    commentText: comment_text,
    numComments: num_comments,
    storyId: story_id,
    storyTitle: story_title,
    storyUrl: story_url,
    parentId: parent_id,
    createdAtI: created_at_i,
    tags: _tags
  }
}
/* eslint-enable camelcase */

type SearchResponse = {
  readonly hits: readonly Hit[]
  readonly nbHits: number
  readonly page: number
  readonly nbPages: number
  readonly hitsPerPage: number
  readonly exhaustiveNbHits: boolean
  readonly query: string
  readonly params: string
  readonly processingTimeMS: number
}

export default async function fetchPosts(): Promise<void> {
  const { data } = await axios.get<SearchResponse>(url)
  console.log('== Fetching data ==')

  data.hits.forEach(async (hit) => {
    const { objectID } = hit
    if (await Post.exists({ objectID })) {
      console.log(`updating ${objectID}`)
      try {
        // _highlightResult
        await Post.updateOne({ objectID }, { $set: parseHitToPost(hit) })
      }
      catch (e) {
        console.error('Error', e.message)
      }
    }
    else {
      console.log(`saving ${objectID}`)
      try {
        const post = new Post(parseHitToPost(hit))
        await post.save()
      }
      catch (e) {
        console.error('Error', e.message)
      }
    }
  })
}
