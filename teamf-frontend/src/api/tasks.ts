import { createAction } from '@reduxjs/toolkit'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Task } from '../components/TaskList'

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
                url: '/',
                method: 'POST',
                body: { ...credentials },
            }),
        }),
        get: builder.query({
            query: () => ({
                url: '/',
                method: 'GET',
            }),
        }),
        complete: builder.mutation({
            query: (task) => {
                const completedAt = task.completed_at
                    ? ''
                    : new Date().toISOString().slice(0, -1)
                return {
                    url: `/${task.id}`,
                    method: 'PUT',
                    body: { completed_at: completedAt },
                }
            },
        }),
        filterByDate: builder.mutation({
            queryFn(arg) {
                const { formattedDate, taskList } = arg
                const dateFormated = new Date(
                    formattedDate
                ).toLocaleDateString()

                const filteredData = taskList.filter((task: Task) => {
                    const duoDateFormated = new Date(
                        task.due_date
                    ).toLocaleDateString()

                    return dateFormated === duoDateFormated
                })

                return {
                    data: filteredData,
                }
            },
        }),
    }),
})

export const {
    useCreateMutation,
    useGetQuery,
    useCompleteMutation,
    useFilterByDateMutation,
} = tasksApi
