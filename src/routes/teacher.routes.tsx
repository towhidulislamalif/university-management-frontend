import MyCourse from '../pages/teacher/MyCourse';
import MyStudent from '../pages/teacher/MyStudent';
import TeacherDashboard from '../pages/teacher/TeacherDashboard';

export const teacher_path = [
  {
    name: 'Dashboard',
    path: 'dashboard',
    element: <TeacherDashboard />,
  },
  {
    name: 'My Courses',
    path: 'courses',
    element: <MyCourse />,
  },
  {
    path: 'courses/:semesterId/:courseId',
    element: <MyStudent />,
  },
];
