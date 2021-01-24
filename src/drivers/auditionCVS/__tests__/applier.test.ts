import { apply } from '../applier'
import '@relmify/jest-fp-ts'

describe('Audition CVS Applier', () => {
    it('Apply correct CVS to mp3 should success', async() => {
        const el = await apply('./mockData/valid_chaps.cvs','./mockData/audio.mp3')()
        expect(el).toEqualRight(true)
    })

    it('Apply invalid CVS to mp3 should success', async() => {
        const el = await apply('./mockData/invalid_chaps.cvs','./mockData/audio.mp3')()
        expect(el).toEqualLeft(Error('CVS validation error'))
    })

    it('Apply invalid CVS to mp3 should success', async() => {
        const el = await apply('./mockData/valid_chaps.cvs','./mockData/audio.ogg')()
        expect(el).toEqualLeft(Error('Error, (./mockData/audio.ogg) isn\'t mp3 file'))
    })
})
