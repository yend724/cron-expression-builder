export const MINUTES = Array.from({ length: 60 }, (_, i) => i)
export const HOURS = Array.from({ length: 24 }, (_, i) => i)
export const DAYS = Array.from({ length: 31 }, (_, i) => i + 1)
export const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1)
export const WEEKS = Array.from({ length: 7 }, (_, i) => i)
export const WEEKS_LABEL = ['日', '月', '火', '水', '木', '金', '土']

export const UNIT = {
  minute: 'minute',
  hour: 'hour',
  day: 'day',
  month: 'month',
  week: 'week',
} as const

export const VALUES = {
  minute: MINUTES,
  hour: HOURS,
  day: DAYS,
  month: MONTHS,
  week: WEEKS,
} as const
