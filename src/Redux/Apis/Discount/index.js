import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl = `${process.env.REACT_APP_BASE_URL}/discount/`

export const discountApiService = createApi({
    reducerPath: 'discountApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().authSlice.token

            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }

            return headers
        }
    }),
    endpoints: (builder) => ({
        createDiscount: builder.mutation({
            query: (args) => ({
                method: "POST",
                url: "applyDiscount",
                body: args
            })
        })
    })
})

export const {
    useCreateDiscountMutation,
} = discountApiService