import AdminDashboard from '../pages/admin/AdminDashboard';
import AcademicDepartment from '../pages/admin/academic.management/AcademicDepartment';
import AcademicFaculty from '../pages/admin/academic.management/AcademicFaculty';
import AcademicSemester from '../pages/admin/academic.management/AcademicSemester';
import CreateAcademicDepartment from '../pages/admin/academic.management/CreateAcademicDepartment';
import CreateAcademicFaculty from '../pages/admin/academic.management/CreateAcademicFaculty';
import CreateAcademicSemester from '../pages/admin/academic.management/CreateAcademicSemester';
import Courses from '../pages/admin/course.management/Courses';
import CreateCourse from '../pages/admin/course.management/CreateCourse';
import OfferCourse from '../pages/admin/course.management/OfferCourse';
import OfferedCourses from '../pages/admin/course.management/OfferedCourses';
import RegisteredSemester from '../pages/admin/course.management/RegisteredSemester';
import SemesterRegistration from '../pages/admin/course.management/SemesterRegistration';
import Admins from '../pages/admin/user.management/Admins';
import CreateAdmin from '../pages/admin/user.management/CreateAdmin';
import CreateStudent from '../pages/admin/user.management/CreateStudent';
import CreateTeacher from '../pages/admin/user.management/CreateTeacher';
import Students from '../pages/admin/user.management/Students';
import Teachers from '../pages/admin/user.management/Teachers';
import UpdateStudentInfo from '../pages/admin/user.management/UpdateStudentInfo';
import UpdateTeacherInfo from '../pages/admin/user.management/UpdateTeacherInfo';

export const admin_path = [
  {
    name: 'Dashboard',
    path: 'dashboard',
    element: <AdminDashboard />,
  },
  {
    name: 'User Management',
    children: [
      {
        name: 'Admins',
        path: 'admins',
        element: <Admins />,
      },
      {
        name: 'Teachers',
        path: 'teachers',
        element: <Teachers />,
      },
      {
        name: 'Students',
        path: 'students',
        element: <Students />,
      },
      {
        name: 'Create Admin',
        path: 'create-admin',
        element: <CreateAdmin />,
      },
      {
        name: 'Create Teacher',
        path: 'create-teacher',
        element: <CreateTeacher />,
      },
      {
        path: 'update-teacher-info/:id',
        element: <UpdateTeacherInfo />,
      },
      {
        name: 'Create Student',
        path: 'create-student',
        element: <CreateStudent />,
      },
      {
        path: 'update-student-info/:id',
        element: <UpdateStudentInfo />,
      },
    ],
  },
  {
    name: 'Academic Management',
    children: [
      {
        name: 'Academic Faculty',
        path: 'academic-faculty',
        element: <AcademicFaculty />,
      },
      {
        name: 'Academic Department',
        path: 'academic-department',
        element: <AcademicDepartment />,
      },
      {
        name: 'Academic Semester',
        path: 'academic-semester',
        element: <AcademicSemester />,
      },
      {
        name: 'C. Academic Faculty',
        path: 'create-academic-faculty',
        element: <CreateAcademicFaculty />,
      },
      {
        name: 'C. Academic Department',
        path: 'create-academic-department',
        element: <CreateAcademicDepartment />,
      },
      {
        name: 'C. Academic Semester',
        path: 'create-academic-semester',
        element: <CreateAcademicSemester />,
      },
    ],
  },
  {
    name: 'Course Management',
    children: [
      {
        name: 'Courses',
        path: 'courses',
        element: <Courses />,
      },
      {
        name: 'Registered Semester',
        path: 'registered-semester',
        element: <RegisteredSemester />,
      },
      {
        name: 'Offered Courses',
        path: 'offered-courses',
        element: <OfferedCourses />,
      },
      {
        name: 'C. Course',
        path: 'create-course',
        element: <CreateCourse />,
      },
      {
        name: 'Semester Registration',
        path: 'semester-registration',
        element: <SemesterRegistration />,
      },
      {
        name: 'Offer Course',
        path: 'offer-course',
        element: <OfferCourse />,
      },
    ],
  },
];
