import { baseApi } from '../../api/baseApi';

// Create an authApi by extending the baseApi
const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Define a mutation endpoint for user login
    login: builder.mutation({
      query: (data) => ({
        url: '/auth/login',
        method: 'POST',
        body: data,
      }),
    }),
    // Define a mutation endpoint to change password
    changePassword: builder.mutation({
      query: (data) => ({
        url: '/auth/change-password',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation, useChangePasswordMutation } = authApi;
