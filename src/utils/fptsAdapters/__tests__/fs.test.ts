import { readFile } from '../fs'
import '@relmify/jest-fp-ts'

describe('Fs', () => {
    it('it can load file with taskeither', async () => {
        const either = await readFile('./mockData/chaps.cvs')()
        expect(either).toSubsetEqualRight('ciao')
    })
    it('it can fail', async () => {
        const either = await readFile('./mockData/no-file.cvs')()
        expect(either).toBeLeft()
    })
})
