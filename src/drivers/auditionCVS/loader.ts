import { map, fromEither, chain, chainEitherK, TaskEither } from 'fp-ts/lib/TaskEither'
import { readFile } from '../../utils/fptsAdapters/fs'
import { flow } from 'fp-ts/lib/function'
import { validate } from './validator'
import { parse } from '../../utils/cvs'
import { Options } from 'csv-parse'
import { convert } from './converter'
import { Chapter } from '../../models/Chapter'

export function load(filePath: string):TaskEither<Error, Chapter[]> {
  return flow(
    readFile,
    chain((content) => fromEither(parse(content, cvsConf))),
    chainEitherK(validate),
    map(d => convert(d,100000))
  )(filePath)
}

const cvsConf:Options = {
  bom: true,
  delimiter: ['::', '\t'],
  trim: true,
  columns: true
}
