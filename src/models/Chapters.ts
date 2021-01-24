import { Chapter, Tags } from './Chapter'

export interface Chapters {
    chapter: Chapter[],
    tableOfContents: Toc[]
}

export interface Toc { 
    elementID: string,
    isOrdered: boolean,
    elements: string[],
    tags: Tags
}
