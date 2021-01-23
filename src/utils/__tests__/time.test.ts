import { convertTimeToMillis } from '../time'
import '@relmify/jest-fp-ts'


describe('convert time to millis', () => {
    it('0.00.000 should be equal to 0 millis', () => {
        expect(convertTimeToMillis('0:00.000')).toSubsetEqualRight(0)
    })
    it('1.01.001 convert correctly time with only minutes', () => {
        expect(convertTimeToMillis('1:01.001')).toSubsetEqualRight(61001)
    })
    it('not-valid convert correctly time with only minutes', () => {
        expect(convertTimeToMillis('not valid time')).toBeLeft()
    })
})