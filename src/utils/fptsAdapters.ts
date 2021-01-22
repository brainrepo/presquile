import * as E from 'fp-ts/lib/Either'

export function match(regexp:RegExp, string:string):E.Either<Error, RegExpMatchArray>{
    const matches:RegExpMatchArray = string.match(regexp);
    switch(matches){
        case null:
            return E.left( new Error(`${string} us not valid data`))
        default:
            return E.right(matches.map(e => e)) 
    }
}

export function matchC(regexp:RegExp): (string:string) => E.Either<Error, RegExpMatchArray> {
    return (string) => {
        return match(regexp,string)
    }
}
