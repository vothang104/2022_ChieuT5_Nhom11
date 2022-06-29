import { useReducer, useContext, createContext } from 'react'
import { borrowedBookReducer, initialValue } from '../reducers/borrowedBookReducer';

const borrowedBookContext = createContext();

function BorrowedBookProvider({ children }) {
    const [state, dispatch] = useReducer(borrowedBookReducer, initialValue);
    const value = [state, dispatch];

    return <borrowedBookContext.Provider value={value}>{children}</borrowedBookContext.Provider>
}

const useBorrowedBookContext = () => {
    const value = useContext(borrowedBookContext);
    if (!value) throw new Error('BorrowedBookContext must be used inside borrowed book provider!');
    return value;
}

export { BorrowedBookProvider, useBorrowedBookContext, borrowedBookContext }