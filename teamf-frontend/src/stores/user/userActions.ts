import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchUsers = createAsyncThunk('user/fetchUsers', async () => {
    // Todo: call api to get users
    // const response = await fetch('http://localhost:8080/users');

    const response = await fetch('http://localhost:3000/mock/users.json')
    const data = await response.json()
    return data
})

export const selectUser = createAsyncThunk(
    // Just to test the usage in another component
    'user/selectUser',
    async (selectedUser: string | number) => selectedUser
)

export const deleteUser = createAsyncThunk(
    'user/deleteUser',
    async (userId: string | number) => {
        // Todo: call api to delete user
        // const response = await fetch(`http://localhost:8080/users/${userId}`);
        // const data = await response.json();

        // creates a promise that is solved in 1 seconds to simulate the api response and test deleting state.
        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(userId)
            }, 1000)
        })

        return promise
    }
)
