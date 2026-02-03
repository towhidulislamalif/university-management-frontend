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

const Login = () => {
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();

  const defaultLogin = {
    id: 'A-0001',
    password: 'admin123',
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

        {/* Form Container */}
        <FormWrapper onSubmit={onSubmit} defaultValues={defaultLogin}>
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
