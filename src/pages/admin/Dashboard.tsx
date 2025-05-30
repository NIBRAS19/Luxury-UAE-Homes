
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Building2, Users, Home, MessageSquare } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from "@/integrations/supabase/client";

interface DashboardStats {
  totalProperties: number;
  totalAgents: number;
  totalInquiries: number;
  featuredProperties: number;
}

interface PropertyTypeData {
  name: string;
  count: number;
}

const Dashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    totalProperties: 0,
    totalAgents: 0,
    totalInquiries: 0,
    featuredProperties: 0
  });
  const [propertyTypes, setPropertyTypes] = useState<PropertyTypeData[]>([]);
  
  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        // Fetch property count
        const { count: propertiesCount } = await supabase
          .from('properties')
          .select('*', { count: 'exact', head: true });
          
        // Fetch featured properties count  
        const { count: featuredCount } = await supabase
          .from('properties')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'featured');
          
        // Fetch agents count  
        const { count: agentsCount } = await supabase
          .from('agents')
          .select('*', { count: 'exact', head: true });
          
        // Fetch inquiries count  
        const { count: inquiriesCount } = await supabase
          .from('inquiries')
          .select('*', { count: 'exact', head: true });
          
        // Fetch property types distribution
        const { data: propertyTypesData } = await supabase
          .from('properties')
          .select('property_type');
          
        // Process property types for chart
        const typeCount: Record<string, number> = {};
        propertyTypesData?.forEach(item => {
          const type = item.property_type;
          typeCount[type] = (typeCount[type] || 0) + 1;
        });
        
        const chartData = Object.keys(typeCount).map(type => ({
          name: type,
          count: typeCount[type]
        }));
        
        setStats({
          totalProperties: propertiesCount || 0,
          totalAgents: agentsCount || 0,
          totalInquiries: inquiriesCount || 0,
          featuredProperties: featuredCount || 0
        });
        
        setPropertyTypes(chartData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const statCards = [
    { 
      title: 'Total Properties', 
      value: stats.totalProperties, 
      description: 'Available properties', 
      icon: <Building2 className="h-6 w-6 text-blue-500" />,
      color: 'bg-blue-50 text-blue-500 ring-blue-500/10'
    },
    { 
      title: 'Total Agents', 
      value: stats.totalAgents, 
      description: 'Active real estate agents', 
      icon: <Users className="h-6 w-6 text-emerald-500" />,
      color: 'bg-emerald-50 text-emerald-500 ring-emerald-500/10'
    },
    { 
      title: 'Featured Properties', 
      value: stats.featuredProperties, 
      description: 'Currently featured listings', 
      icon: <Home className="h-6 w-6 text-gold" />,
      color: 'bg-amber-50 text-gold ring-amber-500/10'
    },
    { 
      title: 'Inquiries', 
      value: stats.totalInquiries, 
      description: 'Client inquiries received', 
      icon: <MessageSquare className="h-6 w-6 text-purple-500" />,
      color: 'bg-purple-50 text-purple-500 ring-purple-500/10'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>
      
      {/* Stats Grid */}
      <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  {stat.title}
                </CardTitle>
                <div className={`rounded-full p-2 ${stat.color}`}>
                  {stat.icon}
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{loading ? "-" : stat.value}</div>
                <p className="text-sm text-gray-500 mt-1">{stat.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Property Types Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Property Distribution by Type</CardTitle>
            <CardDescription>
              Breakdown of property inventory by category
            </CardDescription>
          </CardHeader>
          <CardContent className="px-0">
            <div className="h-[300px] w-full">
              {loading ? (
                <div className="flex justify-center items-center h-full">
                  <p>Loading chart data...</p>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={propertyTypes}
                    margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis 
                      dataKey="name" 
                      tick={{ fontSize: 12 }} 
                      tickLine={false}
                      angle={-45}
                      textAnchor="end"
                      height={60}
                    />
                    <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                    <Tooltip />
                    <Bar dataKey="count" fill="#FBB040" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Dashboard;
