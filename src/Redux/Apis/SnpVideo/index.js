import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl = `${process.env.REACT_APP_BASE_URL}/snp-video/`

export const snpVideoApiService = createApi({
    reducerPath: 'snpVideoApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().authSlice.token

            headers.set('Authorization', `Bearer ${token}`)

            return headers
        }
    }),
    endpoints: (builder) => ({
        getSnpVideo: builder.query({
            query: (args) => ({
                url: args?.id ? `get/${id}` : "get",
                params: args?.id ? {} : args
            }),
            keepUnusedDataFor: 0
        }),
        getSnpVideoById: builder.query({
            query: (args) => `get/${args.id}`,
            keepUnusedDataFor: 0
        }),
        addSnpVideo: builder.mutation({
            query: (payload) => ({
                url: 'create',
                method: 'POST',
                body: payload
            })
        }),
        updateSnpVideo: builder.mutation({
            query: (args) => {

                let { id, payload } = args
                let url = `update/${id}`

                if (!id) {
                    url = 'update'
                }

                return ({
                    url,
                    method: 'PUT',
                    body: payload
                })

            }
        }),
        deleteSnpVideo: builder.mutation({
            query: (id) => ({
                url: `delete/${id}`,
                method: 'DELETE'
            })
        }),
    })
})

export const {
    useGetSnpVideoQuery,
    useGetSnpVideoByIdQuery,
    useAddSnpVideoMutation,
    useUpdateSnpVideoMutation,
    useDeleteSnpVideoMutation
} = snpVideoApiService