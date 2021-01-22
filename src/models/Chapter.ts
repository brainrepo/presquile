export interface Chapter {
    elementID: string,
    startTimeMs: number,
    endTimeMs: number,
    tags: Tags
}

export interface Tags {
    title: string
}
