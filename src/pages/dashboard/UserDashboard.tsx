
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthContext';
import { Heart, Home, Search, Bell } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

const UserDashboard = () => {
  const { user, isAdmin, isAgent } = useAuth();
  const navigate = useNavigate();

  // Redirect if user is not a regular user
  useEffect(() => {
    if (isAdmin || isAgent) {
      navigate('/admin');
    }
  }, [isAdmin, isAgent, navigate]);

  return (
    <DashboardLayout title="User Dashboard" userType="user">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Saved Properties</CardTitle>
            <CardDescription>Properties you've saved</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold flex items-center">
              <Heart className="mr-2 text-rose-500" />
              0
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Recent Searches</CardTitle>
            <CardDescription>Your search history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold flex items-center">
              <Search className="mr-2 text-blue-500" />
              0
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Property Alerts</CardTitle>
            <CardDescription>Your active notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold flex items-center">
              <Bell className="mr-2 text-amber-500" />
              0
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Browse Properties</CardTitle>
            <CardDescription>Discover new listings</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate('/properties')} className="w-full">
              <Home className="mr-2" /> Browse Now
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recommended Properties</CardTitle>
            <CardDescription>Based on your preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center h-64 text-gray-400">
              <Search className="h-12 w-12 mb-2" />
              <p>No recommendations yet. Start browsing properties to get personalized recommendations.</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Profile Settings</CardTitle>
            <CardDescription>Manage your account</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Button variant="outline" className="w-full justify-start">
              Personal Information
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Preferences
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Notifications
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Privacy Settings
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default UserDashboard;
