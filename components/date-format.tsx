import { parseISO, format } from 'date-fns'
import { FunctionComponent } from 'react'

export interface DateFormatProps {
  dateString: string
}

export const DateFormat: FunctionComponent<DateFormatProps> = ({ dateString }) => {
  const date = parseISO(dateString)
  return <time dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>
}
