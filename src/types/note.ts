import { Tag } from "./tag"

export interface Note {
    title: string
    content: string
    tags: Tag[]
    color: string
    priority: string
    isPinned: boolean
    isRead: boolean
    date: string
    createdTime: number
    editedTime: null | number
    id: string
}

// map, filter, reduce 모두 불변성을 지켜준다
// 원본 자체를 바꾸는게 아니라 새롭게 만들어서 해줌