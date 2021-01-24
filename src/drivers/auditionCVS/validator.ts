import { Either, mapLeft } from 'fp-ts/lib/Either'
import { AuditionCVS, auditionCVSCodec } from './models'
import { pipe } from 'fp-ts/lib/pipeable'

/**
 * Validate the objects extracted from Adobe Audition CVS
 * The validation checks only the `Name`, 
 * `Start` and `Duration`
 *
 * @category drivers
 */
export function validate(data: unknown): Either<Error, AuditionCVS> {
    return pipe(
        auditionCVSCodec.decode(data), 
        mapLeft(() => Error('CVS validation error')),
        )
}
