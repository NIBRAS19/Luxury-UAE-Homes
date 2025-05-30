
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUp, TrendingUp, Users, Building } from 'lucide-react';

// Sample data for market insights
const marketData = [
  { month: 'Jan', price: 1200 },
  { month: 'Feb', price: 1250 },
  { month: 'Mar', price: 1300 },
  { month: 'Apr', price: 1280 },
  { month: 'May', price: 1350 },
  { month: 'Jun', price: 1400 },
  { month: 'Jul', price: 1450 },
  { month: 'Aug', price: 1500 },
  { month: 'Sep', price: 1550 },
  { month: 'Oct', price: 1600 },
  { month: 'Nov', price: 1650 },
  { month: 'Dec', price: 1700 },
];

const MarketInsights = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">UAE Real Estate Market Insights</h2>
          <div className="w-20 h-1 bg-gold mx-auto mb-4"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Stay informed with the latest trends and data from the UAE property market.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chart */}
          <div className="col-span-2 bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Average Property Prices (AED/sqft)</h3>
              <div className="flex items-center text-green-500">
                <ArrowUp size={18} className="mr-1" />
                <span className="font-semibold">5.8%</span>
                <span className="text-gray-500 ml-1">year-on-year</span>
              </div>
            </div>
            
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={marketData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0A3D62" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#0A3D62" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white',
                      border: '1px solid #eee',
                      borderRadius: '0.5rem'
                    }}
                    formatter={(value: any) => [`${value} AED/sqft`, 'Price']}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="price" 
                    stroke="#0A3D62" 
                    fillOpacity={1}
                    fill="url(#colorPrice)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Stats */}
          <div className="col-span-1">
            <div className="grid grid-cols-1 gap-6">
              {/* Stat 1 */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-gray-600 mb-1">Market Growth</p>
                    <h3 className="text-3xl font-bold">8.2%</h3>
                    <p className="text-sm text-green-500 flex items-center mt-1">
                      <ArrowUp size={14} className="mr-1" /> 1.4% from last quarter
                    </p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-full">
                    <TrendingUp size={24} className="text-deep-blue" />
                  </div>
                </div>
              </div>

              {/* Stat 2 */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-gray-600 mb-1">Foreign Investment</p>
                    <h3 className="text-3xl font-bold">42%</h3>
                    <p className="text-sm text-green-500 flex items-center mt-1">
                      <ArrowUp size={14} className="mr-1" /> 3.7% from last year
                    </p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-full">
                    <Users size={24} className="text-green-600" />
                  </div>
                </div>
              </div>

              {/* Stat 3 */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-gray-600 mb-1">New Developments</p>
                    <h3 className="text-3xl font-bold">156</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Launched in 2025
                    </p>
                  </div>
                  <div className="bg-yellow-100 p-3 rounded-full">
                    <Building size={24} className="text-gold" />
                  </div>
                </div>
              </div>

              {/* Read More Link */}
              <div className="mt-2">
                <a href="/market-insights" className="text-deep-blue hover:text-gold font-medium transition-colors">
                  View detailed market analysis →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketInsights;
