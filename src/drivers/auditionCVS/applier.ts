import { pipe } from 'fp-ts/lib/pipeable'
import { map,  chainEitherK, TaskEither } from 'fp-ts/lib/TaskEither'
import { load } from './loader'
import { write } from '../../mp3/chaptersWriter'
import { inspect } from '../../utils/fptsUtils'

/**
 * Apply chapters to mp3 files
 *
 * @category appliers
 */
export function apply(chaptersCVSFile:string, mp3File:string):TaskEither<Error, true>{
    return pipe(
        load(chaptersCVSFile, mp3File),
        map(inspect),
        chainEitherK((e) => write(e, mp3File)()),
        map(inspect)
    )
}
