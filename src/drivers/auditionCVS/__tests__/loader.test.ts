import { load } from '../loader'
import '@relmify/jest-fp-ts'

describe('Audition CVS loader', () => {
    it('Check correct load', async () => {
        const res = await load('./mockData/valid_chaps.cvs')()
        expect(res).toEqualRight([{'elementID': 'c0', 'endTimeMs': 92636, 'startTimeMs': 0, 'tags': {'title': 'Intro'}}, {'elementID': 'c1', 'endTimeMs': 100000, 'startTimeMs': 92636, 'tags': {'title': 'Advertising'}}])
    })
    it('Check invalid file', async () => {
        const res = await load('./mockData/file.txt')()
        expect(res).toEqualLeft(Error('This is not CVS content'))
    })
    it('Check invalid data CVS', async () => {
        const res = await load('./mockData/invalid_chaps.cvs')()
        expect(res).toEqualLeft(Error('CVS validation error'))
    })
})
