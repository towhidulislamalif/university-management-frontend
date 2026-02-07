import { Button, Checkbox, Form, Typography } from 'antd';
import { IUser, setUser } from '../../redux/features/auth/apiSlice';
import { useLoginMutation } from '../../redux/features/auth/authApi';
import { useAppDispatch } from '../../redux/hooks';
import FormWrapper from '../../components/ui/form/FormWrapper';
import { FieldValues } from 'react-hook-form';
import TextInput from '../../components/ui/form/TextInput';
import { Link, useNavigate } from 'react-router-dom';
import { tokenVerify } from '../../utilities/tokenVerify';
import toast from 'react-hot-toast';
import { useState } from 'react';

const Login = () => {
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const [selectedRole, setSelectedRole] = useState<string>('admin');

  // Role-based credentials
  const roleCredentials = {
    admin: {
      id: 'A-0001',
      password: 'admin123',
    },
    faculty: {
      id: 'F-0001',
      password: 'teacher123',
    },
    student: {
      id: '2025030001',
      password: 'student123',
    },
  };

  const defaultLogin =
    roleCredentials[selectedRole as keyof typeof roleCredentials];

  // Handle role button click
  const handleRoleClick = (role: string) => {
    setSelectedRole(role);
  };

  // Handle form submission
  const onSubmit = async (data: FieldValues) => {
    console.log('🚀 ~ onSubmit ~ data:', data);
    try {
      const userLoginInfo = {
        id: data.id,
        password: data.password,
      };

      // Perform login mutation and handle the response
      const response = await login(userLoginInfo).unwrap();
      const user = tokenVerify(response.data.accessToken) as IUser;

      // Dispatch user information to Redux store
      dispatch(setUser({ user, token: response.data.accessToken }));

      // Redirect based on whether password change is needed
      if (response.data.needsPasswordChange) {
        navigate('/change-password');
      } else {
        navigate(`/${user.role}/dashboard`);
      }

      toast.success('Login successful');
    } catch (error) {
      toast.error('Failed to login. Please check your credentials.');
    }
  };

  return (
    <section
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 24px',
      }}
    >
      <div style={{ maxWidth: '400px', width: '100%', padding: '24px' }}>
        {/* Title and Description */}
        <Typography.Title
          level={3}
          style={{ color: '#374151', marginBottom: '1rem' }}
        >
          Log in to your account
        </Typography.Title>

        {/* Quick Login Demo Credentials */}
        <div
          style={{
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '1.5rem',
          }}
        >
          <Typography.Text
            style={{
              display: 'block',
              fontSize: '13px',
              color: '#64748b',
              marginBottom: '12px',
              fontWeight: 500,
            }}
          >
            Try demo credentials - Click to auto-fill
          </Typography.Text>
          <div style={{ display: 'flex', gap: '8px', flexDirection: 'column' }}>
            <Button
              size="small"
              onClick={() => handleRoleClick('admin')}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                height: 'auto',
                padding: '10px 12px',
                background: selectedRole === 'admin' ? '#eff6ff' : 'white',
                border:
                  selectedRole === 'admin'
                    ? '2px solid #2563eb'
                    : '1px solid #cbd5e1',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
            >
              <span style={{ fontWeight: 600, color: '#1e293b' }}>Admin</span>
              <span style={{ fontSize: '11px', color: '#64748b' }}>
                Full system access & management
              </span>
            </Button>
            <Button
              size="small"
              onClick={() => handleRoleClick('faculty')}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                height: 'auto',
                padding: '10px 12px',
                background: selectedRole === 'faculty' ? '#eff6ff' : 'white',
                border:
                  selectedRole === 'faculty'
                    ? '2px solid #2563eb'
                    : '1px solid #cbd5e1',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
            >
              <span style={{ fontWeight: 600, color: '#1e293b' }}>Faculty</span>
              <span style={{ fontSize: '11px', color: '#64748b' }}>
                Manage courses & student records
              </span>
            </Button>
            <Button
              size="small"
              onClick={() => handleRoleClick('student')}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                height: 'auto',
                padding: '10px 12px',
                background: selectedRole === 'student' ? '#eff6ff' : 'white',
                border:
                  selectedRole === 'student'
                    ? '2px solid #2563eb'
                    : '1px solid #cbd5e1',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
            >
              <span style={{ fontWeight: 600, color: '#1e293b' }}>Student</span>
              <span style={{ fontSize: '11px', color: '#64748b' }}>
                View grades & enrollment info
              </span>
            </Button>
          </div>
        </div>

        {/* Form Container */}
        <FormWrapper
          onSubmit={onSubmit}
          defaultValues={defaultLogin}
          key={selectedRole}
        >
          {/* User identity input */}
          <TextInput
            type="text"
            name="id"
            placeholder="User identity"
            size="large"
          />

          {/* Password input */}
          <TextInput
            type="password"
            name="password"
            placeholder="Password"
            size="large"
          />

          {/* Remember me and Forgot password */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1rem',
            }}
          >
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Link to="#" style={{ fontSize: '0.875rem', color: '#2563eb' }}>
              Forgot password?
            </Link>
          </div>

          {/* Log in Button */}
          <Form.Item style={{ marginBottom: '1.5rem' }}>
            <Button type="primary" htmlType="submit" size="large" block>
              Sign in
            </Button>
          </Form.Item>
        </FormWrapper>
      </div>
    </section>
  );
};

export default Login;
