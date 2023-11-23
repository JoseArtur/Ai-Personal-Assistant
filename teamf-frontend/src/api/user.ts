import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_BACKEND_HOST}/user`,
    }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: `/login`,
                method: 'POST',
                body: { ...credentials },
            }),
        }),
        register: builder.mutation({
            query: (credentials) => ({
                url: `/register`,
                method: 'POST',
                body: { ...credentials },
            }),
        }),
    }),
})

export const { useLoginMutation, useRegisterMutation } = userApi
