import { ReactElement, useEffect, useState } from 'react'
import { url } from '@chocolab/functional'
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

const removePostsKey = '__REMOVE_POSTS_KEY__'

export default function ListPostContainer(): ReactElement {
  const resourceUrl = url(process.env.NEXT_PUBLIC_HN || 'http://localhost:5000/', 'posts')
  const { data = [], loading } = useFetch<readonly Post[]>(resourceUrl, [])
  const [posts, setPosts] = useState<readonly Post[]>([])

  function remove(id: number): void {
    const filtered = posts.filter(({ objectID }) => id !== objectID)
    if (!localStorage.getItem(removePostsKey)) localStorage.setItem(removePostsKey, '[]')

    try {
      const arr: readonly number[] = JSON.parse(localStorage.getItem(removePostsKey))
      const newArr = JSON.stringify([...arr, id])
      localStorage.setItem(removePostsKey, newArr)
    }
    catch { localStorage.setItem(removePostsKey, '[]') }

    setPosts(filtered)
  }

  useEffect(() => {
    if (!loading) {
      let arr: readonly number[]
      try {
        arr = JSON.parse(localStorage.getItem(removePostsKey))
        if (!(arr instanceof Array)) throw new Error('empty storage')
      }
      catch {
        arr = []
        localStorage.setItem(removePostsKey, '[]')
      }
      const newPosts = data
        .filter((post) => !arr.some((id) => id === post.objectID))
        .sort((a, b): number => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      setPosts(newPosts)
    }
  }, [loading])

  return (
    <PostList posts={posts} remove={remove} />
  )
}
