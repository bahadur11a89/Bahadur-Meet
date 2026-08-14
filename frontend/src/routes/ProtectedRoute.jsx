import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import PageLoader from '../components/common/PageLoader';

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading, loading } = useAuth();
  const location = useLocation();

  if (isLoading || loading) {
    return <PageLoader />;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
};

export default ProtectedRoute;