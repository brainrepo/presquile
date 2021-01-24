/* eslint-disable  @typescript-eslint/no-explicit-any */
/* eslint-disable  @typescript-eslint/explicit-module-boundary-types */
export function inspect(e: any): any {
    console.log(e)
    return e
}

/* eslint-disable  @typescript-eslint/no-explicit-any */
/* eslint-disable  @typescript-eslint/explicit-module-boundary-types */
export function inspectWithLabel(label: string): (e: any) => any {
    return (e) => {
        console.log(`${label}:`, e)
        return e
    }
}
