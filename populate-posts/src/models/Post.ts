import { Document, Schema, model } from 'mongoose'

export type PostFields = {
  readonly _id?: string
  readonly createdAt: string
  readonly title: string | null
  readonly url: string | null
  readonly author: string
  readonly points: number | null
  readonly storyText: string | null
  readonly commentText: string | null
  readonly numComments: number | null
  readonly storyId: number | null
  readonly storyTitle: string | null
  readonly storyUrl: string | null
  readonly parentId: number | null
  readonly createdAtI: number
  readonly tags: readonly string[]
  readonly objectID: string
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
  objectID: { type: String, required: true, unique: true }
}, { versionKey: false })

export const Post = model<PostDocument>('Post', schema)
