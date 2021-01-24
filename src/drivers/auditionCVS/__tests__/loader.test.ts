import { load } from '../loader'
import '@relmify/jest-fp-ts'

describe('Audition CVS loader', () => {
    it('Check correct load', async () => {
        const res = await load('./mockData/valid_chaps.cvs', './mockData/audio.mp3')()
        expect(res).toEqualRight({'chapter': [{'elementID': 'c0', 'endTimeMs': 60636, 'startTimeMs': 0, 'tags': {'title': 'Intro'}}, {'elementID': 'c1', 'endTimeMs': 89887, 'startTimeMs': 60636, 'tags': {'title': 'Advertising'}}], 'tableOfContents': [{'elementID': 'toc', 'elements': ['c0', 'c1'], 'isOrdered': true, 'tags': {'title': 'chapters-chapz'}}]})
    })
    it('Check invalid file', async () => {
        const res = await load('./mockData/file.txt', './mockData/audio.mp3')()
        expect(res).toEqualLeft(Error('This is not CVS content'))
    })
    it('Check invalid data CVS', async () => {
        const res = await load('./mockData/invalid_chaps.cvs', './mockData/audio.mp3')()
        expect(res).toEqualLeft(Error('CVS validation error'))
    })
})
