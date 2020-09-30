import { ReactElement, useState } from 'react'
import style from './ShortDate.module.css'

type ShortDateProps = {
  readonly date: string
  readonly isHover: boolean
}

export default function ShortDate({ date, isHover }: ShortDateProps): ReactElement {
  const d = new Date(date)
  const month = new Intl.DateTimeFormat('en', { month: 'short' }).format(d)
  const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d)

  return (
    <span className={isHover ? style.dateHover : style.date}>
      {month}
      {' '}
      {day}
    </span>
  )
}
