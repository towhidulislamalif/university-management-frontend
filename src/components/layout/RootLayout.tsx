import React from 'react';
import { Button, Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useAppDispatch } from '../../redux/hooks';
import { logout } from '../../redux/features/auth/apiSlice';

const { Header, Content } = Layout;

const RootLayout: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar />
      <Layout>
        <Header
          style={{
            background: '#fff',
            textAlign: 'end',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          <Button type="primary" onClick={handleLogout}>
            Logout
          </Button>
        </Header>
        <Content style={{ margin: '24px 16px 0' }}>
          <div
            style={{
              height: '100%',
              background: '#fff',
              borderRadius: 8,
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              padding: 24,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default RootLayout;
