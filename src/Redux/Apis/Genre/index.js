import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl = `${process.env.REACT_APP_BASE_URL}/genre/`

export const genreApiService = createApi({
    reducerPath: 'genreApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().authSlice.token

            headers.set('Authorization', `Bearer ${token}`)

            return headers
        }
    }),
    endpoints: (builder) => ({
        getGenre: builder.query({
            query: (args) => {
                let { id, currentPage, itemsPerPage, role, search, sortBy, to, from } = args

                if (id) {
                    return `get/${id}`
                }

                return `get?page=${currentPage}&rowsPerPage=${itemsPerPage}&role=${role}${(search && search !== '') ? `&search=${search}` : ``}${(sortBy && sortBy !== '') ? `&sortBy=${sortBy}` : ``}${(from && from !== '') ? `&from=${from}` : ``}${(to && to !== '') ? `&to=${to}` : ``}`
            },
            keepUnusedDataFor: 0
        }),
        getGenreById: builder.query({
            query: (args) => `get/${args.id}`,
            keepUnusedDataFor: 0
        }),
        addGenre: builder.mutation({
            query: (payload) => ({
                url: 'create',
                method: 'POST',
                body: payload
            })
        }),
        updateGenre: builder.mutation({
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
        deleteGenre: builder.mutation({
            query: (payload) => ({
                url: `delete/${payload.id}`,
                method: 'DELETE'
            })
        }),
    })
})

export const {
    useGetGenreQuery,
    useGetGenreByIdQuery,
    useAddGenreMutation,
    useUpdateGenreMutation,
    useDeleteGenreMutation
} = genreApiService