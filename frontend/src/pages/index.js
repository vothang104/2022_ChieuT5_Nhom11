import axios from 'axios'
import React, { useEffect, useState } from 'react'

function HomePage() {
    const [users, setUsers] = useState([])
    useEffect(() => {
        const getUsers = async () => {
            try {
                const resp = await axios.get('http://localhost:8080/backend/getAllUser');
                if (resp && resp.status === 200) {
                    setUsers(resp.data);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getUsers();
    }, [])
    return (
        <div>
            {
                users.length > 0 &&
                users.map(user => (
                    <div key={user.id}>{user.fullName}</div>
                ))
            }
        </div>
    )
}

export default HomePage