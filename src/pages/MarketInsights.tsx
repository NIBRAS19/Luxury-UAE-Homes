
import React, { useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, Legend, LineChart, Line, PieChart, Pie, Cell
} from 'recharts';
import { 
  Download, TrendingUp, TrendingDown, Calendar, FileText, ChevronRight
} from 'lucide-react';

// Sample data for the market insights
const priceData = [
  { area: 'Dubai Marina', Q1: 1250, Q2: 1300, Q3: 1380, Q4: 1450 },
  { area: 'Palm Jumeirah', Q1: 2100, Q2: 2300, Q3: 2500, Q4: 2750 },
  { area: 'Downtown Dubai', Q1: 1900, Q2: 2000, Q3: 2050, Q4: 2200 },
  { area: 'Business Bay', Q1: 1100, Q2: 1150, Q3: 1200, Q4: 1300 },
  { area: 'Dubai Hills', Q1: 1300, Q2: 1350, Q3: 1450, Q4: 1550 },
];

const salesData = [
  { month: 'Jan', sales: 120, value: 450 },
  { month: 'Feb', sales: 135, value: 510 },
  { month: 'Mar', sales: 150, value: 580 },
  { month: 'Apr', sales: 140, value: 520 },
  { month: 'May', sales: 155, value: 590 },
  { month: 'Jun', sales: 180, value: 670 },
  { month: 'Jul', sales: 190, value: 700 },
  { month: 'Aug', sales: 205, value: 770 },
  { month: 'Sep', sales: 220, value: 820 },
  { month: 'Oct', sales: 240, value: 900 },
  { month: 'Nov', sales: 255, value: 950 },
  { month: 'Dec', sales: 270, value: 1000 },
];

const investorData = [
  { name: 'UAE', value: 35 },
  { name: 'Europe', value: 25 },
  { name: 'Asia', value: 20 },
  { name: 'North America', value: 15 },
  { name: 'Other', value: 5 },
];

const COLORS = ['#0A3D62', '#D4AF37', '#50B3A2', '#FF6B6B', '#B39DDB'];

const reportData = [
  {
    id: 1,
    title: "Q1 2025 Market Report",
    category: "Quarterly Report",
    date: "March 31, 2025",
    description: "Comprehensive analysis of the UAE real estate market for Q1 2025, including price trends, transaction volumes, and future outlook.",
    thumbnail: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3"
  },
  {
    id: 2,
    title: "Luxury Property Investment Guide",
    category: "Investment",
    date: "February 15, 2025",
    description: "Strategic guide for investing in luxury properties across the UAE, with ROI analysis and location recommendations.",
    thumbnail: "https://images.unsplash.com/photo-1460472178825-e5240623afd5?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3"
  },
  {
    id: 3,
    title: "Dubai Market Trends 2025",
    category: "Market Analysis",
    date: "January 10, 2025",
    description: "In-depth analysis of emerging trends shaping Dubai's luxury property market in 2025 and beyond.",
    thumbnail: "https://images.unsplash.com/photo-1606857521015-7f9fcf423740?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3"
  },
];

const MarketInsights = () => {
  const { ref: introRef, animationClasses: introAnimation } = useScrollAnimation('fadeInUp');
  const [selectedTab, setSelectedTab] = useState("overview");
  
  return (
    <PageLayout 
      title="Market Insights"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Market Insights" }
      ]}
    >
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div ref={introRef} className={`${introAnimation} mb-12`}>
            <h2 className="text-3xl font-bold mb-4 text-deep-blue">UAE Real Estate Market Insights</h2>
            <p className="text-gray-600 max-w-4xl">
              Stay informed with comprehensive market analysis, price trends, transaction data, and expert insights
              on the UAE's luxury real estate market. Our detailed reports and interactive data visualization tools
              help you make informed investment decisions.
            </p>
          </div>

          <Tabs defaultValue="overview" value={selectedTab} onValueChange={setSelectedTab} className="mb-16">
            <TabsList className="grid w-full grid-cols-4 lg:w-auto">
              <TabsTrigger value="overview">Market Overview</TabsTrigger>
              <TabsTrigger value="trends">Price Trends</TabsTrigger>
              <TabsTrigger value="investors">Investor Analysis</TabsTrigger>
              <TabsTrigger value="reports">Market Reports</TabsTrigger>
            </TabsList>
            
            {/* Overview Tab */}
            <TabsContent value="overview" className="pt-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Key Stats */}
                <div className="col-span-1">
                  <div className="grid grid-cols-1 gap-6">
                    <div className="bg-white rounded-xl shadow-md p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">Market Growth</h3>
                        <Badge variant="outline" className="flex items-center gap-1 bg-green-50 text-green-700 border-green-300">
                          <TrendingUp size={14} />
                          +8.2%
                        </Badge>
                      </div>
                      <p className="text-4xl font-bold text-deep-blue mb-2">AED 1,450</p>
                      <p className="text-gray-500 text-sm">Average Price per sq.ft</p>
                      <div className="h-[80px] mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={salesData.slice(-6)}>
                            <Line 
                              type="monotone" 
                              dataKey="value" 
                              stroke="#0A3D62" 
                              strokeWidth={2}
                              dot={false}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-xl shadow-md p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">Transaction Volume</h3>
                        <Badge variant="outline" className="flex items-center gap-1 bg-green-50 text-green-700 border-green-300">
                          <TrendingUp size={14} />
                          +12.5%
                        </Badge>
                      </div>
                      <p className="text-4xl font-bold text-deep-blue mb-2">5,240</p>
                      <p className="text-gray-500 text-sm">Transactions in Q1 2025</p>
                      <div className="h-[80px] mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={salesData.slice(-6)}>
                            <Bar dataKey="sales" fill="#D4AF37" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-xl shadow-md p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">ROI Average</h3>
                        <Badge variant="outline" className="flex items-center gap-1 bg-amber-50 text-amber-700 border-amber-300">
                          <TrendingDown size={14} />
                          -0.3%
                        </Badge>
                      </div>
                      <p className="text-4xl font-bold text-deep-blue mb-2">5.8%</p>
                      <p className="text-gray-500 text-sm">Annual rental yield</p>
                      <div className="grid grid-cols-3 gap-2 mt-4">
                        <div className="text-center">
                          <p className="text-sm font-semibold text-deep-blue">6.1%</p>
                          <p className="text-xs text-gray-500">Apartments</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-semibold text-deep-blue">5.2%</p>
                          <p className="text-xs text-gray-500">Villas</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-semibold text-deep-blue">7.4%</p>
                          <p className="text-xs text-gray-500">Commercial</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Main Chart */}
                <div className="col-span-1 lg:col-span-2">
                  <div className="bg-white rounded-xl shadow-md p-6 h-full">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-xl font-semibold">Property Sales Performance</h3>
                        <p className="text-gray-500">Transaction value and volume (2025)</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Monthly</Button>
                        <Button variant="outline" size="sm" className="bg-gold/10 text-gold border-gold">Quarterly</Button>
                        <Button variant="outline" size="sm">Yearly</Button>
                      </div>
                    </div>
                    
                    <div className="h-[400px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={salesData}
                          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                        >
                          <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#0A3D62" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="#0A3D62" stopOpacity={0.1}/>
                            </linearGradient>
                            <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="#D4AF37" stopOpacity={0.1}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Area 
                            type="monotone" 
                            dataKey="value" 
                            name="Transaction Value (AED M)"
                            stroke="#0A3D62" 
                            fillOpacity={1}
                            fill="url(#colorValue)" 
                          />
                          <Area 
                            type="monotone" 
                            dataKey="sales" 
                            name="Number of Sales"
                            stroke="#D4AF37" 
                            fillOpacity={1}
                            fill="url(#colorSales)" 
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Market Summaries */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-lg font-semibold mb-4">Premium Areas Performance</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Palm Jumeirah</span>
                      <Badge className="bg-green-500">+12.8%</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Dubai Hills</span>
                      <Badge className="bg-green-500">+9.5%</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Downtown Dubai</span>
                      <Badge className="bg-green-500">+7.2%</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Dubai Marina</span>
                      <Badge className="bg-green-500">+6.8%</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Emirates Hills</span>
                      <Badge className="bg-green-500">+4.7%</Badge>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-lg font-semibold mb-4">Property Type Analysis</h3>
                  <div className="flex flex-col h-[180px] justify-between">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-700">Apartments</span>
                      <span className="font-semibold">48%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-deep-blue h-2 rounded-full" style={{ width: '48%' }}></div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-700">Villas</span>
                      <span className="font-semibold">32%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gold h-2 rounded-full" style={{ width: '32%' }}></div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-700">Penthouses</span>
                      <span className="font-semibold">12%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-emerald h-2 rounded-full" style={{ width: '12%' }}></div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-700">Commercial</span>
                      <span className="font-semibold">8%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: '8%' }}></div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-lg font-semibold mb-4">Market Sentiment</h3>
                  <div className="flex flex-col h-[180px]">
                    <div className="flex-1">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={[
                              { name: 'Bullish', value: 60 },
                              { name: 'Neutral', value: 30 },
                              { name: 'Bearish', value: 10 },
                            ]}
                            cx="50%"
                            cy="50%"
                            innerRadius={30}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            <Cell key="cell-0" fill="#4CAF50" />
                            <Cell key="cell-1" fill="#FFC107" />
                            <Cell key="cell-2" fill="#F44336" />
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="text-center mt-2">
                      <span className="text-green-600 font-medium">Market outlook is predominantly positive</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* Price Trends Tab */}
            <TabsContent value="trends" className="pt-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-semibold">Price Per Square Foot by Area</h3>
                      <p className="text-gray-500">Quarterly comparison (AED/sqft)</p>
                    </div>
                  </div>
                  
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={priceData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="area" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar name="Q1 2025" dataKey="Q1" fill="#0A3D62" />
                        <Bar name="Q2 2025" dataKey="Q2" fill="#50B3A2" />
                        <Bar name="Q3 2025" dataKey="Q3" fill="#D4AF37" />
                        <Bar name="Q4 2025" dataKey="Q4" fill="#FF6B6B" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div className="col-span-1 bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-xl font-semibold mb-4">Year-on-Year Growth</h3>
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-700">Dubai Marina</span>
                        <Badge className="bg-green-500">+16.0%</Badge>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '16%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-700">Palm Jumeirah</span>
                        <Badge className="bg-green-500">+30.9%</Badge>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '30.9%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-700">Downtown Dubai</span>
                        <Badge className="bg-green-500">+15.8%</Badge>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '15.8%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-700">Business Bay</span>
                        <Badge className="bg-green-500">+18.2%</Badge>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '18.2%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-700">Dubai Hills</span>
                        <Badge className="bg-green-500">+19.2%</Badge>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '19.2%' }}></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <h4 className="text-deep-blue font-medium mb-2">Expert Analysis</h4>
                    <p className="text-gray-700 text-sm">
                      Palm Jumeirah continues to lead price growth with a 30.9% year-on-year increase,
                      driven by limited inventory and strong demand from UHNW buyers. Dubai Hills and Business Bay
                      are also showing strong momentum with growth exceeding the city average.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* Investors Analysis Tab */}
            <TabsContent value="investors" className="pt-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-semibold">Foreign Investment by Region</h3>
                      <p className="text-gray-500">Distribution of foreign investment in UAE real estate</p>
                    </div>
                  </div>
                  
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={investorData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={140}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {investorData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div className="col-span-1 bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-xl font-semibold mb-4">Investor Nationality Trends</h3>
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">UAE Nationals</span>
                      <span className="font-semibold">35%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">India</span>
                      <span className="font-semibold">12%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">United Kingdom</span>
                      <span className="font-semibold">8%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">China</span>
                      <span className="font-semibold">7%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Russia</span>
                      <span className="font-semibold">6%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Germany</span>
                      <span className="font-semibold">5%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">United States</span>
                      <span className="font-semibold">5%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Others</span>
                      <span className="font-semibold">22%</span>
                    </div>
                  </div>
                  
                  <div className="mt-8 p-4 bg-amber-50 rounded-lg border border-amber-100">
                    <h4 className="text-amber-800 font-medium mb-2">Key Insight</h4>
                    <p className="text-gray-700 text-sm">
                      European investors have increased their market share by 4.2% since 2024,
                      with particular growth in buyers from the UK and Germany seeking both
                      investment properties and second homes.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* Market Reports Tab */}
            <TabsContent value="reports" className="pt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {reportData.map((report) => (
                  <div 
                    key={report.id} 
                    className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
                  >
                    <div className="h-40 overflow-hidden">
                      <img 
                        src={report.thumbnail}
                        alt={report.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center mb-2">
                        <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-blue-200">
                          {report.category}
                        </Badge>
                        <span className="text-gray-500 text-sm ml-2 flex items-center">
                          <Calendar size={14} className="mr-1" />
                          {report.date}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold mb-2">{report.title}</h3>
                      <p className="text-gray-600 mb-4 text-sm">{report.description}</p>
                      <Button className="w-full flex items-center justify-center bg-deep-blue hover:bg-deep-blue/90">
                        <Download size={16} className="mr-2" />
                        Download Report
                      </Button>
                    </div>
                  </div>
                ))}
                
                {/* Subscription Card */}
                <div className="bg-gradient-to-br from-deep-blue to-deep-blue/80 rounded-xl shadow-md overflow-hidden text-white">
                  <div className="p-6">
                    <div className="mb-6">
                      <h3 className="text-xl font-bold mb-2">Subscribe to Market Updates</h3>
                      <p className="text-white/80">
                        Get our latest market reports and insights delivered directly to your inbox.
                      </p>
                    </div>
                    
                    <div className="space-y-4 mb-6">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center mr-3">
                          <FileText size={16} className="text-gold" />
                        </div>
                        <span>Quarterly Market Reports</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center mr-3">
                          <TrendingUp size={16} className="text-gold" />
                        </div>
                        <span>Monthly Price Updates</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center mr-3">
                          <FileText size={16} className="text-gold" />
                        </div>
                        <span>Investment Opportunity Alerts</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <input 
                        type="email" 
                        placeholder="Your email address" 
                        className="flex-1 p-3 rounded-l-md text-gray-800 focus:outline-none"
                      />
                      <Button className="rounded-l-none bg-gold hover:bg-gold/90 text-white">
                        Subscribe
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </PageLayout>
  );
};

export default MarketInsights;
