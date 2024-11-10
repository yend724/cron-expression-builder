import { describe, it, expect } from 'vitest'
import { parseValue } from '.'
import { UNIT } from '@/constants'
import { MINUTES, HOURS } from '@/constants'

describe('parseValue', () => {
  describe('minutes', () => {
    it('should parse single value', () => {
      expect(
        parseValue({ success: true, data: '0', type: 'single' }, UNIT.minute),
      ).toEqual([0])
    })

    it('should parse range value', () => {
      expect(
        parseValue({ success: true, data: '0-10', type: 'range' }, UNIT.minute),
      ).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    })

    it('should parse step value', () => {
      expect(
        parseValue({ success: true, data: '0/10', type: 'step' }, UNIT.minute),
      ).toEqual([0, 10, 20, 30, 40, 50])

      expect(
        parseValue({ success: true, data: '0/15', type: 'step' }, UNIT.minute),
      ).toEqual([0, 15, 30, 45])

      expect(
        parseValue({ success: true, data: '10/15', type: 'step' }, UNIT.minute),
      ).toEqual([10, 25, 40, 55])
    })

    it('should return all values', () => {
      expect(
        parseValue({ success: true, data: '*', type: 'asterisk' }, UNIT.minute),
      ).toEqual(MINUTES)
    })
  })

  describe('hours', () => {
    it('should parse single value', () => {
      expect(
        parseValue({ success: true, data: '0', type: 'single' }, UNIT.hour),
      ).toEqual([0])
    })

    it('should parse range value', () => {
      expect(
        parseValue({ success: true, data: '0-5', type: 'range' }, UNIT.hour),
      ).toEqual([0, 1, 2, 3, 4, 5])
    })

    it('should parse step value', () => {
      expect(
        parseValue({ success: true, data: '0/4', type: 'step' }, UNIT.hour),
      ).toEqual([0, 4, 8, 12, 16, 20])
    })

    it('should return all values', () => {
      expect(
        parseValue({ success: true, data: '*', type: 'asterisk' }, UNIT.hour),
      ).toEqual(HOURS)
    })
  })

  describe('error cases', () => {
    it('should return empty array when validation failed', () => {
      expect(parseValue({ success: false, data: '' }, UNIT.minute)).toEqual([])
    })
  })
})
