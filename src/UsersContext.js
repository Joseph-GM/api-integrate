import React,{ createContext, useReducer, useContext} from 'react';
import {
    createAsyncDispatcher,
    createAsyncHandler,
    initialAsyncState,
} from './asyncActionUtils';
import * as api from './api';

const initialState = {
    users: initialAsyncState,
    user: initialAsyncState  
};

const usersHandler = createAsyncHandler('GET_USERS', 'users');
const userHandler = createAsyncHandler('GET_USER', 'user');
console.log('initialState = ', initialState);
console.log('usersHandler function : ', usersHandler);


function usersReducer(state, action) {
    console.log('in usersReducer : ')
    switch (action.type) {
        case 'GET_USERS' :
        case 'GET_USERS_SUCCESS':
        case 'GET_USERS_ERROR':
            return usersHandler(state, action);
        case 'GET_USER':
        case 'GET_USER_SUCCESS':
        case 'GET_USER_ERROR':
            return userHandler(state, action);
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}



const UsersStateContext = createContext(null);
const UsersDispatchContext = createContext(null);

function UsersContextProvider({children}) {
    const [state, dispatch] = useReducer(usersReducer, initialState);
    return (
        <UsersStateContext.Provider value={state}>
            <UsersDispatchContext.Provider value={dispatch}>
                {children}
            </UsersDispatchContext.Provider>
        </UsersStateContext.Provider>
    )
}

export default UsersContextProvider;

export function useUsersState() {
    const state = useContext(UsersStateContext);
    console.log('in useUserState : ', state)
    if (!state) {
        throw new Error('Cannot find UsersContextProvider');
    }
    return state;
}

export function useUsersDispatch() {
    const dispatch = useContext(UsersDispatchContext);
    console.log('in useUserDispatch : ', dispatch);
    if (!dispatch) {
        throw new Error('Cannot find UsersProverder')
    }
    return dispatch;
}

export const getUsers = createAsyncDispatcher('GET_USERS', api.getUsers);
export const getUser = createAsyncDispatcher('GET_USER', api.getUser);

// export async function getUsers(dispatch) {
//     dispatch({type: 'GET_USERS'});
//     try {
//         const response = await axios.get(
//             'http://jsonplaceholder.typicode.com/users'
//         );
//         dispatch({type: 'GET_USERS_SUCCESS', data: response.data});
//     } catch(e) {
//         dispatch({type: 'GET_UESRS_ERROR', error: e});
//     }
// }

// export async function getUser(dispatch, id) {
//     dispatch({ type: 'GET_USER'});
//     try {
//         const response = await axios.get(
//             `http://jsonplaceholder.typicode.com/users/${id}`
//         );
//         dispatch({type: 'GET_USER_SUCCESS', data: response.data});
//     } catch(e) {
//         dispatch({type: 'GET_USER_ERROR', error:e});
//     }
// }


