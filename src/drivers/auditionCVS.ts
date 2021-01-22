import * as t from "io-ts";;
import { convertTimeToMillis, time } from '../utils/time';
import { Either, fold, map } from "fp-ts/lib/Either";
import { Chapter } from "../models/Chapter";
import { pipe } from "fp-ts/lib/pipeable";
import { mapWithIndex, reduceWithIndex } from 'fp-ts/Array';

interface AuditionCVS {
    Name: string,
    Start: string,
    Duration: string
}

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

/**
 * Take an Either of AuditionCVS and convert in standard
 * chapter format
 *
 * @category converters
 */
export function convert(data: AuditionCVS[], totalDuration: number): Chapter[] {
    return pipe(
        data,
        mapWithIndex(auditionCVSToChapter),
        e => mapWithIndex(fixDurations(totalDuration, e))(e)
    )
}

/**
 * Convert the AuditionCVS row format to the
 * Chapter format
 * 
 * @category converters
 */
function auditionCVSToChapter(id: number, record: AuditionCVS): Chapter {
    return ({
        elementID: `c${id}`,
        startTimeMs: pipe(convertTimeToMillis(record.Start), fold(() => 0, (t) => t)),
        endTimeMs: undefined,
        tags: {
            title: record.Name,
        }
    })
}

/**
 * Fix the endTimeMs null values with the next startTime value
 * for the last chapter take the total duration value
 *
 * @category converters
 */
function fixDurations(totalDuration: number, chapters: Chapter[]): (idx: number, chapter: Chapter) => Chapter {
    //TODO: Port using fp-ts array lib
    return (idx,  chapter) => {
        const time = chapters[idx + 1]?.startTimeMs;
        const endTimeMs = (time === undefined) ? totalDuration : time
        return ({ ...chapter, endTimeMs })
    }
}