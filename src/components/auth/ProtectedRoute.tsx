
import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  requiredRoles?: ('user' | 'agent' | 'admin' | 'superadmin')[];
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  requiredRoles = [],
  redirectTo = '/auth',
}) => {
  const { user, loading, userRoles } = useAuth();
  const location = useLocation();

  // While checking authentication status, show loading
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-deep-blue"></div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!user) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // If roles are required, check if user has any of the required roles
  if (requiredRoles.length > 0) {
    const hasRequiredRole = requiredRoles.some(role => 
      userRoles.includes(role as any)
    );

    if (!hasRequiredRole) {
      // Redirect to dashboard if authenticated but doesn't have required role
      return <Navigate to="/dashboard" replace />;
    }
  }

  // If authenticated and has required role, render the routes
  return <Outlet />;
};

export default ProtectedRoute;
