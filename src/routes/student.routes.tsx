import OfferedCourse from '../pages/student/OfferedCourse';
import Schedule from '../pages/student/Schedule';
import StudentDashboard from '../pages/student/StudentDashboard';

export const student_path = [
  {
    name: 'Dashboard',
    path: 'dashboard',
    element: <StudentDashboard />,
  },
  {
    name: 'Offered Course',
    path: 'offered-course',
    element: <OfferedCourse />,
  },
  {
    name: 'My Schedule',
    path: 'schedule',
    element: <Schedule />,
  },
];
