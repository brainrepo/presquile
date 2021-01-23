import { loadAudioMetadata } from '../mp3'
import '@relmify/jest-fp-ts'

describe('Mp3', () => {
    it('it can load audio metadata', async () => {
        const metadata = await loadAudioMetadata('./mockData/audio.mp3')()
        expect(metadata).toSubsetEqualRight({'duration': 89887, 'isMp3': true})
    })
    it('it can fail loading from no audio file', async () => {
        const metadata = await loadAudioMetadata('./mockData/file.txt')()
        expect(metadata).toEqualLeft(Error('Error, (./mockData/file.txt) isn\'t audio file'))
    })
    it('it can fail with not mpeg audio file', async () => {
        const metadata = await loadAudioMetadata('./mockData/audio.ogg')()
        expect(metadata).toEqualLeft(Error('Error, (./mockData/audio.ogg) isn\'t mp3 file'))
    })
})
