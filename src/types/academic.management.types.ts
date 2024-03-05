export interface IAcademicSemester {
  _id: string;
  name: string;
  year: string;
  code: string;
  startMonth: string;
  endMonth: string;
  createdAt: string;
  updatedAt: string;
}

export interface IAcademicDepartment {
  _id: string;
  name: string;
  academicFaculty: IAcademicFaculty;
  createdAt: string;
  updatedAt: string;
}

export interface IAcademicFaculty {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
