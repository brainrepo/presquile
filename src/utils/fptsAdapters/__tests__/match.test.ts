import { match } from '../match'
import '@relmify/jest-fp-ts'

describe('Match', () => {
    it('it can return Left if is not valid string', () => {
        expect(match(/(?:([0-9]+):)?([0-9]+):([0-9]+)\.([0-9]+)/, '0:00.pippo')).toEqualLeft(Error('0:00.pippo us not valid data'))
    })
    it('it can return Right if is valid string', () => {
        expect(match(/(?:([0-9]+):)?([0-9]+):([0-9]+)\.([0-9]+)/, '01:12:00.123')).toSubsetEqualRight(['01:12:00.123', '01', '12', '00', '123'])
    })
})
