import { createSlice } from '@reduxjs/toolkit'

const bookSlice = createSlice({
    name: 'book',
    initialState: {
        listBook: {
            list: null,
            isFetching: false,
            error: false
        }
    },
    reducers: {
        getBookStart(state) {
            state.listBook.isFetching = true
        },
        getBookSuccess(state, action) {
            state.listBook.isFetching = false;
            state.listBook.list = action.payload;
            state.listBook.error = false;
        },
        getBookFail(state) {
            state.listBook.isFetching = false;
            state.listBook.error = true;
        }
    }
})

export default bookSlice.reducer;
export const {
    getBookStart,
    getBookFail,
    getBookSuccess
} = bookSlice.actions