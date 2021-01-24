#!/usr/bin/env node
import { apply } from './drivers/auditionCVS/applier'
import {Command} from 'commander'
import { flow } from 'fp-ts/lib/function'
import { fold } from 'fp-ts/lib/Either'

const program = new Command()
program.version('1.0.0')

program.command('apply <auditionCVS> <mp3File>')
    .description('test command', {
        auditionCVS: 'Audition CVS Markers file',
        mp3File: 'Mp3 file'
    })
    .action(async (auditionCVS, mp3File) => {
        const r = await apply(auditionCVS, mp3File)()

        flow(
            fold(
                (e:Error) => console.error('Error: %s', e.message),
                () => console.log('Chapters written inside mp3!') 
            )
        )(r)
    })

program.parse(process.argv)
