import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import userReducer from '../stores/user/userReducer'
import { userApi } from '../api/user'
import { tasksApi } from '../api/tasks'

export const store = configureStore({
    reducer: {
        [userApi.reducerPath]: userApi.reducer,
        [tasksApi.reducerPath]: tasksApi.reducer,
        user: userReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(userApi.middleware, tasksApi.middleware),
})

setupListeners(store.dispatch)
export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
