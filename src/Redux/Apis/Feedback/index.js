import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl = `${process.env.REACT_APP_BASE_URL}/feedback/`

export const feedbackApiService = createApi({
    reducerPath: 'feedbackApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().authSlice.token

            headers.set('Authorization', `Bearer ${token}`)

            return headers
        }
    }),
    endpoints: (builder) => ({
        getFeedback: builder.query({
            query: (args) => {
                let { id, currentPage, itemsPerPage, search, from, to, sortBy } = args

                if (id) {
                    return `get/${id}`
                }

                return `get?page=${currentPage}&rowsPerPage=${itemsPerPage}${(search && search !== '') ? `&search=${search}` : ``}${(sortBy && sortBy !== '') ? `&sortBy=${sortBy}` : ``}${(from && from !== '') ? `&from=${from}` : ``}${(to && to !== '') ? `&to=${to}` : ``}`
            }
        })
    })
})

export const {
    useGetFeedbackQuery
} = feedbackApiService