import { tryCatch, TaskEither, map } from 'fp-ts/lib/TaskEither'
import { toError } from 'fp-ts/lib/Either'
import * as fsp from 'fs/promises'
import { pipe } from 'fp-ts/function'

export function readFile(path:string):TaskEither<Error,string>{
    return pipe(
        tryCatch(() => fsp.readFile(path),toError), 
        map((data:string|Buffer) => data.toString())
    )
}