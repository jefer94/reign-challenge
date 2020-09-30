import { ReactElement } from 'react'
import style from './ShortDate.module.css'

type ShortDateProps = {
  readonly date: string
  readonly isHover: boolean
}

export default function ShortDate({ date, isHover }: ShortDateProps): ReactElement {
  const current = new Date()
  const d = new Date(date)
  const month = new Intl.DateTimeFormat('en', { month: 'short' }).format(d)
  const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d)

  const currentDay = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(current)

  // current day, show hour
  if (currentDay === day) {
    const hourFormat = new Intl.DateTimeFormat('en', { hour: 'numeric' }).format(d)
    const minute = new Intl.DateTimeFormat('en', { minute: '2-digit' }).format(d)
    const hour = hourFormat.replace(/^(\d+) (AM|PM)/, '$1')
    const letters = hourFormat.replace(/^(\d+) (AM|PM)/, '$2')
    console.log(hour)
    console.log(minute)
    console.log(d)
    return (
      <span className={isHover ? style.dateHover : style.date}>
        {`${hour}:${minute} ${letters}`}
      </span>
    )
  }

  // yesterday
  if (Number(currentDay) === Number(day) + 1) {
    return (
      <span className={isHover ? style.dateHover : style.date}>
        Yesterday
      </span>
    )
  }

  // show day
  return (
    <span className={isHover ? style.dateHover : style.date}>
      {month}
      {' '}
      {day}
    </span>
  )
}
