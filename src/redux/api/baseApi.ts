import {
  BaseQueryApi,
  BaseQueryFn,
  DefinitionType,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import { logout, setUser } from '../features/auth/apiSlice';
import toast from 'react-hot-toast';

// Create a base query configuration with common settings
const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:5000/api/v1',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    // Retrieve the authentication token from the Redux store
    const token = (getState() as RootState).auth.token;

    // Set the authorization header if a token is available
    if (token) {
      headers.set('authorization', `${token}`);
    }

    return headers;
  },
});

// Define a custom base query function for handling authentication and token refresh
const baseQueryToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions);
  // console.log('🚀 ~ >= ~ result:', result);

  // Handle specific error statuses
  if (result.error?.status === 403 || result.error?.status === 404) {
    toast.error((result.error.data as Error)?.message);
  }

  if (result.error?.status === 401) {
    // Attempt to refresh the authentication token
    const res = await fetch('http://localhost:5000/api/v1/auth/refresh-token', {
      method: 'POST',
      credentials: 'include',
    });

    const data = await res.json();

    if (data.data?.accessToken) {
      // Update the user's token in the Redux store
      const user = (api.getState() as RootState).auth.user;
      api.dispatch(
        setUser({
          user,
          token: data.data?.accessToken,
        })
      );

      // Retry the original query with the updated token
      result = await baseQuery(args, api, extraOptions);
    } else {
      // If token refresh fails, log the user out
      api.dispatch(logout());
    }
  }

  return result;
};

// Create the API using createApi from the toolkit
export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryToken,
  endpoints: () => ({}),
  tagTypes: [
    'admin',
    'teacher',
    'student',
    'academic-semester',
    'academic-department',
    'academic-faculty',
    'course',
    'semester',
    'offering-courses',
    'offered-course',
    'enrolled-course',
    'update-mark',
  ],
});
