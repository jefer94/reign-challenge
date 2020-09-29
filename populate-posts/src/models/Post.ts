import { Document, Schema, model } from 'mongoose'

export type PostFields = {
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

export type PostDocument = Document & PostFields

const schema = new Schema({
  createdAt: { type: Date, required: true },
  title: { type: String },
  url: { type: String },
  author: { type: String, required: true },
  points: { type: Number },
  storyText: { type: String },
  commentText: { type: String },
  numComments: { type: Number },
  storyId: { type: Number },
  storyTitle: { type: String },
  storyUrl: { type: String },
  parentId: { type: Number },
  createdAtI: { type: Number, required: true },
  tags: [{ type: String }],
  objectID: { type: Number, required: true, unique: true }
}, { versionKey: false })

export const Post = model<PostDocument>('Post', schema)
