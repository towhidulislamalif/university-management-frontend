import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { generateRoutes } from '../utilities/generateRoutes';
import { admin_path } from './admin.routes';
import { teacher_path } from './teacher.routes';
import { student_path } from './student.routes';
import Protected from './Protected';
import Login from '../pages/shared/Login';
import ChangePassword from '../pages/shared/ChangePassword';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/admin',
    element: (
      <Protected role="admin">
        <App />
      </Protected>
    ),
    children: generateRoutes(admin_path),
  },
  {
    path: '/faculty',
    element: (
      <Protected role="faculty">
        <App />
      </Protected>
    ),
    children: generateRoutes(teacher_path),
  },
  {
    path: '/student',
    element: (
      <Protected role="student">
        <App />
      </Protected>
    ),
    children: generateRoutes(student_path),
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/change-password',
    element: <ChangePassword />,
  },
]);

export default router;
