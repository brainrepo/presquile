import parses from 'csv-parse/lib/sync'
import { Either, left, right } from 'fp-ts/lib/Either'
import { Options } from 'csv-parse'

const PARSE_ERROR_MESSAGE = 'This is not CVS content'

/* eslint-disable  @typescript-eslint/no-explicit-any */
/* eslint-disable  @typescript-eslint/explicit-module-boundary-types */
export function parse(data:Buffer|string, options:Options):Either<Error, any>{
    try{
        const parsedData = parses(data, options)
        return (parsedData !== undefined && parsedData.length > 0 ) ? right(parsedData) : left(Error(PARSE_ERROR_MESSAGE))
    }catch(e){
        return left(Error(PARSE_ERROR_MESSAGE))
    }
}