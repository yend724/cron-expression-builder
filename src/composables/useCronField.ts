import { ref, computed } from 'vue'
import { validateExpression } from '@/utils/validator'
import { parseValue } from '@/utils/parser'

type CronFieldType = 'minute' | 'hour' | 'day' | 'month' | 'week'

export const useCronField = (type: CronFieldType) => {
  const value = ref('*')

  const validationResults = computed(() =>
    validateExpression(value.value, type),
  )

  const parsedValues = computed(() => {
    const results = validationResults.value
    if (results.some(item => !item.success)) {
      return []
    }
    return results.flatMap(v => parseValue(v, type))
  })

  const isValid = computed(() =>
    validationResults.value.every(item => item.success),
  )

  return {
    value: value,
    validationResults: validationResults,
    parsedValues: parsedValues,
    isValid: isValid,
  }
}
