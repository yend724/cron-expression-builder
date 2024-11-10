import { UNIT, VALUES } from '@/constants'
import { type ValidationResult } from '@/types'

export const parseValue = (
  value: ValidationResult,
  unit: (typeof UNIT)[keyof typeof UNIT],
): number[] => {
  if (value.success === false) return []

  if (value.type === 'single') {
    return [parseInt(value.data, 10)]
  }

  const values = VALUES[unit]
  if (value.type === 'range') {
    const ranges = value.data.split('-')
    const start = parseInt(ranges[0], 10)
    const end = parseInt(ranges[1], 10)
    return values.slice(start, end + 1)
  }
  if (value.type === 'step') {
    const steps = value.data.split('/')
    const [start, stepper] = steps.map(Number)
    return values.filter(
      value => value >= start && (value - start) % stepper === 0,
    )
  }

  return values
}
