import {
  IAcademicDepartment,
  IAcademicFaculty,
  IAcademicSemester,
  ITeacher,
} from '.';

export interface ICourse {
  _id: string;
  title: string;
  prefix: string;
  code: number;
  credits: number;
  isDeleted: boolean;
  preRequisiteCourses: PreRequisiteCourse[];
}

interface PreRequisiteCourse {
  course: string;
  isDeleted: boolean;
}

export interface ISemester {
  _id: string;
  academicSemester: IAcademicSemester;
  status: string;
  startDate: string;
  endDate: string;
  minCredit: number;
  maxCredit: number;
  createdAt: string;
  updatedAt: string;
}

export interface IAssignTeacher {
  _id: string;
  __v: number;
  course: string;
  faculties: ITeacher[];
}

export interface IOfferingCourse {
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
}
