import {
  IAcademicDepartment,
  IAcademicFaculty,
  IAcademicSemester,
  IParams,
  ReduxRes,
} from '../../../types';
import { baseApi } from '../../api/baseApi';

// Create an academicManagementApi by extending the baseApi
const academicManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Define a query endpoint to get academic faculty
    getAcademicFaculty: builder.query({
      query: () => ({
        url: '/academic-faculties',
        method: 'GET',
      }),
      transformResponse: (response: ReduxRes<IAcademicFaculty[]>) => {
        return {
          meta: response.meta,
          data: response.data,
        };
      },
      providesTags: ['academic-faculty'],
    }),
    // Define a mutation endpoint to post academic faculty
    createAcademicFaculty: builder.mutation({
      query: (data) => ({
        url: '/academic-faculties/create-academic-faculty',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['academic-faculty'],
    }),
    // Define a mutation endpoint to patch academic faculty
    updateAcademicFaculty: builder.mutation({
      query: (args) => ({
        url: `/academic-faculties/${args.id}`,
        method: 'PATCH',
        body: args.data,
      }),
      invalidatesTags: ['academic-faculty'],
    }),
    // Define a query endpoint to get academic department
    getAcademicDepartment: builder.query({
      query: () => ({
        url: '/academic-departments',
        method: 'GET',
      }),
      transformResponse: (response: ReduxRes<IAcademicDepartment[]>) => {
        return {
          meta: response.meta,
          data: response.data,
        };
      },
      providesTags: ['academic-department'],
    }),
    // Define a mutation endpoint to post academic department
    createAcademicDepartment: builder.mutation({
      query: (data) => ({
        url: '/academic-departments/create-academic-department',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['academic-department'],
    }),
    // Define a mutation endpoint to patch academic department
    updateAcademicDepartment: builder.mutation({
      query: (args) => ({
        url: `/academic-departments/${args.id}`,
        method: 'PATCH',
        body: args.data,
      }),
      invalidatesTags: ['academic-department'],
    }),
    // Define a query endpoint to get academic semesters
    getAcademicSemester: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: IParams) => {
            params.append(item.name, item.value);
          });
        }

        return {
          url: '/academic-semesters',
          method: 'GET',
          params,
        };
      },
      transformResponse: (response: ReduxRes<IAcademicSemester[]>) => {
        return {
          meta: response.meta,
          data: response.data,
        };
      },
      providesTags: ['academic-semester'],
    }),
    // Define a mutation endpoint to post academic semesters
    createAcademicSemester: builder.mutation({
      query: (data) => ({
        url: 'academic-semesters/create-academic-semester',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['academic-semester'],
    }),
  }),
});

// Extract the generated hooks for various academic queries and mutations
export const {
  useGetAcademicFacultyQuery,
  useCreateAcademicFacultyMutation,
  useUpdateAcademicFacultyMutation,
  useGetAcademicDepartmentQuery,
  useCreateAcademicDepartmentMutation,
  useUpdateAcademicDepartmentMutation,
  useGetAcademicSemesterQuery,
  useCreateAcademicSemesterMutation,
} = academicManagementApi;
