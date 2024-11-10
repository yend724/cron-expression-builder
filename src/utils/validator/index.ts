import { UNIT } from '@/constants'
import { RANGE_OF_VALUES, OPERATOR } from './constant'

import { type ValidationResult } from '@/types'

const stringToNumber = (value: string): number => {
  return parseInt(value, 10)
}

const isSeparated = (value: string): boolean => {
  return value.includes(OPERATOR.separator)
}

const isAsterisk = (value: string): boolean => {
  return value === OPERATOR.asterisk
}

const isValidNumber = (value: string, min: number, max: number): boolean => {
  const regex = /^\d+$/
  if (!regex.test(value)) {
    return false
  }

  const valueAsNumber = stringToNumber(value)
  return valueAsNumber >= min && valueAsNumber <= max
}

const isValidRangeValues = (
  value: string,
  min: number,
  max: number,
): boolean => {
  const regex = new RegExp(`^\\d+${OPERATOR.range}\\d+$`)
  if (!regex.test(value)) {
    return false
  }

  const ranges = value.split(OPERATOR.range)
  const start = ranges[0]
  const end = ranges[1]

  const isValid = isValidNumber(start, min, max) && isValidNumber(end, min, max)
  if (!isValid) {
    return false
  }

  const [startAsNumber, endAsNumber] = ranges.map(stringToNumber)
  return startAsNumber < endAsNumber
}

const isValidStepValues = (
  value: string,
  min: number,
  max: number,
): boolean => {
  const regex = new RegExp(`^\\d+${OPERATOR.step}\\d+$`)
  if (!regex.test(value)) {
    return false
  }

  const steps = value.split(OPERATOR.step)
  const start = steps[0]
  const stepper = steps[1]

  if (!isValidNumber(start, min, max)) {
    return false
  }

  if (!isValidNumber(stepper, min, max)) {
    return false
  }

  return true
}

const validateSingleParts = (
  value: string,
  unit: (typeof UNIT)[keyof typeof UNIT],
): ValidationResult => {
  const target = value.trim()
  if (isAsterisk(target)) {
    return { success: true, data: value, type: 'asterisk' }
  }

  const unitMax = RANGE_OF_VALUES[unit].max
  const unitMin = RANGE_OF_VALUES[unit].min
  if (isValidNumber(target, unitMin, unitMax)) {
    return { success: true, data: value, type: 'single' }
  }
  if (isValidRangeValues(target, unitMin, unitMax)) {
    return { success: true, data: value, type: 'range' }
  }
  if (isValidStepValues(target, unitMin, unitMax)) {
    return { success: true, data: value, type: 'step' }
  }

  return { success: false, data: value }
}

const validateMultipleParts = (
  value: string,
  unit: (typeof UNIT)[keyof typeof UNIT],
): ValidationResult[] => {
  const targets = value.split(OPERATOR.separator)
  const results = targets.map(target => {
    return validateSingleParts(target, unit)
  })
  return results
}

export const validateExpression = (
  value: string,
  unit: (typeof UNIT)[keyof typeof UNIT],
): ValidationResult[] => {
  if (!isSeparated(value)) {
    return [validateSingleParts(value, unit)]
  }
  return validateMultipleParts(value, unit)
}
