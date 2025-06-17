import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { login } from "../authSlice"; // ✅ CORRECT path

const USER_API = "http://localhost:8080/api/v1/user/";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: USER_API, credentials: "include" }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (userData) => ({
        url: "login",
        method: "POST",
        body: userData,
      }),
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "logout",
        method: "GET",
      }),
    }),
    registerUser: builder.mutation({
      query: (userData) => ({
        url: "register",
        method: "POST",
        body: userData,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          dispatch(login({ user: result.data.user }));
        } catch (error) {
          console.error("Register error:", error);
        }
      },
    }),
    loadUser: builder.query({
      query: () => ({
        url: "profile",
        method: "GET",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          dispatch(login({ user: result.data.user }));
        } catch (error) {
          console.error("Register error:", error);
        }
      },
    }),
    // updateUser: builder.mutation({
    //   query: (formData) => ({
    //     url: "profile/update",
    //     method: "PUT",
    //     body: formData,
    //     credentials: "include"
    //   }),
    // }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useLoadUserQuery,
  useLogoutUserMutation,
  // useUpdateUserMutation
} = authApi;
