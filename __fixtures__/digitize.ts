/**
 * @file Fixtures - digitize
 * @module fixtures/digitize
 * @see https://codewars.com/kata/5583090cbe83f4fd8c000051
 */

/**
 * Given a random non-negative number, `n`, the function returns an array with
 * the digits of `n` in reverse.
 *
 * @example
 *  digitize(0) // [0]
 * @example
 *  digitize(348597) // [7, 9, 5, 8, 4, 3]
 *
 * @param {number} n - Positive integer to reverse
 * @return {number[]} Digits of `n` in reverse
 */
const digitize = (n: number): number[] => {
  if (n <= 9) return [n]

  /**
   * Digits of {@linkcode n} reversed.
   *
   * @const {number[]} digits
   */
  const digits: number[] = []

  // iterate through digits starting from rightmost digit
  while (n > 0) digits.push(n % 10 | 0) && (n = n / 10 | 0)

  return digits
}

export default digitize
