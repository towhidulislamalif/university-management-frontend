import {
  IAssignTeacher,
  ICourse,
  IOfferingCourse,
  ISemester,
  ReduxRes,
} from '../../../types';
import { baseApi } from '../../api/baseApi';

// Create a courseManagementApi by extending the baseApi
const courseManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Define a query endpoint to get courses
    getCourses: builder.query({
      query: () => ({
        url: '/courses',
        method: 'GET',
      }),
      transformResponse: (response: ReduxRes<ICourse[]>) => ({
        meta: response.meta,
        data: response.data,
      }),
      providesTags: ['course'],
    }),
    // Define a mutation endpoint to create a new course
    createCourse: builder.mutation({
      query: (data) => ({
        url: '/courses/create-course',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['course'],
    }),
    // Define a query endpoint to get assigned teachers for a course
    getAssignedTeacher: builder.query({
      query: (id) => ({
        url: `/courses/${id}/get-faculties`,
        method: 'GET',
      }),
      transformResponse: (response: ReduxRes<IAssignTeacher>) => ({
        meta: response.meta,
        data: response.data,
      }),
      providesTags: ['course'],
    }),
    // Define a mutation endpoint to assign teachers to a course
    createCourseTeacher: builder.mutation({
      query: (args) => ({
        url: `/courses/${args.id}/assign-faculties`,
        method: 'PUT',
        body: args.data,
      }),
      invalidatesTags: ['course'],
    }),
    // Define a query endpoint to get semesters
    getSemester: builder.query({
      query: () => ({
        url: '/semester-registrations',
        method: 'GET',
      }),
      transformResponse: (response: ReduxRes<ISemester[]>) => ({
        meta: response.meta,
        data: response.data,
      }),
      providesTags: ['semester'],
    }),
    // Define a mutation endpoint to create a new semester
    createSemester: builder.mutation({
      query: (data) => ({
        url: '/semester-registrations/create-semester-registration',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['semester'],
    }),
    // Define a mutation endpoint to update semester status
    updateSemesterStatus: builder.mutation({
      query: (args) => ({
        url: `/semester-registrations/${args.id}`,
        method: 'PATCH',
        body: args.data,
      }),
      invalidatesTags: ['semester'],
    }),
    // Define a query endpoint to get offered courses
    getOfferCourse: builder.query({
      query: () => ({
        url: '/offered-courses',
        method: 'GET',
      }),
      transformResponse: (response: ReduxRes<IOfferingCourse[]>) => ({
        meta: response.meta,
        data: response.data,
      }),
      providesTags: ['offering-courses'],
    }),
    // Define a mutation endpoint to create a new offered course
    createOfferCourse: builder.mutation({
      query: (data) => ({
        url: '/offered-courses/create-offered-course',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['offering-courses'],
    }),
  }),
});

export const {
  useGetCoursesQuery,
  useCreateCourseMutation,
  useGetAssignedTeacherQuery,
  useCreateCourseTeacherMutation,
  useGetSemesterQuery,
  useCreateSemesterMutation,
  useUpdateSemesterStatusMutation,
  useGetOfferCourseQuery,
  useCreateOfferCourseMutation,
} = courseManagementApi;
