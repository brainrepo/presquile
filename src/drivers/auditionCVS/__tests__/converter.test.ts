import { convert } from '../converter'
import '@relmify/jest-fp-ts'

describe('Audition CVS convert', () => {
  it('Convert valid data', () => {
    const data = [
      { Name: 'Intro', Start: '0:00.000', Duration: '1:00.636' },
      { Name: 'Advertising', Start: '1:00.636', Duration: '1.30' },
    ]
    const convertedData = {'chapter': [{'elementID': 'c0', 'endTimeMs': 60636, 'startTimeMs': 0, 'tags': {'title': 'Intro'}}, {'elementID': 'c1', 'endTimeMs': 89887, 'startTimeMs': 60636, 'tags': {'title': 'Advertising'}}], 'tableOfContents': [{'elementID': 'toc', 'elements': ['c0', 'c1'], 'isOrdered': true, 'tags': {'title': 'chapters-chapz'}}]}
    expect(convert(data, 89887)).toEqual(convertedData)
  })
})
