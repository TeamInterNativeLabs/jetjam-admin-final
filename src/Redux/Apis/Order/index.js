import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl = `${process.env.REACT_APP_BASE_URL}/order/`

export const orderApiService = createApi({
    reducerPath: 'orderApi',
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
        getOrders: builder.query({
            query: (args) => {

                let { id, currentPage, itemsPerPage, role, search, sortBy, to, from, customer } = args

                if (id) {
                    return `get/${id}`
                }

                return `get?page=${currentPage}&rowsPerPage=${itemsPerPage}${(search && search !== '') ? `&search=${search}` : ``}${(sortBy && sortBy !== '') ? `&sortBy=${sortBy}` : ``}${(customer && customer !== '') ? `&customer=${customer}` : ``}${(from && from !== '') ? `&from=${from}` : ``}${(to && to !== '') ? `&to=${to}` : ``}`
            },
            keepUnusedDataFor: 0
        }),
        updateOrderStatus: builder.mutation({
            query: (args) => {

                let { id, payload } = args
                let url = `update/${id}`

                return ({
                    url,
                    method: 'PUT',
                    body: payload
                })

            }
        }),
    })
})

export const {
    useGetOrdersQuery,
    useUpdateOrderStatusMutation
} = orderApiService