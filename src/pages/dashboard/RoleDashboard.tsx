
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import UserDashboard from './UserDashboard';
import AgentDashboard from './AgentDashboard';
import AdminDashboard from './AdminDashboard';
import SuperAdminDashboard from './SuperAdminDashboard';
import { Button } from '@/components/ui/button';
import PageLayout from '@/components/layout/PageLayout';

const RoleDashboard = () => {
  const { user, isSuperAdmin, isAdmin, isAgent, userRoles, loading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-deep-blue"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (isSuperAdmin) {
    return <SuperAdminDashboard />;
  }
  
  if (isAdmin) {
    return <AdminDashboard />;
  }
  
  if (isAgent) {
    return <AgentDashboard />;
  }
  
  return <UserDashboard />;
};

export default RoleDashboard;
