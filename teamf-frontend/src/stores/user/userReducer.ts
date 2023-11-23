import { createSlice, ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { fetchUsers, deleteUser, selectUser } from './userActions'

export interface User {
    id: number | string
    name: string
    surname: string
}

interface UserState {
    users: User[]
    selectedUser: User | null
    status: 'loading' | 'succeeded' | 'failed' | 'deleting'
    error: string | null
}

const initialState: UserState = {
    users: [],
    selectedUser: null,
    status: 'loading',
    error: null,
}

const userReducer = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    // Async calls to api
    extraReducers: (builder) => {
        fetchUserReducer(builder)
        deleteUserReducer(builder)
        selectUserReducer(builder)
    },
})

const fetchUserReducer = (builder: ActionReducerMapBuilder<UserState>) => {
    builder
        .addCase(fetchUsers.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(fetchUsers.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.users = action.payload
        })
        .addCase(fetchUsers.rejected, (state: any, action) => {
            state.status = 'failed'
            state.error = action.error.message
        })
}

const deleteUserReducer = (builder: ActionReducerMapBuilder<UserState>) => {
    builder
        .addCase(deleteUser.pending, (state) => {
            state.status = 'deleting'
        })
        .addCase(deleteUser.fulfilled, (state, action) => {
            state.status = 'succeeded'
            const id = action.payload
            const filteredUsers = state.users.filter((user) => user.id !== id)

            if (state.selectedUser?.id === id) {
                state.selectedUser = null
            }

            state.users = filteredUsers
        })
        .addCase(deleteUser.rejected, (state: any, action) => {
            state.status = 'failed'
            state.error = action.error.message
        })
}

const selectUserReducer = (builder: ActionReducerMapBuilder<UserState>) => {
    builder.addCase(selectUser.fulfilled, (state, action) => {
        const selectedUser = state.users.filter(
            (user) => user.id === action.payload
        )[0]
        state.selectedUser = selectedUser
    })
}

export default userReducer.reducer
