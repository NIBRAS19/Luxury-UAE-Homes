
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { AreaChart, Area, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DollarSign, TrendingDown, TrendingUp, Calendar, MapPin, Home } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface SalesData {
  month: string;
  revenue: number;
  goal: number;
}

interface AreaData {
  name: string;
  sales: number;
  average_price: number;
}

interface PropertyTypeData {
  type: string;
  count: number;
  percentage: number;
}

const SalesDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [salesData, setSalesData] = useState<SalesData[]>([]);
  const [areaData, setAreaData] = useState<AreaData[]>([]);
  const [propertyTypes, setPropertyTypes] = useState<PropertyTypeData[]>([]);
  const [salesTarget, setSalesTarget] = useState(0);
  const [currentSales, setCurrentSales] = useState(0);
  const [salesTargetPercentage, setSalesTargetPercentage] = useState(0);
  const [yearlyStats, setYearlyStats] = useState({
    total_revenue: 0,
    highest_sale: 0,
    avg_price: 0,
    forecast: 0,
    yoy_growth: 0
  });
  
  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        // Mock data - in a real app this would come from Supabase
        // Generate sales data for the last 12 months
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const currentMonth = new Date().getMonth();
        
        const mockSalesData = Array(12).fill(0).map((_, i) => {
          const monthIndex = (currentMonth - 11 + i + 12) % 12;
          const revenue = Math.floor(Math.random() * 600000) + 200000;
          const goal = Math.floor(Math.random() * 200000) + 600000;
          return {
            month: months[monthIndex],
            revenue,
            goal
          };
        });
        
        // Generate area data
        const mockAreaData = [
          { name: 'Downtown', sales: 23, average_price: 850000 },
          { name: 'Westside', sales: 18, average_price: 950000 },
          { name: 'East End', sales: 15, average_price: 750000 },
          { name: 'North Hills', sales: 12, average_price: 650000 },
          { name: 'Southbank', sales: 10, average_price: 520000 },
        ];
        
        // Generate property type data
        const mockPropertyTypes = [
          { type: 'Apartments', count: 45, percentage: 45 },
          { type: 'Houses', count: 28, percentage: 28 },
          { type: 'Villas', count: 15, percentage: 15 },
          { type: 'Commercial', count: 8, percentage: 8 },
          { type: 'Land', count: 4, percentage: 4 },
        ];
        
        // Calculate yearly stats
        const totalRevenue = mockSalesData.reduce((sum, item) => sum + item.revenue, 0);
        const highestSale = Math.max(...mockSalesData.map(item => item.revenue));
        const avgPrice = Math.round(totalRevenue / mockSalesData.reduce((sum, item) => sum + (item.revenue > 0 ? 1 : 0), 0));
        
        setYearlyStats({
          total_revenue: totalRevenue,
          highest_sale: highestSale,
          avg_price: avgPrice,
          forecast: totalRevenue * 1.15, // 15% forecasted growth
          yoy_growth: 12.3 // Mock YoY growth percentage
        });
        
        // Set sales target metrics
        const annualTarget = 8500000;
        setSalesTarget(annualTarget);
        setCurrentSales(totalRevenue);
        setSalesTargetPercentage(Math.min(Math.round((totalRevenue / annualTarget) * 100), 100));
        
        // Update state
        setSalesData(mockSalesData);
        setAreaData(mockAreaData);
        setPropertyTypes(mockPropertyTypes);
      } catch (error) {
        console.error('Error fetching sales dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);
  
  // Format currency values
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Sales Dashboard</h1>
      </div>
      
      {/* Sales Target Progress */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Annual Sales Target</CardTitle>
            <CardDescription>
              Progress toward {formatCurrency(salesTarget)} annual target
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Progress value={salesTargetPercentage} className="h-2" />
              <div className="flex justify-between text-sm text-gray-500">
                <div>Current: {formatCurrency(currentSales)}</div>
                <div>{salesTargetPercentage}% of target</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Stats Cards */}
      <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Total Revenue
              </CardTitle>
              <div className="rounded-full p-2 bg-green-50 text-green-700">
                <DollarSign className="h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {loading ? "-" : formatCurrency(yearlyStats.total_revenue)}
              </div>
              <div className="flex items-center mt-1">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-green-500">{yearlyStats.yoy_growth}% from last year</span>
              </div>
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
                Highest Sale
              </CardTitle>
              <div className="rounded-full p-2 bg-blue-50 text-blue-700">
                <TrendingUp className="h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {loading ? "-" : formatCurrency(yearlyStats.highest_sale)}
              </div>
              <p className="text-sm text-gray-500 mt-1">Premium property</p>
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
                Average Sale Price
              </CardTitle>
              <div className="rounded-full p-2 bg-amber-50 text-gold">
                <Home className="h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {loading ? "-" : formatCurrency(yearlyStats.avg_price)}
              </div>
              <p className="text-sm text-gray-500 mt-1">Per property</p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Annual Forecast
              </CardTitle>
              <div className="rounded-full p-2 bg-purple-50 text-purple-700">
                <Calendar className="h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {loading ? "-" : formatCurrency(yearlyStats.forecast)}
              </div>
              <p className="text-sm text-gray-500 mt-1">Projected revenue</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      
      {/* Charts */}
      <Tabs defaultValue="revenue" className="w-full">
        <TabsList>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="areas">Areas</TabsTrigger>
          <TabsTrigger value="types">Property Types</TabsTrigger>
        </TabsList>
        
        <TabsContent value="revenue" className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Monthly Revenue vs. Target</CardTitle>
                <CardDescription>
                  Performance against monthly sales targets
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
                      <AreaChart
                        data={salesData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip formatter={(value) => formatCurrency(value as number)} />
                        <Legend />
                        <Area 
                          type="monotone" 
                          dataKey="revenue" 
                          name="Revenue"
                          stackId="1" 
                          stroke="#004D7F" 
                          fill="#004D7F" 
                          fillOpacity={0.6} 
                        />
                        <Area 
                          type="monotone" 
                          dataKey="goal" 
                          name="Target"
                          stackId="2" 
                          stroke="#FBB040" 
                          fill="#FBB040" 
                          fillOpacity={0.4} 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
        
        <TabsContent value="areas" className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Sales by Area</CardTitle>
                <CardDescription>
                  Performance across different neighborhoods
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
                        data={areaData}
                        layout="vertical"
                        margin={{ top: 20, right: 30, left: 70, bottom: 20 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                        <XAxis type="number" />
                        <YAxis 
                          dataKey="name" 
                          type="category" 
                          scale="band" 
                          tick={{ fontSize: 12 }} 
                        />
                        <Tooltip formatter={(value, name) => {
                          if (name === 'average_price') return formatCurrency(value as number);
                          return value;
                        }} />
                        <Legend />
                        <Bar dataKey="sales" name="Properties Sold" fill="#004D7F" />
                        <Bar dataKey="average_price" name="Avg Price" fill="#FBB040" />
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
        
        <TabsContent value="types" className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Sales by Property Type</CardTitle>
                <CardDescription>
                  Distribution across property categories
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {propertyTypes.map((type) => (
                    <div key={type.type} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium">{type.type}</div>
                        <div className="text-sm text-gray-500">{type.percentage}%</div>
                      </div>
                      <Progress value={type.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
                
                <div className="h-[200px] w-full mt-8">
                  {loading ? (
                    <div className="flex justify-center items-center h-full">
                      <p>Loading chart data...</p>
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={propertyTypes}
                        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="type" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" name="Properties" fill="#004D7F" radius={[4, 4, 0, 0]} />
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

export default SalesDashboard;
