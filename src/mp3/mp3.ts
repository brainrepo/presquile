import { pipe } from 'fp-ts/lib/function'
import { TaskEither, tryCatch, map, chain, right, left } from 'fp-ts/lib/TaskEither'
import { IAudioMetadata, parseFile } from 'music-metadata'

interface mp3Data {
    isMp3: boolean,
    duration?: number
}

export function loadAudioMetadata(filename:string):TaskEither<Error, mp3Data>{
    return pipe(
        tryCatch(
            ():Promise<IAudioMetadata> => parseFile(filename, { duration: true }), 
            () => Error(`Error, (${filename}) isn't audio file`)
        ),
        chain(metadata => (metadata.format.container === 'MPEG')?
            right(metadata):
            left(Error(`Error, (${filename}) isn't mp3 file`))
        ),
        map((metadata) => ({
            isMp3: (metadata.format.container === 'MPEG'),
            duration: ~~(metadata.format.duration * 1000)
        }))
    )
}
