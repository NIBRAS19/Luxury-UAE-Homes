import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

// Pages
import Index from "./pages/Index";
import Blog from "./pages/Blog";
import NotFound from "./pages/NotFound";
import Properties from "./pages/Properties";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Agents from "./pages/Agents";
import Areas from "./pages/Areas";
import AreaDetail from "./pages/AreaDetail";
import Apartments from "./pages/property-types/Apartments";
import Villas from "./pages/property-types/Villas";
import Penthouses from "./pages/property-types/Penthouses";
import Commercial from "./pages/property-types/Commercial";
import OffPlan from "./pages/property-types/OffPlan";
import SinglePropertyPage from "./pages/SinglePropertyPage";
import ContactAgent from "./pages/ContactAgent";
import MarketInsights from "./pages/MarketInsights";

// Auth Page
import Auth from "./pages/Auth";

// Dashboard Pages
import RoleDashboard from "./pages/dashboard/RoleDashboard";
import UserDashboard from "./pages/dashboard/UserDashboard";
import AgentDashboard from "./pages/dashboard/AgentDashboard";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import SuperAdminDashboard from "./pages/dashboard/SuperAdminDashboard";

// Admin Pages
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboardOld from "./pages/admin/Dashboard";
import AgentDashboardOld from "./pages/admin/AgentDashboard";
import SalesDashboard from "./pages/admin/SalesDashboard"; 
import AdminProperties from "./pages/admin/Properties";
import UserManagement from "./pages/admin/UserManagement";
import SystemSettings from "./pages/admin/SystemSettings";

// Initialize the QueryClient properly
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

const App = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<Index />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/properties" element={<Properties />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/agents" element={<Agents />} />
                <Route path="/contact-agent" element={<ContactAgent />} />
                <Route path="/areas" element={<Areas />} />
                <Route path="/areas/:id" element={<AreaDetail />} />
                <Route path="/market-insights" element={<MarketInsights />} />
                
                {/* Property Type Routes */}
                <Route path="/properties/apartments" element={<Apartments />} />
                <Route path="/properties/villas" element={<Villas />} />
                <Route path="/properties/penthouses" element={<Penthouses />} />
                <Route path="/properties/commercial" element={<Commercial />} />
                <Route path="/properties/off-plan" element={<OffPlan />} />
                
                {/* Property Detail Routes - Using the unified SinglePropertyPage component for all property types */}
                <Route path="/property/:id" element={<SinglePropertyPage />} />
                <Route path="/properties/apartments/:id" element={<SinglePropertyPage />} />
                <Route path="/properties/villas/:id" element={<SinglePropertyPage />} />
                <Route path="/properties/penthouses/:id" element={<SinglePropertyPage />} />
                <Route path="/properties/commercial/:id" element={<SinglePropertyPage />} />
                <Route path="/properties/off-plan/:id" element={<SinglePropertyPage />} />
                <Route path="/areas/properties/:id" element={<SinglePropertyPage />} />
                
                {/* Authentication route */}
                <Route path="/auth" element={<Auth />} />
                
                {/* Protected routes for all authenticated users */}
                <Route element={<ProtectedRoute />}>
                  <Route path="/dashboard" element={<RoleDashboard />} />
                  <Route path="/dashboard/user" element={<UserDashboard />} />
                </Route>
                
                {/* Protected routes for agents only */}
                <Route element={<ProtectedRoute requiredRoles={['agent', 'admin', 'superadmin']} />}>
                  <Route path="/dashboard/agent" element={<AgentDashboard />} />
                </Route>
                
                {/* Protected routes for admins only */}
                <Route element={<ProtectedRoute requiredRoles={['admin', 'superadmin']} />}>
                  <Route path="/dashboard/admin" element={<AdminDashboard />} />
                </Route>
                
                {/* Protected routes for superadmins only */}
                <Route element={<ProtectedRoute requiredRoles={['superadmin']} />}>
                  <Route path="/dashboard/superadmin" element={<SuperAdminDashboard />} />
                </Route>
                
                {/* Admin routes */}
                <Route element={<ProtectedRoute requiredRoles={['agent', 'admin', 'superadmin']} />}>
                  <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<RoleDashboard />} />
                    <Route path="properties" element={<AdminProperties />} />
                    <Route path="agent-dashboard" element={<AgentDashboardOld />} />
                    <Route path="sales-dashboard" element={<SalesDashboard />} />
                  </Route>
                </Route>
                
                {/* Additional routes for superadmin */}
                <Route element={<ProtectedRoute requiredRoles={['superadmin']} />}>
                  <Route path="/admin/users" element={<UserManagement />} />
                  <Route path="/admin/system" element={<SystemSettings />} />
                </Route>
                
                {/* Redirects and catch-all */}
                <Route path="/login" element={<Navigate to="/auth" replace />} />
                <Route path="/register" element={<Navigate to="/auth?tab=register" replace />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
