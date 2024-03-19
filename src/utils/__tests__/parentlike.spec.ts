/**
 * @file Unit Tests - parentlike
 * @module unist-util-visit/utils/tests/unit/parentlike
 */

import type { Type } from '@flex-development/unist-util-types'
import testSubject from '../parentlike'

describe('unit:utils/parentlike', () => {
  let type: Type

  beforeAll(() => {
    type = 'root'
  })

  it('should return false if value is not nodelike', () => {
    expect(testSubject('root')).to.be.false
  })

  it('should return false if value.children is invalid', () => {
    expect(testSubject({ children: new Set(), type })).to.be.false
  })

  it('should return true if value is shaped like a parent', () => {
    expect(testSubject({ children: [], type })).to.be.true
  })
})
