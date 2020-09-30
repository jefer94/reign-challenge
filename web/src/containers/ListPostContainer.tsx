import { ReactElement, useState } from 'react'
import useFetch from 'use-http'
import PostList from '../components/PostList'

export type Post = {
  readonly _id: string
  readonly createdAt: string
  readonly title?: string
  readonly url?: string
  readonly author: string
  readonly points?: number
  readonly storyText?: string
  readonly commentText?: string
  readonly numComments?: number
  readonly storyId?: number
  readonly storyTitle?: string
  readonly storyUrl?: string
  readonly parentId?: number
  readonly createdAtI: number
  readonly tags: readonly string[]
  readonly objectID: number
}

export default function ListPostContainer(): ReactElement {
  const { data = [] } = useFetch<readonly Post[]>('http://localhost:5000/posts', [])

  return (
    <PostList posts={data} />
  )
}
