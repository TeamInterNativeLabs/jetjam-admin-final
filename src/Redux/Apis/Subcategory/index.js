import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl = `${process.env.REACT_APP_BASE_URL}/subcategory/`

export const subcategoryApiService = createApi({
    reducerPath: 'subcategoryApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().authSlice.token

            headers.set('Authorization', `Bearer ${token}`)

            return headers
        }
    }),
    endpoints: (builder) => ({
        getSubcategories: builder.query({
            query: (args) => {
                let { id, currentPage, itemsPerPage, search, active, category } = args

                if (id) {
                    return `get/${id}`
                }

                return `get?page=${currentPage}&rowsPerPage=${itemsPerPage}${(search && search !== '') ? `&search=${search}` : ``}${(active && active !== '') ? `&active=${active}` : ``}${(category && category !== null && category !== "") ? `&category=${category}` : ``}`
            },
            keepUnusedDataFor: 0
        }),
        updateSubcategory: builder.mutation({
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
        })
    })
})

export const {
    useGetSubcategoriesQuery,
    useUpdateSubcategoryMutation
} = subcategoryApiService