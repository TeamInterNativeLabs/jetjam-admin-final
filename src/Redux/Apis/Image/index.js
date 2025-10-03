import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl = `${process.env.REACT_APP_BASE_URL}/image`

export const imageApiService = createApi({
    reducerPath: 'imageApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().authSlice.token

            headers.set('Authorization', `Bearer ${token}`)

            return headers
        }
    }),
    endpoints: (builder) => ({
        uploadImage: builder.mutation({
            query: (args) => ({
                url: 'upload',
                method: 'POST',
                body: args
            })
        })
    })
})

export const {
    useUploadImageMutation
} = imageApiService