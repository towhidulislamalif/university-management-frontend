import { IEnrollCoursesForTeacher, IParams, ReduxRes } from '../../../types';
import { baseApi } from '../../api/baseApi';

// Create a teacherCourseApi by extending the baseApi
const teacherCourseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Define a query endpoint to get enrolled courses for teacher
    getEnrolledCoursesForTeacher: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: IParams) => {
            params.append(item.name, item.value);
          });
        }

        return {
          url: '/enrolled-courses',
          method: 'GET',
          params: params,
        };
      },
      transformResponse: (response: ReduxRes<IEnrollCoursesForTeacher[]>) => ({
        meta: response.meta,
        data: response.data,
      }),
    }),
    // Define a mutation endpoint to update student assignment marks
    updateMarks: builder.mutation({
      query: (data) => ({
        url: '/enrolled-courses/update-enrolled-course-marks',
        method: 'PATCH',
        body: data,
      }),
    }),
  }),
});

export const { useGetEnrolledCoursesForTeacherQuery, useUpdateMarksMutation } =
  teacherCourseApi;
