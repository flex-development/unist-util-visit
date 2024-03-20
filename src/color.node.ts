/**
 * @file color
 * @module unist-util-visit/color/node
 */

/**
 * Add color to `value`.
 *
 * @this {void}
 *
 * @param {string} value - Value to colorize
 * @return {string} `value` in color
 */
function color(this: void, value: string): string {
  return '\u001B[33m' + value + '\u001B[39m'
}

export default color
