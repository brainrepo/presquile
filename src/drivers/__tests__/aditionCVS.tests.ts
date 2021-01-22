import { validate, convert } from '../auditionCVS'
import '@relmify/jest-fp-ts';

describe("Audition CVS validate", () => {
    it('Check if is valid', () => {
        const data = [{ Name: "pluto", Start: "12:00.000", Duration: "72:02:02.009" }];
        expect(validate(data)).toSubsetEqualRight(data);
    })

    it('Check if is not valid', () => {
        const obj = { Name: "pluto", Start: "12:00.000", Duration: "not valid time" };
        expect(validate([obj, obj])).toBeLeftWithErrorsMatching(['Invalid value \"not valid time\" supplied to : Array<{ Name: string, Start: time, Duration: time }>/0: { Name: string, Start: time, Duration: time }/Duration: time'])
    })
})

describe("Audition CVS convert", () => {
    it('Convert valid data', () => {
        const data = [
            { Name: "pluto", Start: "1:01.001", Duration: "12:22.000" },
            { Name: "paperino", Start: "1:01:22.001", Duration: "72:02:02.009" }
        ];
        const convertedData = [
            {elementID: 'c0', startTimeMs: 61001, endTimeMs: 3682001, tags: {title: "pluto"}},
            {elementID: 'c1', startTimeMs: 3682001, endTimeMs: 3685000, tags: {title: "paperino"}}
        ]
        expect(convert(data, 3685000)).toEqual(convertedData);
    })
})