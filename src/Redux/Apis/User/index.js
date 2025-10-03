import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl = `${process.env.REACT_APP_BASE_URL}/user/`

export const userApiService = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().authSlice.token

            headers.set('Authorization', `Bearer ${token}`)

            return headers
        }
    }),
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: (args) => {
                let { id, currentPage, itemsPerPage, role, search, sortBy, to, from, business } = args

                if (id) {
                    return `get/${id}`
                }

                return `get?page=${currentPage}&rowsPerPage=${itemsPerPage}&role=${role}${(search && search !== '') ? `&search=${search}` : ``}${(sortBy && sortBy !== '') ? `&sortBy=${sortBy}` : ``}${(business && business !== '') ? `&business=${business}` : ``}${(from && from !== '') ? `&from=${from}` : ``}${(to && to !== '') ? `&to=${to}` : ``}`
            },
            keepUnusedDataFor: 0
        }),
        updateUser: builder.mutation({
            query: (args) => {

                let { id, payload } = args
                let url = `update/${id}`

                if (!id) {
                    url = `update/${payload._id}`
                }

                delete payload.email

                return ({
                    url,
                    method: 'PUT',
                    body: payload
                })

            }
        }),
        updateUserStatus: builder.mutation({
            query: (args) => {

                let { id, payload } = args
                let url = `statusUpdate/${id}`

                return ({
                    url,
                    method: 'PUT',
                    body: payload
                })

            }
        }),
        changePassword: builder.mutation({
            query: (args) => {

                return ({
                    url: `change-password`,
                    method: 'POST',
                    body: args
                })

            }
        }),
        addUser: builder.mutation({
            query: (payload) => ({
                url: 'create',
                method: 'POST',
                body: payload
            })
        }),
        assign: builder.mutation({
            query: (payload) => ({
                url: 'assign',
                method: 'PUT',
                body: payload
            })
        }),
    })
})

export const {
    useGetUsersQuery,
    useUpdateUserMutation,
    useUpdateUserStatusMutation,
    useChangePasswordMutation,
    useAddUserMutation,
    useAssignMutation
} = userApiService