import { validate } from '../validator'
import '@relmify/jest-fp-ts';

describe("Audition CVS validator", () => {
    it('Check if is valid', () => {
        const data = [{ Name: "pluto", Start: "12:00.000", Duration: "72:02:02.009" }];
        expect(validate(data)).toSubsetEqualRight(data);
    })

    it('Check if is not valid', () => {
        const obj = { Name: "pluto", Start: "12:00.000", Duration: "not valid time" };
        expect(validate([obj, obj])).toBeLeftWithErrorsMatching(['Invalid value \"not valid time\" supplied to : Array<{ Name: string, Start: time, Duration: time }>/0: { Name: string, Start: time, Duration: time }/Duration: time'])
    })
})