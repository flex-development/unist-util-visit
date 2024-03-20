# unist-util-visit

[![github release](https://img.shields.io/github/v/release/flex-development/unist-util-visit.svg?include_prereleases&sort=semver)](https://github.com/flex-development/unist-util-visit/releases/latest)
[![npm](https://img.shields.io/npm/v/@flex-development/unist-util-visit.svg)](https://npmjs.com/package/@flex-development/unist-util-visit)
[![codecov](https://codecov.io/gh/flex-development/unist-util-visit/graph/badge.svg?token=xHQmS2Z03w)](https://codecov.io/gh/flex-development/unist-util-visit)
[![module type: esm](https://img.shields.io/badge/module%20type-esm-brightgreen)](https://github.com/voxpelli/badges-cjs-esm)
[![license](https://img.shields.io/github/license/flex-development/unist-util-visit.svg)](LICENSE.md)
[![conventional commits](https://img.shields.io/badge/-conventional%20commits-fe5196?logo=conventional-commits&logoColor=ffffff)](https://conventionalcommits.org/)
[![typescript](https://img.shields.io/badge/-typescript-3178c6?logo=typescript&logoColor=ffffff)](https://typescriptlang.org/)
[![vitest](https://img.shields.io/badge/-vitest-6e9f18?style=flat&logo=vitest&logoColor=ffffff)](https://vitest.dev/)
[![yarn](https://img.shields.io/badge/-yarn-2c8ebb?style=flat&logo=yarn&logoColor=ffffff)](https://yarnpkg.com/)

[unist][unist] utility to walk the tree

## Contents

- [What is this?](#what-is-this)
- [When should I use this?](#when-should-i-use-this)
- [Install](#install)
- [Use](#use)
- [API](#api)
  - [`visit(tree[, test], visitor|visitors[, reverse])`](#visittree-test-visitorvisitors-reverse)
  - [`CONTINUE`](#continue)
  - [`EXIT`](#exit)
  - [`SKIP`](#skip)
  - [`Action`](#action)
  - [`ActionTuple`](#actiontuple)
  - [`Index`](#index)
  - [`Test`](#test)
  - [`TestFunction<[T][, P]>`](#testfunctiont-p)
  - [`VisitedAncestor<[Tree][, Check]>`](#visitedancestortree-check)
  - [`VisitedNode<[Tree][, Check]>`](#visitednodetree-check)
  - [`VisitedParent<[Tree][, Check]>`](#visitedparenttree-check)
  - [`Visitor<[Tree][, Check]>`](#visitortree-check)
  - [`VisitorResult`](#visitorresult)
  - [`Visitors<[Tree][, Check]>`](#visitorstree-check)
- [Related](#related)
- [Contribute](#contribute)

## What is this?

This package is an essential utility for [unist][unist] that lets you walk the tree.

## When should I use this?

Use this utility when you want to walk the tree with ancestral information, or need to do a [*postorder*][postorder]
walk.

You can use [`unist-util-visit-parents`][unist-util-visit-parents] or [`syntax-tree/unist-util-visit`][unist-util-visit]
if you only need to do a [*preorder*][preorder] traversal, or don't care about the entire stack of parents.

## Install

This package is [ESM only][esm].

In Node.js (version 18+) with [yarn][yarn]:

```sh
yarn add @flex-development/unist-util-visit
yarn add -D @types/unist
```

<blockquote>
  <small>
    See <a href='https://yarnpkg.com/protocol/git'>Git - Protocols | Yarn</a>
    &nbsp;for details regarding installing from Git.
  </small>
</blockquote>

In Deno with [`esm.sh`][esmsh]:

```ts
import { CONTINUE, EXIT, SKIP, visit } from 'https://esm.sh/@flex-development/unist-util-visit'
```

In browsers with [`esm.sh`][esmsh]:

```html
<script type="module">
  import { CONTINUE, EXIT, SKIP, visit } from 'https://esm.sh/@flex-development/unist-util-visit'
</script>
```

## Use

```js
import { fromDocs } from '@flex-development/docast-util-from-docs'
import { visit } from '@flex-development/unist-util-visit'
import { directiveFromMarkdown } from 'mdast-util-directive'
import { directive } from 'micromark-extension-directive'
import { read } from 'to-vfile'

const file = await read('examples/docblock.mjs')

const tree = fromDocs(file, {
  mdastExtensions: [directiveFromMarkdown()],
  micromarkExtensions: [directive()]
})

visit(tree, (node, index, parent, ancestors) => {
  console.log(`\u001B[1m${node.type}\u001B[22m`)
  console.log(`index: ${index}`)
  console.log(`parent: ${parent?.type}`)
  console.log(`ancestors: ${JSON.stringify(ancestors.map(anc => anc.type))}\n`)
})

// enter and leave
visit(tree, {
  enter(node, index, parent, ancestors) {/* … */},
  leave(node, index, parent, ancestors) {/* … */}
})
```

Yields:

```sh
root
index: undefined
parent: undefined
ancestors: []

comment
index: 0
parent: root
ancestors: []

description
index: 0
parent: comment
ancestors: ["root"]

paragraph
index: 0
parent: description
ancestors: ["root","comment"]

text
index: 0
parent: paragraph
ancestors: ["root","comment","description"]

break
index: 1
parent: description
ancestors: ["root","comment"]

break
index: 2
parent: description
ancestors: ["root","comment"]

containerDirective
index: 3
parent: description
ancestors: ["root","comment"]

paragraph
index: 0
parent: containerDirective
ancestors: ["root","comment","description"]

text
index: 0
parent: paragraph
ancestors: ["root","comment","description","containerDirective"]

inlineCode
index: 1
parent: paragraph
ancestors: ["root","comment","description","containerDirective"]

text
index: 2
parent: paragraph
ancestors: ["root","comment","description","containerDirective"]

code
index: 1
parent: containerDirective
ancestors: ["root","comment","description"]

blockTag
index: 1
parent: comment
ancestors: ["root"]

typeExpression
index: 0
parent: blockTag
ancestors: ["root","comment"]
```

## API

This package exports the identifiers [`CONTINUE`](#continue), [`EXIT`](#exit), [`SKIP`](#skip), and
[`visit`](#visittree-test-visitorvisitors-reverse). There is no default export.

### `visit(tree[, test], visitor|visitors[, reverse])`

Visit nodes, with ancestral information.

This algorithm performs [*depth-first tree traversal*][dft] in [*preorder*][preorder] (**NLR**) and/or
[*postorder*][postorder] (**LRN**), or if `reverse` is given, *reverse preorder* (**NRL**) and/or *reverse postorder*
(**RLN**). Nodes are handled on [*enter*][enter] during *preorder* traversals and on [*exit*][exit] during *postorder*
traversals.

You can choose which nodes visitor functions handle by passing a [`test`](#test). For complex tests, you should test
yourself in `visitor` or `visitors` instead, as it will be faster and also have improved type information.

Walking the `tree` is an intensive task. Make use of visitor return values whenever possible. Instead of walking the
`tree` multiple times, walk it once, use [`unist-util-is`][unist-util-is] to check if a node matches, and then perform
different operations.

You can change `tree`. See [`Visitor`](#visitortree-check) for more info.

#### Parameters

- `tree` ([`Node`][node]) - [*tree*][tree] to traverse
- `test` ([`Test`](#test), optional) - [`unist-util-is`][unist-util-is]-compatible test
- `visitor` ([`Visitor`](#visitortree-check)) - handle a node on *enter*
- `visitors` ([`Visitors`](#visitorstree-check)) - handle each node on *enter* and/or *exit*
- `reverse` (`boolean`, optional) - traverse in reverse

#### Return

Nothing (`void`).

### `CONTINUE`

Continue traversing as normal (`true`).

```ts
const CONTINUE: Continue = true
```

### `EXIT`

Stop traversing immediately (`false`).

```ts
const EXIT: Exit = false
```

### `SKIP`

Do not traverse the [*children*][child] of this node (`'skip'`).

```ts
const SKIP: Skip = 'skip'
```

### `Action`

Union of action types.

```ts
type Action = Continue | Exit | Skip
```

### `ActionTuple`

List with at most two (`2`) values, the first an [`Action`](#action) and the second an [`Index`](#index).

```ts
type ActionTuple = [
  action?: Action | null | undefined | void,
  index?: Index | null | undefined
]
```

### `Index`

Move to the [*sibling*][sibling] at `index` next (after node itself is completely traversed).

Useful if mutating the `tree`, such as when removing the node the [`Visitor`](#visitortree-check) is currently on, or
any of its previous *siblings*.

Negative indices (`< 0`) and indices greater than or equal to `parent.children.length` stop traversal of the parent.

```ts
type Index = number
```

### `Test`

Check for an arbitrary [`Node`][node].

See [`unist-util-is`][unist-util-is] for more details.

```ts
type Test =
  | (TestFunction | unist.Node | unist.Node['type'])[]
  | TestFunction
  | unist.Node
  | unist.Node['type']
  | null
  | undefined
```

### `TestFunction<[T][, P]>`

Check if `node` passes a test.

- `T` ([`Node`][node]): node to check
  - **default**: [`Node`][node]
- `P` ([`Parent`][parent]): [*parent*][parent] of node `T`
  - **default**: [`Parent`][parent]

#### Parameters

- `node` (`T`): node to check
- `index` ([`Index`](#index) | `undefined`): index of `node` in `parent.children`
- `parent` ([`Parent`][parent] | `undefined`): [*parent*][parent] of `node`

#### Return

Test result (`boolean | undefined | void`).

> 👉 **Note**: For the best type-safety, test functions should return [type predicates][type-predicate] (`node is Type`).

### `VisitedAncestor<[Tree][, Check]>`

Collect [*ancestors*][ancestor] of visited nodes in [`Tree`][tree].

- `Tree` ([`Node`][node]) - [*tree*][tree] to extract ancestors from
  - **default**: [`Node`][node]
- `Check` ([`Test`](#test)) - visited node test
  - **default**: `null | undefined`

```ts
import type * as docast from '@flex-development/docast'
import type { VisitedAncestor } from '@flex-development/unist-util-visit'
import type * as unist from 'unist'

type Tree = docast.Root
type Check = (value: unist.Node) => value is docast.TypeExpression

type Visited = VisitedAncestor<Tree, Check> // docast.BlockTag | docast.Comment | docast.Root
```

### `VisitedNode<[Tree][, Check]>`

Collect visited nodes in [`Tree`][tree].

- `Tree` ([`Node`][node]) - [*tree*][tree] to traverse
  - **default**: [`Node`][node]
- `Check` ([`Test`](#test)) - visited node test
  - **default**: `null | undefined`

```ts
import type * as docast from '@flex-development/docast'
import type { VisitedNode } from '@flex-development/unist-util-visit'

type Tree = docast.Root

type Visited = VisitedNode<Tree>
// | docast.Root
// | docast.Comment
// | docast.BlockTag
// | docast.Description
// | docast.InlineTag
// | docast.TypeExpression
// | mdast.Blockquote
// | mdast.Code
// | mdast.Definition
// | mdast.FootnoteDefinition
// | mdast.Heading
// | mdast.List
// | mdast.ListItem
// | mdast.Paragraph
// | mdast.PhrasingContent
// | mdast.Table
// | mdast.TableCell
// | mdast.TableRow
// | mdast.ThematicBreak
```

### `VisitedParent<[Tree][, Check]>`

Collect [*parents*][parent] of visited nodes in [`Tree`][tree].

- `Tree` ([`Node`][node]) - [*tree*][tree] to extract parents from
  - **default**: [`Node`][node]
- `Check` ([`Test`](#test)) - visited node test
  - **default**: `null | undefined`

```ts
import type * as docast from '@flex-development/docast'
import type { VisitedNode } from '@flex-development/unist-util-visit'

type Tree = docast.Root
type Check = docast.TypeExpression['type']

type Visited = VisitedNode<Tree, Check> // docast.BlockTag
```

### `Visitor<[Tree][, Check]>`

Handle a `node`.

Visitors are free to transform `node`. They can also transform `parent`, or the grandparent of `node` (the last of
`ancestors`).

> 👉 **Note**: Replacing `node` itself, if [`SKIP`](#skip) is not returned, still causes its [*descendants*][descendant]
> to be walked (which is a bug).

When adding or removing previous [*siblings*][sibling] of `node`, the `Visitor` should return a new [`Index`](#index) to
specify the *sibling* to traverse after `node` is traversed. Adding or removing next *siblings* of `node` is handled as
expected without needing to return a new `Index`.

Removing the [*children*][child] of an [*ancestor*][ancestor] still results in those *child* nodes being traversed.

- `Tree` ([`Node`][node]) - [*tree*][tree] to traverse
  - **default**: [`Node`][node]
- `Check` ([`Test`](#test)) - visited node test
  - **default**: `null | undefined`

#### Parameters

- `node` ([`VisitedNode<Tree, Check>`](#visitednodetree-check)) - found node
- `index` ([`Index`](#index) | `undefined`) - index of `node` in `parent.children`
- `parent` ([`VisitedParent<Tree, Check>`](#visitedparenttree-check) | `undefined`) - [*parent*][parent] of `node`
- `ancestors` ([`VisitedAncestor<Tree, Check>[]`](#visitedancestortree-check)) - [*ancestors*][ancestor] of `node`, if
  any, where the last node is the grandparent of `node`

#### Return

What to do next ([`VisitorResult`](#visitorresult)).

### `VisitorResult`

Union of values that can be returned from a [`Visitor`](#visitortree-check).

An [`Index`](#index) is treated as a tuple of `[CONTINUE, Index]`. An [`Action`](#action) is treated as a tuple of
`[Action]`.

Returning a tuple only makes sense if the `Action` is [`SKIP`](#skip). When the `Action` is [`EXIT`](#exit), that action
can be returned. When the `Action` is [`CONTINUE`](#continue), `Index` can be returned.

```ts
type VisitorResult = Action | ActionTuple | Index | null | undefined | void
```

### `Visitors<[Tree][, Check]>`

Handle nodes when entering ([*preorder*][preorder]) and/or leaving ([*postorder*][postorder]).

- `Tree` ([`Node`][node]) - [*tree*][tree] to traverse
  - **default**: [`Node`][node]
- `Check` ([`Test`](#test)) - visited node test
  - **default**: `null | undefined`

#### Fields

- `enter` ([`Visitor<Tree, Check>`](#visitortree-check), optional) - handle nodes when [*entering*][enter] (*preorder*)
- `leave` ([`Visitor<Tree, Check>`](#visitortree-check), optional) - handle nodes when [*exiting*][exit] (*postorder*)

## Related

- [`unist-util-filter`][unist-util-filter] &mdash; create a new tree with all nodes that pass a test
- [`unist-util-flatmap`][unist-util-flatmap] &mdash; create a new tree by mapping (to an array) with the given function
- [`unist-util-generated`][unist-util-generated] &mdash; check if a node is generated
- [`unist-util-is`][unist-util-is] &mdash; check if a node passes a test
- [`unist-util-map`][unist-util-map] &mdash; create a new tree with all nodes mapped by a given function
- [`unist-util-remove`][unist-util-remove] &mdash; remove nodes from a tree that pass a test
- [`unist-util-select`][unist-util-filter] &mdash; select nodes with CSS-like selectors
- [`unist-util-visit-parents`][unist-util-visit-parents] &mdash; recursively walk over nodes, with a stack of parents

## Contribute

See [`CONTRIBUTING.md`](CONTRIBUTING.md).

This project has a [code of conduct](CODE_OF_CONDUCT.md). By interacting with this repository, organization, or
community you agree to abide by its terms.

[ancestor]: https://github.com/syntax-tree/unist#ancestor
[child]: https://github.com/syntax-tree/unist#child
[dft]: https://github.com/syntax-tree/unist#depth-first-traversal
[descendant]: https://github.com/syntax-tree/unist#descendant
[enter]: https://github.com/syntax-tree/unist#enter
[esm]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c
[esmsh]: https://esm.sh/
[exit]: https://github.com/syntax-tree/unist#exit
[node]: https://github.com/syntax-tree/unist#node
[parent]: https://github.com/syntax-tree/unist#parent-1
[postorder]: https://github.com/syntax-tree/unist#postorder
[preorder]: https://github.com/syntax-tree/unist#preorder
[sibling]: https://github.com/syntax-tree/unist#sibling
[tree]: https://github.com/syntax-tree/unist#tree
[type-predicate]: https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates
[unist-util-filter]: https://github.com/syntax-tree/unist-util-filter
[unist-util-flatmap]: https://github.com/syntax-tree/unist-util-flatmap
[unist-util-generated]: https://github.com/syntax-tree/unist-util-generated
[unist-util-is]: https://github.com/syntax-tree/unist-util-is
[unist-util-map]: https://github.com/syntax-tree/unist-util-map
[unist-util-remove]: https://github.com/syntax-tree/unist-util-remove
[unist-util-visit-parents]: https://github.com/syntax-tree/unist-util-visit-parents
[unist-util-visit]: https://github.com/syntax-tree/unist-util-visit
[unist]: https://github.com/syntax-tree/unist
[yarn]: https://yarnpkg.com
