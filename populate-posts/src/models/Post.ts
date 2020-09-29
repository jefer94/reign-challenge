import { Document, Schema, model } from 'mongoose'

export type PostFields = {
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

export type PostDocument = Document & PostFields

const schema = new Schema({
  created_at: { type: Date, required: true },
  title: { type: String },
  url: { type: String },
  author: { type: String, required: true },
  points: { type: Number },
  story_text: { type: String },
  comment_text: { type: String },
  num_comments: { type: Number },
  story_id: { type: Number },
  story_title: { type: String },
  story_url: { type: String },
  parent_id: { type: Number },
  created_at_i: { type: Number, required: true },
  _tags: [{ type: String }],
  objectID: { type: Number, required: true, unique: true }
}, { versionKey: false })

export const Post = model<PostDocument>('Post', schema)
