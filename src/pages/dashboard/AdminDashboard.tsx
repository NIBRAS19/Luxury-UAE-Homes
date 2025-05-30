
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { Users, Building, Settings, FileText, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

// Mock data for charts
const propertyData = [
  { type: 'Apartment', count: 12 },
  { type: 'Villa', count: 8 },
  { type: 'Penthouse', count: 5 },
  { type: 'Commercial', count: 7 },
  { type: 'Off-Plan', count: 10 },
];

const inquiryStatusData = [
  { name: 'New', value: 15, color: '#3b82f6' },
  { name: 'In Progress', value: 10, color: '#f59e0b' },
  { name: 'Resolved', value: 25, color: '#10b981' },
];

const AdminDashboard = () => {
  const { user, isAdmin, isSuperAdmin } = useAuth();
  const navigate = useNavigate();

  // Redirect if user is not an admin or superadmin
  useEffect(() => {
    if (!isAdmin && !isSuperAdmin) {
      navigate('/');
    }
  }, [isAdmin, isSuperAdmin, navigate]);

  return (
    <DashboardLayout title="Admin Dashboard" userType="admin">
      <div className="flex mb-6">
        <div className="ml-auto space-x-2">
          <Button variant="outline" onClick={() => navigate('/admin/properties')}>
            <Building className="mr-2" /> Manage Properties
          </Button>
          <Button onClick={() => navigate('/admin/agent-dashboard')}>
            <Users className="mr-2" /> Manage Agents
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total Properties</CardTitle>
            <CardDescription>All property listings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold flex items-center">
              <Building className="mr-2 text-blue-500" />
              42
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total Agents</CardTitle>
            <CardDescription>Active agents</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold flex items-center">
              <Users className="mr-2 text-green-500" />
              15
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Pending Approvals</CardTitle>
            <CardDescription>Items needing review</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold flex items-center">
              <Clock className="mr-2 text-amber-500" />
              7
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>System Alerts</CardTitle>
            <CardDescription>Issues requiring attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold flex items-center">
              <AlertTriangle className="mr-2 text-red-500" />
              2
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Properties by Type</CardTitle>
            <CardDescription>Distribution across categories</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={propertyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Inquiry Status</CardTitle>
            <CardDescription>Current distribution</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={inquiryStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={90}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {inquiryStatusData.map((entry, index) => (
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
            <CardTitle>System Status</CardTitle>
            <CardDescription>Platform health overview</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span>Database Connection</span>
              </div>
              <span className="text-green-500">Operational</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span>Authentication Services</span>
              </div>
              <span className="text-green-500">Operational</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span>Storage Services</span>
              </div>
              <span className="text-green-500">Operational</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
                <span>Notification System</span>
              </div>
              <span className="text-amber-500">Degraded</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
