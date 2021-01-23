import * as t from "io-ts";;
import { convertTimeToMillis } from '../../utils/time';
import { fold } from "fp-ts/lib/Either";
import { Chapter } from "../../models/Chapter";
import { pipe } from "fp-ts/lib/pipeable";
import { mapWithIndex } from 'fp-ts/Array';
import { AuditionCVSRow } from "./models"

/**
 * Take an Either of AuditionCVS and convert in standard
 * chapter format
 *
 * @category converters
 */
export function convert(data: AuditionCVSRow[], totalDuration: number): Chapter[] {
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
function auditionCVSToChapter(id: number, record: AuditionCVSRow): Chapter {
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
    return (idx,  chapter) => {
        const endTimeMs = chapters[idx + 1]?.startTimeMs || totalDuration;
        return ({ ...chapter, endTimeMs })
    }
}