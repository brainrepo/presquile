import { parse } from '../cvs'
import '@relmify/jest-fp-ts'


describe('convert time to millis', () => {
    it('it can parse good cvs', () => {
        expect(
            parse(`Name	Start	Duration	Time Format	Type	Description
            Intro	0:00.000	0:00.000	decimal	Cue	
            `, {  
                bom: true,
                delimiter: ['::', '\t'],
                trim: true,
                columns: true
            })
        ).toSubsetEqualRight([{'Description': '', 'Duration': '0:00.000', 'Name': 'Intro', 'Start': '0:00.000', 'Time Format': 'decimal', 'Type': 'Cue'}])
    })

    it('it can fail with not cvs content', () => {
        expect(
            parse('notv', {  
                bom: true,
                delimiter: ['::', '\t'],
                trim: true,
                columns: true
            })
        ).toSubsetEqualLeft(Error('This is not CVS content'))
    })
})