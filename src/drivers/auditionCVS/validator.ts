import * as t from "io-ts";
import { Either } from "fp-ts/lib/Either";
import { AuditionCVS, auditionCVSCodec } from "./models"

/**
 * Validate the objects extracted from Adobe Audition CVS
 * The validation checks only the `Name`, 
 * `Start` and `Duration`
 *
 * @category drivers
 */
export function validate(data: unknown): Either<t.Errors, AuditionCVS> {
    return auditionCVSCodec.decode(data)
}