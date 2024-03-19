/**
 * @file Unit Tests - nodename
 * @module unist-util-visit/utils/tests/unit/nodename
 */

import type * as hast from 'hast'
import type * as xast from 'xast'
import testSubject from '../nodename'

describe('unit:utils/nodename', () => {
  it('should return null if node does not have display name', () => {
    expect(testSubject({ type: 'break' })).to.be.null
  })

  describe('node.name', () => {
    let node: xast.Instruction

    beforeAll(() => {
      node = {
        name: 'xml',
        type: 'instruction',
        value: 'version="1.0" encoding="UTF-8"'
      }
    })

    it('should return node.name if node.name is a string', () => {
      expect(testSubject(node)).to.equal(node.name)
    })

    it('should return null if node.name is not a string', () => {
      expect(testSubject({ ...node, name: { id: node.name } })).to.be.null
    })
  })

  describe('node.tagName', () => {
    let node: hast.Element

    beforeAll(() => {
      node = {
        children: [],
        properties: {},
        tagName: 'div',
        type: 'element'
      }
    })

    it('should return node.tagName if node.tagName is a string', () => {
      expect(testSubject(node)).to.equal(node.tagName)
    })

    it('should return null if node.tagName is not a string', () => {
      expect(testSubject({ ...node, tagName: { id: node.tagName } })).to.be.null
    })
  })
})
