import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {v4} from 'uuid'
const initialState = {
    tagsList: [
        {tag: 'coding', id: v4()},
        {tag: 'exercise', id: v4()},
        {tag: 'quotes', id: v4()}
    ]
}

const tagsSlice = createSlice({
    name: 'tags',
    initialState,
    reducers: {
        addTags: (state, {payload}) => {
            if(state.tagsList.find(({tag}) => tag === payload.tag)) {
                toast.warning("이미 존재하는 태그입니다.")
            } else {
                state.tagsList.push(payload)
                toast.info("새로운 태그가 등록되었습니다.")
            }
            // 불변성 안지키면서 할 수 있는 이유 : 내부에서 immer라는 module을 이용해서 다 처리해주고 있기 때문이다
        },
        deleteTags: (state, {payload}) => {
            state.tagsList = state.tagsList.filter(({id}) => id !== payload)
            // payload에 있는 id와 같은게 있으면 없애버림
            toast.info("태그가 삭제되었습니다.")
        }
    }
})

export const {addTags, deleteTags} = tagsSlice.actions

export default tagsSlice.reducer