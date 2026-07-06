import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const settingsApi = createApi({
  reducerPath: "settingsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}settings`,
    prepareHeaders: (headers) => {
      const authSlice = JSON.parse(localStorage.getItem("persist:jetjams-admin"));
      if (authSlice && authSlice.authSlice) {
        const auth = JSON.parse(authSlice.authSlice);
        if (auth.token) {
          headers.set("authorization", `Bearer ${auth.token}`);
        }
      }
      return headers;
    },
  }),
  tagTypes: ["Settings"],
  endpoints: (builder) => ({
    getSettings: builder.query({
      query: () => "/",
      providesTags: ["Settings"],
    }),
    updateSettings: builder.mutation({
      query: (body) => ({
        url: "/",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Settings"],
    }),
  }),
});

export const { useGetSettingsQuery, useUpdateSettingsMutation } = settingsApi;
