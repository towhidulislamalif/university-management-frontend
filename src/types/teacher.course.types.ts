import {
  IAcademicDepartment,
  IAcademicFaculty,
  IAcademicSemester,
  ICourse,
  IOfferingCourse,
  ISemester,
  IStudent,
  ITeacher,
} from '.';

export interface IEnrollCoursesForTeacher {
  _id: string;
  semesterRegistration: ISemester;
  academicSemester: IAcademicSemester;
  academicFaculty: IAcademicFaculty;
  academicDepartment: IAcademicDepartment;
  offeredCourse: IOfferingCourse;
  course: ICourse;
  student: IStudent;
  faculty: ITeacher;
  isEnrolled: boolean;
  courseMarks: CourseMarks;
  grade: string;
  gradePoints: number;
  isCompleted: boolean;
}

export interface CourseMarks {
  classTest1: number;
  midTerm: number;
  classTest2: number;
  finalTerm: number;
}
