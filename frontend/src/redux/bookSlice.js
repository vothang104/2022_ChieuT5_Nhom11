import { createSlice } from '@reduxjs/toolkit'

const bookSlice = createSlice({
    name: 'book',
    initialState: {
        listBook: {
            list: null,
            isFetching: false,
            error: false
        },
        filter: {
            name: ''
        }
    },
    reducers: {
        getBookStart(state) {
            state.listBook.isFetching = true
        },
        getBookSuccess(state, action) {
            state.listBook.isFetching = false;
            state.listBook.list = action.payload.filter(item => item.title.toLowerCase().includes(state.filter.name.toLowerCase()));
            state.listBook.error = false;
        },
        getBookFail(state) {
            state.listBook.isFetching = false;
            state.listBook.error = true;
        },
        changeFilterName(state, action) {
            state.filter.name = action.payload;
        }
    }
})

export default bookSlice.reducer;
export const {
    getBookStart,
    getBookFail,
    getBookSuccess,
    changeFilterName
} = bookSlice.actions