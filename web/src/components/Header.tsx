import { ReactElement } from 'react'
import { Typography } from '@material-ui/core'
import style from './Header.module.css'

type HeaderProps = {
  readonly title: string
  readonly subtitle: string
}

export default function ShortDate({ title, subtitle }: HeaderProps): ReactElement {
  return (
    <header className={style.header}>
      <div>
        <Typography variant="h2" className={style.bold}>{title}</Typography>
        <Typography variant="subtitle1" className={style.bold}>{subtitle}</Typography>
      </div>
    </header>
  )
}
