
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthContext';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, PieChart, Pie, Cell, Legend 
} from 'recharts';
import { 
  Users, 
  Building, 
  Settings, 
  Shield, 
  AlertTriangle, 
  CheckCircle,
  Database,
  Server,
  Activity,
  UserPlus
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

// Mock data for charts
const userRoleData = [
  { name: 'Users', value: 65, color: '#3b82f6' },
  { name: 'Agents', value: 15, color: '#f59e0b' },
  { name: 'Admins', value: 8, color: '#10b981' },
  { name: 'SuperAdmins', value: 2, color: '#ef4444' },
];

const systemUsageData = [
  { name: 'Jan', database: 40, storage: 24, api: 60 },
  { name: 'Feb', database: 45, storage: 28, api: 62 },
  { name: 'Mar', database: 50, storage: 32, api: 65 },
  { name: 'Apr', database: 55, storage: 35, api: 68 },
  { name: 'May', database: 60, storage: 40, api: 70 },
  { name: 'Jun', database: 65, storage: 45, api: 72 },
];

const SuperAdminDashboard = () => {
  const { user, isSuperAdmin } = useAuth();
  const navigate = useNavigate();
  const [userCount, setUserCount] = useState({ total: 0, newToday: 0 });

  // Redirect if user is not a superadmin
  useEffect(() => {
    if (!isSuperAdmin) {
      navigate('/');
    } else {
      fetchUserStats();
    }
  }, [isSuperAdmin, navigate]);

  const fetchUserStats = async () => {
    try {
      // This is a placeholder since we can't directly query auth.users
      // In a real app, you would have a secure backend endpoint for this data
      setUserCount({
        total: 90,
        newToday: 3
      });
    } catch (error) {
      console.error('Error fetching user stats:', error);
    }
  };

  return (
    <DashboardLayout title="Super Admin Dashboard" userType="superadmin">
      <div className="flex items-center mb-6">
        <h3 className="text-xl font-semibold">System Overview</h3>
        <div className="ml-auto space-x-2">
          <Button variant="outline" onClick={() => navigate('/admin/system')}>
            <Settings className="mr-2" /> System Settings
          </Button>
          <Button onClick={() => navigate('/admin/users')}>
            <UserPlus className="mr-2" /> Manage Users
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total Users</CardTitle>
            <CardDescription>Registered accounts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold flex items-center">
              <Users className="mr-2 text-blue-500" />
              {userCount.total}
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              +{userCount.newToday} today
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Database Size</CardTitle>
            <CardDescription>Storage usage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold flex items-center">
              <Database className="mr-2 text-green-500" />
              256 MB
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '25%' }}></div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>API Usage</CardTitle>
            <CardDescription>Requests per minute</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold flex items-center">
              <Activity className="mr-2 text-gold" />
              142
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              5% increase from yesterday
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>System Health</CardTitle>
            <CardDescription>Overall status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold flex items-center">
              <CheckCircle className="mr-2 text-green-500" />
              98%
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              All systems operational
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>System Resource Usage</CardTitle>
            <CardDescription>6 month trend</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={systemUsageData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="database" stackId="a" fill="#3b82f6" />
                <Bar dataKey="storage" stackId="a" fill="#10b981" />
                <Bar dataKey="api" stackId="a" fill="#f59e0b" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>User Roles</CardTitle>
            <CardDescription>Distribution</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={userRoleData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={90}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {userRoleData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Security Audit</CardTitle>
            <CardDescription>Latest activity</CardDescription>
          </CardHeader>
          <CardContent className="max-h-80 overflow-auto">
            <div className="space-y-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center">
                  <Shield className="text-green-500 mr-2" />
                  <div>
                    <h4 className="font-medium">Admin login</h4>
                    <p className="text-sm text-muted-foreground">2 minutes ago</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center">
                  <Shield className="text-amber-500 mr-2" />
                  <div>
                    <h4 className="font-medium">Permission changed</h4>
                    <p className="text-sm text-muted-foreground">15 minutes ago</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center">
                  <Shield className="text-red-500 mr-2" />
                  <div>
                    <h4 className="font-medium">Failed login attempt</h4>
                    <p className="text-sm text-muted-foreground">33 minutes ago</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center">
                  <Shield className="text-green-500 mr-2" />
                  <div>
                    <h4 className="font-medium">API key rotated</h4>
                    <p className="text-sm text-muted-foreground">1 hour ago</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Critical Actions</CardTitle>
            <CardDescription>System maintenance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button variant="outline" className="w-full justify-start">
                <Database className="mr-2" /> Backup Database
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Server className="mr-2" /> Clear Cache
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Settings className="mr-2" /> Update System
              </Button>
              <Button variant="destructive" className="w-full justify-start">
                <AlertTriangle className="mr-2" /> Maintenance Mode
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default SuperAdminDashboard;
