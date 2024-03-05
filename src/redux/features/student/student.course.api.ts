import { IOfferedCourseForStudent, ReduxRes } from '../../../types';
import { baseApi } from '../../api/baseApi';

// Create a studentCourseApi by extending the baseApi
const studentCourseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Define a query endpoint to get offered courses for students
    getOfferedCourses: builder.query({
      query: () => ({
        url: '/offered-courses/my-offered-courses',
        method: 'GET',
      }),
      transformResponse: (response: ReduxRes<IOfferedCourseForStudent[]>) => ({
        meta: response.meta,
        data: response.data,
      }),
      providesTags: ['offered-course'],
    }),
    // Define a mutation endpoint to create a new enrollments for students
    enrollCourse: builder.mutation({
      query: (data) => ({
        url: '/enrolled-courses/create-enrolled-course',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['offered-course', 'enrolled-course'],
    }),
    // Define a query endpoint to get enrolled courses
    getEnrolledCourses: builder.query({
      query: () => ({
        url: '/enrolled-courses/my-enrolled-courses',
        method: 'GET',
      }),
      transformResponse: (response: ReduxRes<any>) => ({
        meta: response.meta,
        data: response.data,
      }),
      providesTags: ['enrolled-course'],
    }),
  }),
});

export const {
  useGetOfferedCoursesQuery,
  useEnrollCourseMutation,
  useGetEnrolledCoursesQuery,
} = studentCourseApi;
