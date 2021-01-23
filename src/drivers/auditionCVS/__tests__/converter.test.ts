import { convert } from '../converter'
import '@relmify/jest-fp-ts'

describe('Audition CVS convert', () => {
  it('Convert valid data', () => {
    const data = [
      { Name: 'pluto', Start: '1:01.001', Duration: '12:22.000' },
      { Name: 'paperino', Start: '1:01:22.001', Duration: '72:02:02.009' },
    ]
    const convertedData = [
      {
        elementID: 'c0',
        startTimeMs: 61001,
        endTimeMs: 3682001,
        tags: { title: 'pluto' },
      },
      {
        elementID: 'c1',
        startTimeMs: 3682001,
        endTimeMs: 3685000,
        tags: { title: 'paperino' },
      },
    ]
    expect(convert(data, 3685000)).toEqual(convertedData)
  })
})
