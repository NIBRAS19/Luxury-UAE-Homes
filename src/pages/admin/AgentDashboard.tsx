
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { AlertCircle, Award, TrendingUp, Users } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Agent {
  id: string;
  first_name: string;
  last_name: string;
  properties_sold: number;
  rating: number;
}

interface PerformanceData {
  month: string;
  sales: number;
  leads: number;
}

const AgentDashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [topPerformers, setTopPerformers] = useState<Agent[]>([]);
  const [performanceData, setPerformanceData] = useState<PerformanceData[]>([]);
  const [timeRange, setTimeRange] = useState('6m');
  
  // COLORS for charts
  const COLORS = ['#FBB040', '#004D7F', '#38B2AC', '#9F7AEA', '#ED8936', '#667EEA'];
  
  useEffect(() => {
    const fetchAgentData = async () => {
      setLoading(true);
      try {
        // Fetch all agents
        const { data: agentsData, error: agentsError } = await supabase
          .from('agents')
          .select('*')
          .order('properties_sold', { ascending: false });
          
        if (agentsError) throw agentsError;
        
        setAgents(agentsData || []);
        setTopPerformers((agentsData || []).slice(0, 5));
        
        // Mock performance data (in a real app, this would come from the database)
        const mockPerformanceData = generateMockPerformanceData(timeRange);
        setPerformanceData(mockPerformanceData);
      } catch (error) {
        console.error('Error fetching agent data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAgentData();
  }, [timeRange]);

  const generateMockPerformanceData = (range: string): PerformanceData[] => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentMonth = new Date().getMonth();
    
    let numMonths = 6; // Default 6 months
    
    if (range === '3m') numMonths = 3;
    if (range === '1y') numMonths = 12;
    if (range === 'ytd') numMonths = currentMonth + 1;
    
    // Generate data for the selected range
    return Array(numMonths).fill(0).map((_, i) => {
      const monthIndex = (currentMonth - (numMonths - 1) + i + 12) % 12;
      return {
        month: months[monthIndex],
        sales: Math.floor(Math.random() * 15) + 2,
        leads: Math.floor(Math.random() * 40) + 10
      };
    });
  };

  const getTotalSales = () => {
    return performanceData.reduce((acc, data) => acc + data.sales, 0);
  };

  const getTotalLeads = () => {
    return performanceData.reduce((acc, data) => acc + data.leads, 0);
  };
  
  const getConversionRate = () => {
    const totalSales = getTotalSales();
    const totalLeads = getTotalLeads();
    return totalLeads > 0 ? Math.round((totalSales / totalLeads) * 100) : 0;
  };

  const getAgentRankData = () => {
    return topPerformers.map((agent, index) => ({
      name: `${agent.first_name} ${agent.last_name}`,
      value: agent.properties_sold || 0
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold">Agent Performance Dashboard</h1>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Time Range:</span>
          <Select 
            value={timeRange}
            onValueChange={(value) => setTimeRange(value)}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3m">3 Months</SelectItem>
              <SelectItem value="6m">6 Months</SelectItem>
              <SelectItem value="ytd">Year to Date</SelectItem>
              <SelectItem value="1y">1 Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* KPI Cards */}
      <div className="grid gap-4 md:gap-6 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Total Sales
              </CardTitle>
              <div className="rounded-full p-2 bg-blue-50 text-blue-500 ring-blue-500/10">
                <TrendingUp className="h-6 w-6" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{loading ? "-" : getTotalSales()}</div>
              <p className="text-sm text-gray-500 mt-1">Properties sold</p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Total Leads
              </CardTitle>
              <div className="rounded-full p-2 bg-emerald-50 text-emerald-500 ring-emerald-500/10">
                <Users className="h-6 w-6" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{loading ? "-" : getTotalLeads()}</div>
              <p className="text-sm text-gray-500 mt-1">Client inquiries</p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Conversion Rate
              </CardTitle>
              <div className="rounded-full p-2 bg-purple-50 text-purple-500 ring-purple-500/10">
                <AlertCircle className="h-6 w-6" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{loading ? "-" : getConversionRate() + "%"}</div>
              <p className="text-sm text-gray-500 mt-1">Leads to sales</p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Top Performer
              </CardTitle>
              <div className="rounded-full p-2 bg-amber-50 text-gold ring-amber-500/10">
                <Award className="h-6 w-6" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold line-clamp-1">
                {loading || topPerformers.length === 0 ? "-" : 
                  `${topPerformers[0].first_name} ${topPerformers[0].last_name}`}
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {loading || topPerformers.length === 0 ? "-" : 
                  `${topPerformers[0].properties_sold || 0} Properties`}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      
      {/* Charts */}
      <Tabs defaultValue="performance" className="w-full">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="agents">Agent Ranking</TabsTrigger>
          <TabsTrigger value="breakdown">Sales Breakdown</TabsTrigger>
        </TabsList>
        
        <TabsContent value="performance" className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Agent Performance Over Time</CardTitle>
                <CardDescription>
                  Monthly sales and leads comparison
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px] w-full">
                  {loading ? (
                    <div className="flex justify-center items-center h-full">
                      <p>Loading chart data...</p>
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={performanceData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="sales" 
                          stroke="#004D7F" 
                          strokeWidth={2} 
                          activeDot={{ r: 8 }} 
                        />
                        <Line 
                          type="monotone" 
                          dataKey="leads" 
                          stroke="#FBB040" 
                          strokeWidth={2} 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
        
        <TabsContent value="agents" className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Agent Rankings</CardTitle>
                <CardDescription>
                  Top performers by properties sold
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row">
                  <div className="w-full md:w-1/2">
                    <div className="h-[300px] w-full">
                      {loading ? (
                        <div className="flex justify-center items-center h-full">
                          <p>Loading chart data...</p>
                        </div>
                      ) : (
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={getAgentRankData()}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              outerRadius={100}
                              fill="#8884d8"
                              dataKey="value"
                              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            >
                              {getAgentRankData().map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      )}
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 mt-6 md:mt-0">
                    <h3 className="font-medium mb-4">Top Agent Rankings</h3>
                    <div className="space-y-4">
                      {topPerformers.map((agent, index) => (
                        <div key={agent.id} className="flex items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium`} style={{ backgroundColor: COLORS[index % COLORS.length] }}>
                            {index + 1}
                          </div>
                          <div className="ml-3">
                            <p className="font-medium">{agent.first_name} {agent.last_name}</p>
                            <p className="text-sm text-gray-500">{agent.properties_sold || 0} Properties</p>
                          </div>
                          <div className="ml-auto">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <span key={i} className={`text-sm ${i < Math.floor(agent.rating || 0) ? 'text-gold' : 'text-gray-300'}`}>
                                  ★
                                </span>
                              ))}
                              <span className="ml-1 text-sm font-medium">{agent.rating || 0}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
        
        <TabsContent value="breakdown" className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Sales Breakdown</CardTitle>
                <CardDescription>
                  Monthly performance analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px] w-full">
                  {loading ? (
                    <div className="flex justify-center items-center h-full">
                      <p>Loading chart data...</p>
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={performanceData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="sales" name="Sales" fill="#004D7F" />
                        <Bar dataKey="leads" name="Leads" fill="#FBB040" />
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AgentDashboard;
