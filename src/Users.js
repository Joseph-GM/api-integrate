import React, {useState} from 'react'
import { useUsersState, useUsersDispatch, getUsers } from './UsersContext';
import User from './User';

// async function getUsers() {
//     const response = await axios.get(
//         `https://jsonplaceholder.typicode.com/users`
//     );
//     return response.data
// }

function Users() {
    const [userId, setUserId] = useState(null);
    // const [state, refetch] = useAsync(getUsers, [], true);
    const state = useUsersState();
    const dispatch = useUsersDispatch();

    const { data: users, loading, error } = state.users;
    console.log('in Users.js : ', users, loading)
    const fetchData = () => {
        getUsers(dispatch);
    };

    if (loading) return <div>로딩중....</div>;
    if (error) return <div>에러가 발생했습니다.</div>
    if (!users) return <button onClick={fetchData}>불러오기</button>;
    return (
        <>
        {console.log('in Users : ', users)}
            <ul>
                {users.map(user => (
                    <li key={user.id}
                        onClick={()=>setUserId(user.id)}
                        style={{cursor:'pointer'}}
                    >
                        {user.username}({user.name})
                    </li>
                ))}
            </ul>
            <button onClick={fetchData}>다시 불러오기</button>
            {userId && <User id={userId} />}
        </>
    );
}

export default Users;
