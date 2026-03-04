import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl = `${process.env.REACT_APP_BASE_URL}/package/`

export const packageApiService = createApi({
    reducerPath: 'packageApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().authSlice.token

            headers.set('Authorization', `Bearer ${token}`)

            return headers
        }
    }),
    endpoints: (builder) => ({
        getPackages: builder.query({
            query: (args) => {
                let { id, currentPage, itemsPerPage, role, search, sortBy, to, from, business, forPublic } = args || {}

                if (id) {
                    return `get/${id}`
                }

                let url = `get?page=${currentPage || 1}&rowsPerPage=${itemsPerPage || 10}&role=${role || ''}`
                if (search && search !== '') url += `&search=${search}`
                if (sortBy && sortBy !== '') url += `&sortBy=${sortBy}`
                if (business && business !== '') url += `&business=${business}`
                if (from && from !== '') url += `&from=${from}`
                if (to && to !== '') url += `&to=${to}`
                if (forPublic) url += `&forPublic=1`
                return url
            },
            keepUnusedDataFor: 0
        }),
        createPackage: builder.mutation({
            query: (body) => ({
                url: 'create',
                method: 'POST',
                body
            })
        }),
        deletePackage: builder.mutation({
            query: (id) => ({
                url: `delete/${id}`,
                method: 'DELETE'
            })
        })
    })
})

export const {
    useGetPackagesQuery,
    useCreatePackageMutation,
    useDeletePackageMutation,
} = packageApiService