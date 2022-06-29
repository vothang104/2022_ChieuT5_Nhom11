import React from 'react'
import { BorrowedBookProvider } from './borrowedBookContext'

function ParentProvider({ children }) {
    return (
        <>
            <BorrowedBookProvider>
                {children}
            </BorrowedBookProvider>
        </>
    )
}

export default ParentProvider