
import { sum } from '@/functions'
import { expect,it } from 'vitest'

// create a test for the sum function
it("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3)
})