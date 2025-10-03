import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = `${process.env.REACT_APP_BASE_URL}/album/`;

export const albumApiService = createApi({
  reducerPath: "albumApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().authSlice.token;

      headers.set("Authorization", `Bearer ${token}`);

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAlbums: builder.query({
      query: (args) => ({
        url: args?.id ? `get/${args?.id}` : "get",
        method: "GET",
        params: args?.id ? {} : args,
      }),
      keepUnusedDataFor: 0,
    }),
    getAllAlbums: builder.query({
      query: () => ({
        url: "get-all-paid-album",
        method: "GET",
      }),
      keepUnusedDataFor: 0,
    }),
    addPaidAlbum: builder.mutation({
      query: (payload) => ({
        url: "create-paid-album",
        method: "POST",
        body: payload,
      }),
    }),
    addAlbum: builder.mutation({
      query: (payload) => ({
        url: "create",
        method: "POST",
        body: payload,
      }),
    }),
    updateAlbum: builder.mutation({
      query: (payload) => ({
        url: `update/${payload?.id}`,
        method: "PUT",
        body: payload,
      }),
    }),
    handleAlbumStatus: builder.mutation({
      query: (id) => ({
        url: `handle-status/${id}`,
        method: "PATCH",
      }),
    }),
    deleteAlbum: builder.mutation({
      query: (id) => ({
        url: `delete/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAlbumsQuery,
  useGetAllAlbumsQuery,
  useAddPaidAlbumMutation,
  useAddAlbumMutation,
  useUpdateAlbumMutation,
  useDeleteAlbumMutation,
  useHandleAlbumStatusMutation,
} = albumApiService;
