import { map, fromEither, chain, chainEitherK, TaskEither } from 'fp-ts/lib/TaskEither'
import { readFile } from '../../utils/fptsAdapters/fs'
import { flow } from 'fp-ts/lib/function'
import { validate } from './validator'
import { parse } from '../../utils/cvs'
import { Options } from 'csv-parse'
import { convert } from './converter'
import { loadAudioMetadata, mp3Data } from '../../mp3/mp3'
import { pipe } from 'fp-ts/lib/pipeable'
import { Chapters } from '../../models/Chapters'


/**
 * Load CVS from file and convert to Chapters data
 *
 * @category loaders
 */
export function load(filePath: string, mp3FilePath:string):TaskEither<Error, Chapters> {
  return flow(
    readFile,
    chain((content) => fromEither(parse(content, cvsConf))),
    chainEitherK(validate),
    chain((content) => {
      return pipe(
        loadAudioMetadata(mp3FilePath),
        map((metadata:mp3Data) => convert(content, metadata.duration))
      )
    })
  )(filePath)
}

const cvsConf:Options = {
  bom: true,
  delimiter: ['::', '\t'],
  trim: true,
  columns: true
}
