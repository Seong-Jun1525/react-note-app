import { createSlice } from "@reduxjs/toolkit";
import { Note } from "../../types/note";
import notes from "../../notesData";

interface NoteState {
    mainNotes: Note[],
    archiveNotes: Note[],
    trashNotes: Note[],
    editNote: null | Note
}

const initialState:NoteState = {
    mainNotes: [...notes],
    archiveNotes: [],
    trashNotes: [],
    editNote: null
}

enum noteType {
    mainNotes= 'mainNotes',
    archiveNotes= 'archiveNotes',
    trashNotes= 'trashNotes',
}

const notesListSlice = createSlice({
    name: 'notesList',
    initialState,
    reducers: {
        setMainNotes: (state, {payload}) => {
            // 해당 note 수정
            if(state.mainNotes.find(({id}) => id === payload)) {
                state.mainNotes = state.mainNotes.map((note) => (
                    note.id === payload.id ? payload : note
                ))
            }
            // note를 새롭게 생성
            else {
                state.mainNotes.push(payload)
            }
        },
        setTrashNotes: (state, {payload}) => {
            state.mainNotes = state.mainNotes.filter(({id}) => (
                id !== payload.id
            ))
            state.archiveNotes = state.archiveNotes.filter(({id}) => (
                id !== payload.id
            ))
            state.trashNotes.push({...payload, isPinned: false})
        },
        setArchiveNotes: (state, {payload}) => {
            state.mainNotes = state.mainNotes.filter(({id}) => (
                id !== payload.id
            ))
            state.archiveNotes.push({...payload, isPinned: false})
        },
        unarchiveNote: (state, {payload}) => {
            state.archiveNotes = state.archiveNotes.filter(({id}) => (
                id !== payload.id
            ))
            state.mainNotes.push(payload) // 다른 프로퍼티를 오버라이드 안하기 때문에 이렇게 해줘도 상관없다
        },
        restoreNote: (state, {payload}) => {
            state.trashNotes = state.trashNotes.filter(({id}) => (
                id !== payload.id
            ))
            state.mainNotes.push(payload)
        },
        deleteNote: (state, {payload}) => {
            // 완전히 삭제하는 것이기 때문에 trash에 있는 것을 삭제한다
            state.trashNotes = state.trashNotes.filter(({id}) => (
                id !== payload.id
            ))
        },
        setPinnedNotes: (state, {payload}) => {
            state.mainNotes = state.mainNotes.map((note) => (
                note.id === payload.id ? {...note, isPinned: !note.isPinned} : note
            ))
        },
        setEditNote: (state, {payload}) => {
            state.editNote = payload
            // payload에는 해당 노트의 객체하나가 들어가 있으니깐
            // payload를 넣어주면 됨
        },
        readNote: (state, {payload}) => {
            const {type, id} = payload // payload안에는 type, id가 들어있음

            const setRead = (notes: noteType) => {
                state[notes] = state[notes].map((note: Note) => (
                    note.id === id ? {...note, isRead: !note.isRead} : note
                ))
            }
            // state.archiveNotes
            // state.trashNotes
            // state.mainNotes
            // 이 중에서 딱 하나의 note에 isRead 프로퍼티를 원래 false였으면 true로 바꿔주고
            // 바꿔주면 그 특정 노트를 화면에 보여준다

            if(type === "archive") {
                setRead(noteType.archiveNotes)
            } else if(type === "trash") {
                setRead(noteType.trashNotes)
            } else {
                setRead(noteType.mainNotes)
            }
        },
        removeTags: (state, {payload}) => {
            state.mainNotes = state.mainNotes.map((note) => ({
                ...note,
                tags: note.tags.filter(({tag}) => tag !== payload)
                // payload에 있는 tag와 같은게 있으면 그 tag는 없애버림
            }))
        }
    }
})

export const {setMainNotes, setTrashNotes, setArchiveNotes, unarchiveNote, restoreNote, deleteNote, setPinnedNotes, setEditNote, readNote, removeTags} = notesListSlice.actions

export default notesListSlice.reducer