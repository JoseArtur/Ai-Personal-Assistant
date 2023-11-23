import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const tasksApi = createApi({
    reducerPath: 'tasksApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_BACKEND_HOST}/tasks`,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('authToken')

            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }

            return headers
        },
    }),
    endpoints: (builder) => ({
        create: builder.mutation({
            query: (credentials) => ({
                url: '',
                method: 'POST',
                body: { ...credentials },
            }),
        }),
    }),
})

export const { useCreateMutation } = tasksApi
