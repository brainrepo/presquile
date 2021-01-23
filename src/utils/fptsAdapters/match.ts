import * as E from 'fp-ts/lib/Either'

/**
 * Adapt regexp match to be compatible with fp-ts Either
 *
 * @category utils
 */
export function match(
  regexp: RegExp,
  string: string
): E.Either<Error, RegExpMatchArray> {
  const matches: RegExpMatchArray = string.match(regexp)
  switch (matches) {
    case null:
      return E.left(new Error(`${string} us not valid data`))
    default:
      return E.right(matches.map((e) => e))
  }
}

/**
 * Curried Version of match function
 *
 * @category utils
 */
export function matchC(
  regexp: RegExp
): (string: string) => E.Either<Error, RegExpMatchArray> {
  return (string) => {
    return match(regexp, string)
  }
}
