import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Typography } from 'antd';
import FormWrapper from '../../components/ui/form/FormWrapper';
import TextInput from '../../components/ui/form/TextInput';
import { useChangePasswordMutation } from '../../redux/features/auth/authApi';
import { useAppDispatch } from '../../redux/hooks';
import { logout } from '../../redux/features/auth/apiSlice';
import { FieldValues } from 'react-hook-form';
import { IResponse } from '../../types';
import toast from 'react-hot-toast';

const ChangePassword: React.FC = () => {
  const navigate = useNavigate();
  const [changePassword] = useChangePasswordMutation();
  const dispatch = useAppDispatch();

  // Handle form submission
  const onSubmit = async (data: FieldValues) => {
    try {
      const changePasswordInfo = {
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      };

      // Perform change password mutation and handle the response
      const response = (await changePassword(
        changePasswordInfo
      )) as IResponse<any>;
      console.log('🚀 ~ onSubmit ~ response:', response);

      // Check if password change was successful
      if (response.data.success) {
        // Logout the user after a successful password change
        dispatch(logout());

        // Redirect to the login page
        navigate('/login');
      }

      toast.success('Password change successful');
    } catch (error) {
      toast.error('Failed to change password. Please check your credentials.');
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
          style={{ color: '#374151', marginBottom: '0.5rem' }}
        >
          Change your password
        </Typography.Title>

        {/* Form Container */}
        <FormWrapper onSubmit={onSubmit}>
          <TextInput
            type="text"
            name="oldPassword"
            placeholder="Old Password"
            size="middle"
          />
          <TextInput
            type="text"
            name="newPassword"
            placeholder="New Password"
            size="middle"
          />

          {/* Submit Button */}
          <Form.Item style={{ marginBottom: '1.5rem' }}>
            <Button
              style={{ width: '100%' }}
              type="primary"
              htmlType="submit"
              size="large"
            >
              Submit
            </Button>
          </Form.Item>
        </FormWrapper>
      </div>
    </section>
  );
};

export default ChangePassword;
