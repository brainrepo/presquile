import { flow } from 'fp-ts/function'
import { map, chain, fromOption, Either } from 'fp-ts/lib/Either'
import { matchC } from './fptsAdapters'
import { tail, map as arrMap, zipWith, reduce } from 'fp-ts/Array'
import * as t from 'io-ts';

const MULTIPLIERS: number[] = [60 * 60 * 1000, 60 * 1000, 1000, 1];
const REGEXP = /(?:([0-9]+):)?([0-9]+):([0-9]+)\.([0-9]+)/


/**
 * Returns a new `Either` holding a `Left` value with 
 * milliseconds or a `Right` id the given format
 * is not hh:mm:ss.SSS or mm:ss.SSS
 *
 *
 * @category utils
 */
export const convertTimeToMillis: (string: string) => Either<Error, number> =
    flow(
        matchC(REGEXP),
        map(tail),
        chain(fromOption(() => (new Error("not enought elements")))),
        map(arrMap(e => Number(e) || 0)),
        map((el) => zipWith(el, MULTIPLIERS, (a: number, b: number): number => a * b)),
        map(reduce<number, number>(0, (a, b) => (a + b)))
    )
;

const isTime = (u: unknown): u is string => typeof u === "string" && REGEXP.test(u);


/**
 * Define time coded for time validation
 *
 * @category utils
 */
export const timeCodec = new t.Type<string, string, unknown>( 
  "time",
  isTime,
  (input, context) => isTime(input) ? t.success(input) : t.failure(input, context),
  t.identity,
);

/**
 * Export time type from codec
 *
 * @category utils
 */
export type time = t.TypeOf<typeof timeCodec>