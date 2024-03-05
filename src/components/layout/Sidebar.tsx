import { Layout, Menu } from 'antd';
import { userRole } from '../../constants';
import { generateSidebar } from '../../utilities/generateSidebar';
import { admin_path } from '../../routes/admin.routes';
import { teacher_path } from '../../routes/teacher.routes';
import { student_path } from '../../routes/student.routes';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  IUser,
  logout,
  useCurrentToken,
} from '../../redux/features/auth/apiSlice';
import { Link, Navigate } from 'react-router-dom';
import { tokenVerify } from '../../utilities/tokenVerify';

const { Sider } = Layout;

const Sidebar = () => {
  const token = useAppSelector(useCurrentToken);
  const dispatch = useAppDispatch();

  // Redirect to login if no token is available
  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }

  let user;
  try {
    user = tokenVerify(token);
  } catch (error) {
    console.error('Token verification error:', error);
    dispatch(logout());
    return <Navigate to="/login" replace={true} />;
  }

  let sidebar;
  switch ((user as IUser)?.role) {
    case userRole.ADMIN:
      sidebar = generateSidebar(admin_path, userRole.ADMIN);
      break;
    case userRole.TEACHER:
      sidebar = generateSidebar(teacher_path, userRole.TEACHER);
      break;
    case userRole.STUDENT:
      sidebar = generateSidebar(student_path, userRole.STUDENT);
      break;

    default:
      break;
  }

  return (
    <Sider breakpoint="lg" collapsedWidth="0">
      <div
        style={{
          fontSize: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem 0',
        }}
      >
        <Link to={`/${(user as IUser).role}/dashboard`}>
          <span style={{ color: '#fff' }}>Edu Hub</span>
        </Link>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['4']}
        items={sidebar}
      />
    </Sider>
  );
};

export default Sidebar;
