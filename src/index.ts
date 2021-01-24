import { apply } from './drivers/auditionCVS/applier'

apply('./mockData/valid_chaps.cvs','./mockData/audio.mp3')()
    .then(e => console.log(e))
    .catch(e => console.error(e))
