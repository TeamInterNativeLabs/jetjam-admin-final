import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl = `${process.env.REACT_APP_BASE_URL}/banner/`

export const bannerApiService = createApi({
    reducerPath: 'bannerApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().authSlice.token

            headers.set('Authorization', `Bearer ${token}`)

            return headers
        }
    }),
    endpoints: (builder) => ({
        getBanner: builder.query({
            query: (args) => {
                let { id, currentPage, itemsPerPage, role, search, sortBy, to, from } = args

                if (id) {
                    return `all/${id}`
                }

                return `all?page=${currentPage}&rowsPerPage=${itemsPerPage}&role=${role}${(search && search !== '') ? `&search=${search}` : ``}${(sortBy && sortBy !== '') ? `&sortBy=${sortBy}` : ``}${(from && from !== '') ? `&from=${from}` : ``}${(to && to !== '') ? `&to=${to}` : ``}`
            },
            keepUnusedDataFor: 0
        }),
        addBanner: builder.mutation({
            query: (payload) => ({
                url: 'create',
                method: 'POST',
                body: payload
            })
        }),
        // updateBrand: builder.mutation({
        //     query: (args) => {

        //         let { id, payload } = args
        //         let url = `update/${id}`

        //         if (!id) {
        //             url = 'update'
        //         }

        //         return ({
        //             url,
        //             method: 'PUT',
        //             body: payload
        //         })

        //     }
        // }),
        deleteBanner: builder.mutation({
            query: (payload) => ({
                url: `delete/${payload.id}`,
                method: 'DELETE'
            })
        }),
    })
})

export const {
    useAddBannerMutation,
    useGetBannerQuery,
    useDeleteBannerMutation
} = bannerApiService