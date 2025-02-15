import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import authService from '../services/auth';

const PrivateRoute = ({ element, role }) => {
  const user = authService.getCurrentUser();

  if (!user || (role && user.role !== role)) {
    return <Navigate to={role === 'admin' ? '/admin/login' : '/login'} />;
  }

  return <Outlet />;
};

export default PrivateRoute;
