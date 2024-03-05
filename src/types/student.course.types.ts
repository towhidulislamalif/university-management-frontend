import {
  IAcademicDepartment,
  IAcademicFaculty,
  IAcademicSemester,
  ICourse,
  ISemester,
  ITeacher,
} from '.';

export interface IOfferedCourseForStudent {
  _id: string;
  semesterRegistration: ISemester;
  academicSemester: IAcademicSemester;
  academicFaculty: IAcademicFaculty;
  academicDepartment: IAcademicDepartment;
  course: ICourse;
  faculty: ITeacher;
  maxCapacity: number;
  section: number;
  days: string[];
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  enrolledCourses: any[];
  completedCourses: any[];
  completedCourseIds: any[];
  isPreRequisitesFulFilled: boolean;
  isAlreadyEnrolled: boolean;
}

export interface IEnrolledCourse {
  semesterRegistration: string;
  academicSemester: string;
  academicFaculty: string;
  academicDepartment: string;
  offeredCourse: string;
  course: string;
  student: string;
  faculty: string;
  isEnrolled: boolean;
  courseMarks: CourseMarks;
  grade: string;
  gradePoints: number;
  isCompleted: boolean;
  _id: string;
  __v: number;
}

interface CourseMarks {
  classTest1: number;
  midTerm: number;
  classTest2: number;
  finalTerm: number;
}
