import { cn, formatDate, getRelativeTime, slugify, truncate } from '../utils'

describe('Utility Functions', () => {
  describe('cn', () => {
    it('merges class names correctly', () => {
      const result = cn('bg-red-500', 'text-white', 'p-4')
      expect(result).toBe('bg-red-500 text-white p-4')
    })

    it('handles conditional classes', () => {
      const result = cn('bg-red-500', false && 'hidden', 'text-white')
      expect(result).toBe('bg-red-500 text-white')
    })

    it('handles empty input', () => {
      const result = cn()
      expect(result).toBe('')
    })
  })

  describe('formatDate', () => {
    it('formats date string correctly', () => {
      const result = formatDate('2026-01-20')
      expect(result).toBe('January 20, 2026')
    })

    it('handles different date formats', () => {
      const result = formatDate('2026-12-31')
      expect(result).toBe('December 31, 2026')
    })

    it('handles edge cases', () => {
      const result = formatDate('2026-02-28') // Regular date
      expect(result).toBe('February 28, 2026')
    })
  })

  describe('getRelativeTime', () => {
    beforeEach(() => {
      jest.useFakeTimers()
      jest.setSystemTime(new Date('2026-01-20'))
    })

    afterEach(() => {
      jest.useRealTimers()
    })

    it('returns "today" for same day', () => {
      const result = getRelativeTime('2026-01-20')
      expect(result).toBe('today')
    })

    it('returns "yesterday" for 1 day ago', () => {
      const result = getRelativeTime('2026-01-19')
      expect(result).toBe('yesterday')
    })

    it('returns days ago for recent dates', () => {
      const result = getRelativeTime('2026-01-15')
      expect(result).toBe('5 days ago')
    })

    it('returns weeks ago for dates within last month', () => {
      const result = getRelativeTime('2026-01-01')
      expect(result).toBe('2 weeks ago')
    })

    it('returns months ago for dates within last year', () => {
      const result = getRelativeTime('2025-11-20')
      expect(result).toBe('2 months ago')
    })

    it('returns years ago for older dates', () => {
      const result = getRelativeTime('2024-01-20')
      expect(result).toBe('2 years ago')
    })

    it('handles future dates correctly', () => {
      const result = getRelativeTime('2026-01-25')
      expect(result).toBe('5 days ago')
    })
  })

  describe('slugify', () => {
    it('converts text to lowercase and replaces spaces with hyphens', () => {
      const result = slugify('Hello World')
      expect(result).toBe('hello-world')
    })

    it('removes special characters', () => {
      const result = slugify('Hello, World! How are you?')
      expect(result).toBe('hello-world-how-are-you')
    })

    it('handles multiple spaces and hyphens', () => {
      const result = slugify('Hello   World --- Test')
      expect(result).toBe('hello-world-test')
    })

    it('removes leading and trailing hyphens', () => {
      const result = slugify('--Hello World--')
      expect(result).toBe('hello-world')
    })

    it('handles underscores and mixed separators', () => {
      const result = slugify('hello_world-test example')
      expect(result).toBe('hello-world-test-example')
    })

    it('handles empty string', () => {
      const result = slugify('')
      expect(result).toBe('')
    })

    it('handles only special characters', () => {
      const result = slugify('!@#$%^&*()')
      expect(result).toBe('')
    })
  })

  describe('truncate', () => {
    it('truncates text to specified length', () => {
      const result = truncate('This is a long text that needs to be truncated', 20)
      expect(result).toBe('This is a long text...')
    })

    it('returns original text if shorter than limit', () => {
      const result = truncate('Short text', 20)
      expect(result).toBe('Short text')
    })

    it('handles exact length match', () => {
      const result = truncate('Exact', 5)
      expect(result).toBe('Exact')
    })

    it('truncates at word boundary', () => {
      const result = truncate('This is a test sentence with multiple words', 25)
      expect(result).toBe('This is a test sentence...')
    })

    it('handles single word longer than limit', () => {
      const result = truncate('supercalifragilisticexpialidocious', 10)
      expect(result).toBe('supercalif...')
    })

    it('handles empty string', () => {
      const result = truncate('', 10)
      expect(result).toBe('')
    })

    it('handles zero length limit', () => {
      const result = truncate('Some text', 0)
      expect(result).toBe('...')
    })
  })
})