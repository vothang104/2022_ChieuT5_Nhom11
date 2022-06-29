import { createSlice } from '@reduxjs/toolkit'

const categorySlice = createSlice({
    name: 'category',
    initialState: {
        listCategory: {
            list: null,
            isFetching: false,
            error: false
        }
    },
    reducers: {
        getCategoryStart(state) {
            state.listCategory.isFetching = true
        },
        getCategorySuccess(state, action) {
            state.listCategory.isFetching = false;
            state.listCategory.list = action.payload;
            state.listCategory.error = false;
        },
        getCategoryFail(state) {
            state.listCategory.isFetching = false;
            state.listCategory.error = true;
        }
    }
})

export default categorySlice.reducer;
export const {
    getCategoryStart,
    getCategoryFail,
    getCategorySuccess
} = categorySlice.actions