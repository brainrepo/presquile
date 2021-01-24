import { IOEither, left, right } from 'fp-ts/lib/IOEither'
import * as NodeID3 from 'node-id3'
import { Chapters } from '../models/Chapters'

/**
 * Write Standard format chapters to mp3 file
 *
 * @category writes
 */
export function write(tags:Chapters, filePath:string):IOEither<Error,true> {
        return (NodeID3.write(tags, filePath) !== true) ?
            left(Error('Error writing mp3 tags')):
            right(true)
}
