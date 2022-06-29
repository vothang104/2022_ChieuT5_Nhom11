import { GET_ALL_BORROWED_BOOK } from "./actions";

const initialValue = {
    list: null,
}

const borrowedBookReducer = (state, action) => {
    const stateCopy = { ...state };
    switch (action.type) {
        case GET_ALL_BORROWED_BOOK:
            stateCopy.list = action.payload;
            state = { ...stateCopy };
            break;

        default:
            break;
    }
    return state;
}

export { initialValue, borrowedBookReducer }