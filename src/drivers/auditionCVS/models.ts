import { timeCodec } from '../../utils/time'
import * as t from 'io-ts'

export const auditionCVSRowCodec = t.type({
    Name: t.string,
    Start: timeCodec,
    Duration: timeCodec
})
export type AuditionCVSRow = t.TypeOf<typeof auditionCVSRowCodec>

export const auditionCVSCodec = t.array(
    auditionCVSRowCodec 
)
export type AuditionCVS = t.TypeOf<typeof auditionCVSCodec>