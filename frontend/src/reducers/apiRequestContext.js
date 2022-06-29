import axios from 'axios'
import { BASE_URL } from '../utils/constants';
import { GET_ALL_BORROWED_BOOK } from './actions';

// get all borrowed book
const getAllBorrowedBook = async (dispatch) => {
    try {
        const resp = await axios.get(`${BASE_URL}/borrowedBook`);
        if (resp && resp.status === 200) {
            dispatch({
                type: GET_ALL_BORROWED_BOOK,
                payload: resp.data
            })
        }
    } catch (error) {
        console.log(error);
    }
}

export {
    getAllBorrowedBook
}