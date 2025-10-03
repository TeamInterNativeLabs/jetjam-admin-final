import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl = `${process.env.REACT_APP_BASE_URL}/product/`

export const productApiService = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().authSlice.token

            headers.set('Authorization', `Bearer ${token}`)

            return headers
        }
    }),
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: (args) => {
                let { id, currentPage, itemsPerPage, role, search, sortBy, to, from } = args

                if (id) {
                    return `get/${id}`
                }

                return `get?page=${currentPage}&rowsPerPage=${itemsPerPage}&role=${role}${(search && search !== '') ? `&search=${search}` : ``}${(sortBy && sortBy !== '') ? `&sortBy=${sortBy}` : ``}${(from && from !== '') ? `&from=${from}` : ``}${(to && to !== '') ? `&to=${to}` : ``}`
            },
            keepUnusedDataFor: 0
        }),
        createProduct: builder.mutation({
            query: args => ({
                url: 'create',
                method: 'POST',
                body: args
            })
        }),
        updateProduct: builder.mutation({
            query: (args) => {

                let { id, payload } = args
                let url = `update/${id}`

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
    useGetProductsQuery,
    useCreateProductMutation,
    useUpdateProductMutation
} = productApiService