import { readFile } from '../fs'
import '@relmify/jest-fp-ts'

describe('Fs', () => {
    it('it can load file with taskeither', async () => {
        const either = await readFile('./mockData/file.txt')()
        expect(either).toSubsetEqualRight('file contents')
    })
    it('it can fail', async () => {
        const either = await readFile('./mockData/no-file.cvs')()
        expect(either).toBeLeft()
    })
})
