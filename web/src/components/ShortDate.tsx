import { ReactElement } from 'react'
import style from './ShortDate.module.css'

type ShortDateProps = {
  readonly date: string
  readonly isHover: boolean
}

function diffOfDays(date: string): number {
  const todayDate = new Date()
  const currentDate = new Date(date)
  const currentDay = currentDate.getDay()
  const todayDay = todayDate.getDay()

  if (currentDay === todayDay) return 0
  if (todayDay > 1 && todayDay - currentDay === 1) return 1
  if (todayDay === 1) {
    const currentMonth = currentDate.getMonth()
    const todayMonth = todayDate.getMonth()
    if (todayMonth - currentMonth > 2) return 2

    const currentYear = currentDate.getFullYear()

    const howManyDaysInCurrentMonth = new Date(currentYear, currentMonth, 0).getDate()
    if (howManyDaysInCurrentMonth === currentDay) return 1
    return 2
  }
  return 2
}

export default function ShortDate({ date, isHover }: ShortDateProps): ReactElement {
  const d = new Date(date)

  // current day, show hour
  if (diffOfDays(date) === 0) {
    const time = new Intl.DateTimeFormat('en', { hour: 'numeric', minute: '2-digit' })
      .format(d)
      .toLowerCase()

    return (
      <span className={isHover ? style.dateHover : style.date}>
        {time}
      </span>
    )
  }

  // yesterday
  if (diffOfDays(date) === 1) {
    return (
      <span className={isHover ? style.dateHover : style.date}>
        Yesterday
      </span>
    )
  }

  // show day
  return (
    <span className={isHover ? style.dateHover : style.date}>
      {new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric' }).format(d)}
    </span>
  )
}
