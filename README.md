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
- [Types](#types)
- [Related](#related)
- [Contribute](#contribute)

## What is this?

This package is an essential utility for [unist][unist] that lets you walk the tree.

## When should I use this?

Use this utility when you want to walk the tree with ancestral information, or need to do a [*postorder*][postorder]
walk.

You can use [`unist-util-visit-parents`][unist-util-visit-parents] or [`syntax-tree/unist-util-visit`][unist-util-visit]
if you only need to do a [*preorder*][preorder] traversal, or don't care the entire stack of parents.

## Install

This package is [ESM only][esm].

In Node.js (version 18+) with [yarn][yarn]:

```sh
yarn add @flex-development/unist-util-visit
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

**TODO**: use

## API

**TODO**: api

## Types

This package is fully typed with [TypeScript][typescript].

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

[esm]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c
[esmsh]: https://esm.sh/
[postorder]: https://github.com/syntax-tree/unist#postorder
[preorder]: https://github.com/syntax-tree/unist#preorder
[typescript]: https://www.typescriptlang.org
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
