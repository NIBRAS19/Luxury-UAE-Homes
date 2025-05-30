
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Building, Users, Home, BarChart3, ListFilter, Plus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

const mockData = [
  { month: 'Jan', inquiries: 4 },
  { month: 'Feb', inquiries: 3 },
  { month: 'Mar', inquiries: 5 },
  { month: 'Apr', inquiries: 7 },
  { month: 'May', inquiries: 2 },
  { month: 'Jun', inquiries: 6 },
];

const AgentDashboard = () => {
  const { user, isAgent } = useAuth();
  const navigate = useNavigate();
  const [agentDetails, setAgentDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Redirect if user is not an agent
    if (!isAgent) {
      navigate('/');
    } else {
      loadAgentDetails();
    }
  }, [isAgent, navigate]);

  const loadAgentDetails = async () => {
    try {
      if (user) {
        const { data, error } = await supabase
          .from('agents')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (error) {
          console.error('Error loading agent details:', error);
        } else {
          setAgentDetails(data);
        }
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <DashboardLayout title="Agent Dashboard" userType="agent">
      <div className="flex mb-6">
        <Button onClick={() => navigate('/admin/properties')} className="ml-auto">
          <Plus className="mr-2" /> Add Property
        </Button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>My Properties</CardTitle>
            <CardDescription>Listed properties</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold flex items-center">
              <Building className="mr-2 text-blue-500" />
              0
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Active Clients</CardTitle>
            <CardDescription>Current inquiries</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold flex items-center">
              <Users className="mr-2 text-green-500" />
              0
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Properties Sold</CardTitle>
            <CardDescription>Total sold</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold flex items-center">
              <Home className="mr-2 text-gold" />
              {agentDetails?.properties_sold || 0}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Agent Rating</CardTitle>
            <CardDescription>Client feedback</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {agentDetails?.rating || "N/A"}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Inquiry Activity</CardTitle>
            <CardDescription>Last 6 months</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="inquiries" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/admin/properties')}>
              <ListFilter className="mr-2" /> Manage Properties
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Users className="mr-2" /> Client Inquiries
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/admin/sales-dashboard')}>
              <BarChart3 className="mr-2" /> Sales Analytics
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Building className="mr-2" /> Property Reports
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AgentDashboard;
