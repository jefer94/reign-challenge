import { ReactElement, useState, Fragment } from 'react'
import { Divider, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import ShortDate from './ShortDate'
import style from './PostList.module.css'

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

type PostListProps = {
  readonly posts?: readonly Post[]
  readonly remove: (id: number) => void
}

export default function Home({ posts = [], remove }: PostListProps): ReactElement {
  const [selected, setSelected] = useState(-1)
  return (
    <div className={style.container}>
      <List className={style.list}>
        {posts.map(({ storyTitle, title, author, createdAt, objectID }, index, arr) => (
          <Fragment key={objectID}>
            <ListItem
              className={index === selected ? style.listItemHover : ''}
              onMouseEnter={() => setSelected(index)}
              onMouseLeave={() => setSelected(-1)}
            >
              <ListItemText
                primary={storyTitle || title}
                secondary={`- ${author} -`}
              />
              <ListItemSecondaryAction onMouseEnter={() => setSelected(index)}>
                <ShortDate date={createdAt} isHover={index === selected} />
                {index === selected ? (
                  <IconButton edge="end" aria-label="delete" onClick={() => remove(objectID)}>
                    <DeleteIcon />
                  </IconButton>
                ) : <></>}
              </ListItemSecondaryAction>
            </ListItem>
            {index < arr.length - 1 ? <Divider className={style.separator} /> : <></>}
          </Fragment>
        ))}
      </List>
    </div>
  )
}
