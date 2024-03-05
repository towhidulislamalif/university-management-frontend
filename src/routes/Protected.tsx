import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  IUser,
  logout,
  useCurrentToken,
} from '../redux/features/auth/apiSlice';
import { tokenVerify } from '../utilities/tokenVerify';

interface ProtectedProps {
  children: React.ReactNode;
  role: string;
}

const Protected = ({ children, role }: ProtectedProps) => {
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

  // Redirect to login if the user's role doesn't match the required role
  if ((user as IUser)?.role !== role) {
    dispatch(logout());
    return <Navigate to="/login" replace={true} />;
  }

  // Render the protected content if the user is authenticated and has the correct role
  return <>{children}</>;
};

export default Protected;
