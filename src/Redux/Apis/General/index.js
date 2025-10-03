import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl = `${process.env.REACT_APP_BASE_URL}/general/`

export const generalApiService = createApi({
    reducerPath: 'generalApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().authSlice.token

            headers.set('Authorization', `Bearer ${token}`)

            return headers
        }
    }),
    endpoints: (builder) => ({
        getGeneral: builder.query({
            query: () => 'get',
            keepUnusedDataFor: 0
        }),
        getDashboard: builder.query({
            query: () => 'dashboard',
            keepUnusedDataFor: 0
        }),
        uploadImage: builder.mutation({
            query: (payload) => ({
                url: 'upload-image',
                method: 'POST',
                body: payload
            })
        }),
        uploadAudio: builder.mutation({
            query: (payload) => ({
                url: 'upload-audio',
                method: 'POST',
                body: payload
            })
        }),
        uploadVideo: builder.mutation({
            query: (payload) => ({
                url: 'upload-video',
                method: 'POST',
                body: payload
            })
        }),
    })
})

export const {
    useGetGeneralQuery,
    useLazyGetGeneralQuery,
    useGetDashboardQuery,
    useUploadAudioMutation,
    useUploadImageMutation,
    useUploadVideoMutation
} = generalApiService