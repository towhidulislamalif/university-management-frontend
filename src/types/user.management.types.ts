import { IAcademicDepartment, IAcademicFaculty, IAcademicSemester } from '.';

export interface IAdmin {
  id: string;
  user: string;
  designation: string;
  name: Name;
  gender: string;
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloogGroup: string;
  presentAddress: string;
  permanentAddress: string;
  profileImg: string;
  isDeleted: boolean;
  _id: string;
  __v: number;
  fullName: string;
}

export interface ITeacher {
  _id: string;
  id: string;
  user: User;
  designation: string;
  name: Name;
  gender: string;
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloogGroup: string;
  presentAddress: string;
  permanentAddress: string;
  profileImg: string;
  academicDepartment: IAcademicDepartment;
  academicFaculty: IAcademicFaculty;
  isDeleted: boolean;
  fullName: string;
}

export interface IStudent {
  _id: string;
  id: string;
  user: User;
  name: Name;
  gender: string;
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloogGroup: string;
  presentAddress: string;
  permanentAddress: string;
  guardian: Guardian;
  localGuardian: LocalGuardian;
  profileImg: string;
  admissionSemester: IAcademicSemester;
  isDeleted: boolean;
  academicDepartment: IAcademicDepartment;
  academicFaculty: IAcademicFaculty;
  fullName: string;
}

interface User {
  _id: string;
  id: string;
  email: string;
  needsPasswordChange: boolean;
  role: string;
  status: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Guardian {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
  _id: string;
}

interface LocalGuardian {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
  _id: string;
}

interface Name {
  firstName: string;
  middleName: string;
  lastName: string;
  _id: string;
}
