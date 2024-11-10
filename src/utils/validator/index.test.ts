import { describe, it, expect } from 'vitest'
import { validateExpression } from './index'

describe('validator', () => {
  describe('asterisk', () => {
    it('should validate asterisk', () => {
      expect(validateExpression('*', 'minute')).toEqual([
        {
          success: true,
          data: '*',
          type: 'asterisk',
        },
      ])
    })
  })

  describe('single value', () => {
    it('should validate single value', () => {
      expect(validateExpression('0', 'minute')).toEqual([
        {
          success: true,
          data: '0',
          type: 'single',
        },
      ])
      expect(validateExpression('59', 'minute')).toEqual([
        {
          success: true,
          data: '59',
          type: 'single',
        },
      ])
    })

    it('should invalidate single value with invalid value', () => {
      expect(validateExpression('60', 'minute')).toEqual([
        {
          success: false,
          data: '60',
        },
      ])
      expect(validateExpression('', 'minute')).toEqual([
        {
          success: false,
          data: '',
        },
      ])
      expect(validateExpression(' ', 'minute')).toEqual([
        {
          success: false,
          data: ' ',
        },
      ])
    })
  })

  describe('range values', () => {
    it('should validate range', () => {
      expect(validateExpression('0-10', 'minute')).toEqual([
        {
          success: true,
          data: '0-10',
          type: 'range',
        },
      ])
      expect(validateExpression('0-59', 'minute')).toEqual([
        {
          success: true,
          data: '0-59',
          type: 'range',
        },
      ])
    })

    it('should invalidate range with invalid value', () => {
      expect(validateExpression('0-60', 'minute')).toEqual([
        {
          success: false,
          data: '0-60',
        },
      ])
      expect(validateExpression('2-1', 'minute')).toEqual([
        {
          success: false,
          data: '2-1',
        },
      ])
      expect(validateExpression('0-', 'minute')).toEqual([
        {
          success: false,
          data: '0-',
        },
      ])
      expect(validateExpression('-', 'minute')).toEqual([
        {
          success: false,
          data: '-',
        },
      ])
    })
  })

  describe('step values', () => {
    it('should validate step', () => {
      expect(validateExpression('20/15', 'minute')).toEqual([
        {
          success: true,
          data: '20/15',
          type: 'step',
        },
      ])
    })

    it('should invalidate step with invalid value', () => {
      expect(validateExpression('*/60', 'minute')).toEqual([
        {
          success: false,
          data: '*/60',
        },
      ])
      expect(validateExpression('*/0', 'minute')).toEqual([
        {
          success: false,
          data: '*/0',
        },
      ])
      expect(validateExpression('*/', 'minute')).toEqual([
        {
          success: false,
          data: '*/',
        },
      ])
      expect(validateExpression('*/*', 'minute')).toEqual([
        {
          success: false,
          data: '*/*',
        },
      ])
    })
  })
})
