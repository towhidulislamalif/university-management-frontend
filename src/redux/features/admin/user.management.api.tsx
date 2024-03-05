import { IAdmin, IParams, IStudent, ITeacher, ReduxRes } from '../../../types';
import { baseApi } from '../../api/baseApi';

// Create a userManagementApi by extending the baseApi
const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Define a query endpoint to get admins
    getAdmins: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: IParams) => {
            params.append(item.name, item.value);
          });
        }

        return {
          url: '/admins',
          method: 'GET',
          params: params,
        };
      },
      transformResponse: (response: ReduxRes<IAdmin[]>) => ({
        meta: response.meta,
        data: response.data,
      }),
      providesTags: ['admin'],
    }),
    // Define a mutation endpoint to create a new admin
    createAdmin: builder.mutation({
      query: (data) => ({
        url: 'users/create-admin',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['admin'],
    }),

    // Define a query endpoint to get teachers
    getTeachers: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: IParams) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: '/faculties',
          method: 'GET',
          params: params,
        };
      },
      transformResponse: (response: ReduxRes<ITeacher[]>) => ({
        meta: response.meta,
        data: response.data,
      }),
      providesTags: ['teacher'],
    }),
    // Define a query endpoint to get specific teacher
    getTeacher: builder.query({
      query: (id) => ({
        url: `/faculties/${id}`,
        method: 'GET',
      }),
      transformResponse: (response: ReduxRes<ITeacher>) => ({
        data: response.data,
      }),
      providesTags: ['teacher'],
    }),
    // Define a mutation endpoint to create a new teacher
    createTeacher: builder.mutation({
      query: (data) => ({
        url: '/users/create-faculty',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['teacher'],
    }),
    // Define a mutation endpoint to update a teacher
    updateTeacher: builder.mutation({
      query: (args) => ({
        url: `/faculties/${args.id}`,
        method: 'PATCH',
        body: args.data,
      }),
      invalidatesTags: ['teacher'],
    }),

    // Define a query endpoint to get students
    getStudents: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: IParams) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: '/students',
          method: 'GET',
          params: params,
        };
      },
      transformResponse: (response: ReduxRes<IStudent[]>) => ({
        meta: response.meta,
        data: response.data,
      }),
      providesTags: ['student'],
    }),
    // Define a query endpoint to get specific student
    getStudent: builder.query({
      query: (id) => ({
        url: `/students/${id}`,
        method: 'GET',
      }),
      transformResponse: (response: ReduxRes<IStudent>) => ({
        data: response.data,
      }),
      providesTags: ['student'],
    }),
    // Define a mutation endpoint to create a new student
    createStudent: builder.mutation({
      query: (data) => ({
        url: '/users/create-student',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['student'],
    }),
    // Define a mutation endpoint to update a student
    updateStudent: builder.mutation({
      query: (args) => ({
        url: `/students/${args.id}`,
        method: 'PATCH',
        body: args.data,
      }),
      invalidatesTags: ['student'],
    }),
  }),
});

export const {
  useGetAdminsQuery,
  useCreateAdminMutation,
  useGetTeachersQuery,
  useGetTeacherQuery,
  useCreateTeacherMutation,
  useUpdateTeacherMutation,
  useGetStudentsQuery,
  useGetStudentQuery,
  useCreateStudentMutation,
  useUpdateStudentMutation,
} = userManagementApi;
