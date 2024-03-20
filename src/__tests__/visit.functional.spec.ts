/**
 * @file Functional Tests - visit
 * @module unist-util-visit/tests/functional/visit
 */

import postorder from '#fixtures/postorder'
import preorder from '#fixtures/preorder'
import tree from '#fixtures/tree'
import { CONTINUE, EXIT, SKIP } from '#src/actions'
import type {
  VisitedAncestor,
  VisitedNode,
  VisitedParent,
  Visitor,
  VisitorResult
} from '#src/types'
import type { BlockTag, Comment, Root } from '@flex-development/docast'
import type { Optional } from '@flex-development/tutils'
import type { Index } from '@flex-development/unist-util-types'
import type { Text } from 'mdast'
import type { Node, Parent } from 'unist'
import testSubject from '../visit'

describe('functional:visit', () => {
  let stopIndex: Index

  beforeAll(() => {
    stopIndex = 13
  })

  it('should fail without visitor', () => {
    expect(() => { // @ts-expect-error ts(2554) runtime error check
      return void testSubject(tree)
    }).to.throw(/^cannot destructure property 'enter' of 'visitor'/i)
  })

  describe('postorder', () => {
    let comments: number

    beforeAll(() => {
      comments = postorder.types.filter(type => type === 'comment').length
    })

    it('should visit all nodes on leave', () => {
      // Arrange
      let n: number = 0

      // Act
      testSubject(tree, {
        leave(
          node: VisitedNode<Root>,
          index: Optional<Index>,
          parent: Optional<VisitedParent<Root>>,
          ancestors: VisitedAncestor<Root>[]
        ): VisitorResult {
          const { children } = <Optional<Parent>>parent ?? {}

          expect(node.type).to.equal(postorder.types[n])
          expect(parent?.type).to.equal(postorder.parents[n])
          expect(ancestors.map(a => a.type)).to.eql(postorder.ancestors[n])
          expect(index).to.eql(children?.indexOf(node))

          n++
        }
      })

      // Expect
      expect(n).to.equal(postorder.types.length)
    })

    it('should visit all nodes on leave (reverse)', () => {
      // Arrange
      let n: number = 0

      // Act
      testSubject(tree, {
        leave(node: VisitedNode<Root>): VisitorResult {
          expect(node.type).to.equal(postorder.typesReversed[n++])
        }
      }, true)

      // Expect
      expect(n).to.equal(postorder.typesReversed.length)
    })

    it('should visit nodes passing `test` on leave', () => {
      // Arrange
      let n: number = 0

      // Act
      testSubject(tree, 'comment', {
        leave(
          node: Comment,
          index: Optional<Index>,
          parent: Optional<VisitedParent<Root, Comment>>,
          ancestors: VisitedAncestor<Root, Comment>[]
        ): VisitorResult {
          n++
          expect(node).to.have.property('type', 'comment')
          expect(parent).to.have.property('type', 'root')
          expect(index).to.eql(parent!.children.indexOf(node))
          expect(ancestors).to.eql([])
        }
      })

      // Expect
      expect(n).to.equal(comments)
    })

    describe('EXIT', () => {
      it('should stop traversing on EXIT', () => {
        let n: number = -1

        // Act
        testSubject(tree, {
          leave(node: VisitedNode<Root>): VisitorResult {
            expect(node.type).to.equal(postorder.types[++n])
            return n === stopIndex ? EXIT : CONTINUE
          }
        })

        // Expect
        expect(n).to.equal(stopIndex)
      })

      it('should stop traversing on EXIT (tuple)', () => {
        let n: number = -1

        // Act
        testSubject(tree, {
          leave(node: VisitedNode<Root>): VisitorResult {
            expect(node.type).to.equal(postorder.types[++n])
            return [n === stopIndex ? EXIT : CONTINUE]
          }
        })

        // Expect
        expect(n).to.equal(stopIndex)
      })
    })

    describe('Index', () => {
      it('should continue traversing at a given index', () => {
        // Arrange
        let again: boolean = false
        let k: number = 0
        let n: number = 0

        // Act
        testSubject(tree, {
          leave(
            node: VisitedNode<Root>,
            index: Optional<Index>,
            parent: Optional<VisitedParent<Root>>
          ): VisitorResult {
            expect(node.type).to.equal(postorder.types[n++])
            k++

            if (
              !again &&
              parent?.type === 'root' &&
              node === parent.children.at(-1)
            ) {
              again = true
              return n = 0
            }
          }
        })

        // Expect
        expect(k).to.equal((postorder.types.length * 2) - 1)
      })
    })
  })

  describe('preorder', () => {
    let blockTags: number
    let skipIndex: Index

    beforeAll(() => {
      blockTags = preorder.types.filter(type => type === 'blockTag').length
      skipIndex = 7
    })

    it('should visit all nodes on enter', () => {
      // Arrange
      let n: number = 0

      // Act
      testSubject(tree, (
        node: VisitedNode<Root>,
        index: Optional<Index>,
        parent: Optional<VisitedParent<Root>>,
        ancestors: VisitedAncestor<Root>[]
      ): VisitorResult => {
        const { children } = <Optional<Parent>>parent ?? {}

        expect(node.type).to.equal(preorder.types[n])
        expect(parent?.type).to.equal(preorder.parents[n])
        expect(ancestors.map(a => a.type)).to.eql(preorder.ancestors[n])
        expect(index).to.eql(children?.indexOf(node))

        n++
      })

      // Expect
      expect(n).to.equal(preorder.types.length)
    })

    it('should visit all nodes on enter (reverse)', () => {
      // Arrange
      let n: number = 0

      // Act
      testSubject(tree, (node: VisitedNode<Root>): VisitorResult => {
        expect(node.type).to.equal(preorder.typesReversed[n++])
      }, true)

      // Expect
      expect(n).to.equal(preorder.typesReversed.length)
    })

    it('should visit nodes passing `test` on enter', () => {
      // Arrange
      let n: number = 0

      // Act
      testSubject(tree, ['blockTag'] as const, (
        node: BlockTag,
        index: Optional<Index>,
        parent: Optional<VisitedParent<Root, BlockTag>>,
        ancestors: VisitedAncestor<Root, BlockTag>[]
      ): VisitorResult => {
        n++
        expect(node).to.have.property('type', 'blockTag')
        expect(parent).to.have.property('type', 'comment')
        expect(index).to.eql(parent!.children.indexOf(node))
        expect(ancestors).to.eql([tree])
      })

      // Expect
      expect(n).to.equal(blockTags)
    })

    describe('EXIT', () => {
      it('should stop traversing on EXIT', () => {
        let n: number = -1

        // Act
        testSubject(tree, (node: VisitedNode<Root>): VisitorResult => {
          expect(node.type).to.equal(preorder.types[++n])
          return n === stopIndex ? EXIT : CONTINUE
        })

        // Expect
        expect(n).to.equal(stopIndex)
      })

      it('should stop traversing on EXIT (tuple)', () => {
        let n: number = -1

        // Act
        testSubject(tree, (node: VisitedNode<Root>): VisitorResult => {
          expect(node.type).to.equal(preorder.types[++n])
          return [n === stopIndex ? EXIT : CONTINUE]
        })

        // Expect
        expect(n).to.equal(stopIndex)
      })
    })

    describe('SKIP', () => {
      it('should not traverse children on SKIP', () => {
        // Arrange
        let k: number = 0
        let n: number = 0

        // Act
        testSubject(tree, (node: VisitedNode<Root>): VisitorResult => {
          expect(node.type).to.equal(preorder.types[n++])
          k++

          if (n === skipIndex) {
            n++
            return SKIP
          }
        })

        // Expect
        expect(k).to.equal(preorder.types.length - 1)
      })

      it('should not traverse children on SKIP (tuple)', () => {
        // Arrange
        let k: number = 0
        let n: number = 0

        // Act
        testSubject(tree, (node: VisitedNode<Root>): VisitorResult => {
          expect(node.type).to.equal(preorder.types[n++])
          k++

          if (n === skipIndex) {
            n++
            return [SKIP]
          }
        })

        // Expect
        expect(k).to.equal(preorder.types.length - 1)
      })
    })

    describe('Index', () => {
      it('should continue traversing at a given index', () => {
        // Arrange
        let k: number = 0
        let n: number = 0

        // Act
        testSubject(tree, (
          node: VisitedNode<Root>,
          index: Optional<Index>
        ): VisitorResult => {
          expect(node.type).to.equal(preorder.types[n++])
          k++

          if (n === 14) {
            n++
            return index! + 2
          }
        })

        // Expect
        expect(k).to.equal(preorder.types.length - 1)
      })
    })
  })

  describe('preorder and postorder', () => {
    let text: Visitor<Root, Text>
    let texts: number

    beforeAll(() => {
      text = (
        node: Text,
        index: Optional<Index>,
        parent: Optional<VisitedParent<Root, Text>>,
        ancestors: VisitedAncestor<Root, Text>[]
      ): VisitorResult => {
        expect(node).to.have.property('type', 'text')
        expect(parent).to.have.property('type').be.a('string')
        expect(index).to.eql(parent!.children.indexOf(node))
        expect(ancestors).to.be.an('array').that.is.not.empty
      }

      texts = preorder.types.filter(type => type === 'text').length
    })

    it('should visit all nodes on enter and leave', () => {
      // Arrange
      let k: number = 0
      let n: number = 0

      // Act
      testSubject(tree, {
        enter(node: VisitedNode<Root>): VisitorResult {
          expect(node.type).to.equal(preorder.types[n++])
        },
        leave(node: VisitedNode<Root>): VisitorResult {
          expect(node.type).to.equal(postorder.types[k++])
        }
      })

      // Expect
      expect(n).to.equal(preorder.types.length)
      expect(k).to.equal(postorder.types.length)
      expect(n).to.equal(k)
    })

    it('should visit all nodes on enter and leave (reverse)', () => {
      // Arrange
      let k: number = 0
      let n: number = 0

      // Act
      testSubject(tree, {
        enter(node: VisitedNode<Root>): VisitorResult {
          expect(node.type).to.equal(preorder.typesReversed[n++])
        },
        leave(node: VisitedNode<Root>): VisitorResult {
          expect(node.type).to.equal(postorder.typesReversed[k++])
        }
      }, true)

      // Expect
      expect(n).to.equal(preorder.typesReversed.length)
      expect(k).to.equal(postorder.typesReversed.length)
      expect(n).to.equal(k)
    })

    it('should visit nodes passing `test` on enter and leave', () => {
      // Arrange
      let k: number = 0
      let n: number = 0

      // Act
      testSubject(tree, (node: Node): node is Text => node.type === 'text', {
        enter(
          node: Text,
          index: Optional<Index>,
          parent: Optional<VisitedParent<Root, Text>>,
          ancestors: VisitedAncestor<Root, Text>[]
        ): VisitorResult {
          n++
          text(node, index, parent, ancestors)
        },
        leave(
          node: Text,
          index: Optional<Index>,
          parent: Optional<VisitedParent<Root, Text>>,
          ancestors: VisitedAncestor<Root, Text>[]
        ): VisitorResult {
          k++
          text(node, index, parent, ancestors)
        }
      })

      // Expect
      expect(n).to.equal(texts).and.equal(k)
    })
  })
})
