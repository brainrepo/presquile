import { tryCatch, TaskEither, map } from 'fp-ts/lib/TaskEither'
import * as fsp from 'fs/promises'
import { pipe } from 'fp-ts/function'

export function readFile(path:string):TaskEither<Error,string>{
    return pipe(
        tryCatch(() => fsp.readFile(path), () => Error('Error reading file')), 
        map((data:string|Buffer) => data.toString())
    )
}