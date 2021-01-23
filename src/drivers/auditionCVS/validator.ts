import * as t from "io-ts";;
import { Either } from "fp-ts/lib/Either";
import { AuditionCVS } from "./models"
import { time } from '../../utils/time'

/**
 * Validate the objects extracted from Adobe Audition CVS
 * The validation checks only the `Name`, 
 * `Start` and `Duration`
 *
 * @category drivers
 */
export function validate(data: unknown): Either<t.Errors, AuditionCVS[]> {
    const auditionCVSRow = t.array(
        t.type({
            Name: t.string,
            Start: time,
            Duration: time
        })
    )
    return auditionCVSRow.decode(data)
}