
import React, { useState } from 'react';
import { Navigate, Outlet, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Home,
  Building2,
  Users,
  LayoutDashboard,
  Map,
  MessageSquare,
  LineChart,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown,
  User,
  TrendingUp,
  Award
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  path: string;
  active: boolean;
  onClick?: () => void;
  roleRequired?: 'admin' | 'superadmin' | 'agent';
}

const NavItem = ({ icon, label, path, active, onClick, roleRequired }: NavItemProps) => {
  const { isAdmin, isSuperAdmin, isAgent } = useAuth();
  
  // Check if user has the required role
  if (roleRequired) {
    if (roleRequired === 'admin' && !isAdmin) return null;
    if (roleRequired === 'superadmin' && !isSuperAdmin) return null;
    if (roleRequired === 'agent' && !isAgent && !isAdmin) return null;
  }
  
  return (
    <Link to={path}>
      <motion.div
        className={`flex items-center px-4 py-3 mb-2 rounded-lg cursor-pointer transition-colors
          ${active ? 'bg-gold text-white' : 'text-gray-600 hover:bg-gray-100'}`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
      >
        <div className="mr-3">{icon}</div>
        <span className="font-medium">{label}</span>
      </motion.div>
    </Link>
  );
};

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, signOut, loading, isAdmin, isSuperAdmin, isAgent } = useAuth();

  // If loading, show skeleton
  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <div className="hidden md:flex md:w-64 bg-white shadow-md">
          <div className="w-full p-6">
            <Skeleton className="h-8 w-32 mb-10" />
            {Array(7).fill(null).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full mb-2" />
            ))}
          </div>
        </div>
        <div className="flex-1">
          <div className="h-16 border-b bg-white flex items-center px-4">
            <Skeleton className="h-8 w-32" />
            <div className="ml-auto">
              <Skeleton className="h-10 w-10 rounded-full" />
            </div>
          </div>
          <div className="p-6">
            <Skeleton className="h-8 w-48 mb-6" />
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
              {Array(4).fill(null).map((_, i) => (
                <Skeleton key={i} className="h-32" />
              ))}
            </div>
            <Skeleton className="h-64 mt-6" />
          </div>
        </div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!user) {
    return <Navigate to="/auth" />;
  }
  
  // If authenticated but not an admin, agent or superadmin, redirect to home
  if (user && !isAdmin && !isAgent) {
    return <Navigate to="/" />;
  }

  const handleSignOut = async () => {
    await signOut();
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const getInitials = (name: string | undefined) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const userName = user?.user_metadata?.full_name || 'User';
  const userEmail = user?.email || '';
  const userInitials = getInitials(userName);
  
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar - Desktop */}
      <motion.div 
        className={`hidden md:flex md:flex-col transition-all duration-300 bg-white shadow-md border-r border-gray-200 ${sidebarOpen ? 'md:w-64' : 'md:w-20'}`}
        initial={{ x: -10, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="p-4 flex justify-between items-center border-b">
          {sidebarOpen ? (
            <Link to="/admin" className="text-xl font-bold">
              <span className="text-gold">Elite</span>
              <span className="text-deep-blue">Estates</span>
            </Link>
          ) : (
            <Link to="/admin" className="text-xl font-bold mx-auto">
              <span className="text-gold">E</span>
            </Link>
          )}
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:flex"
            onClick={toggleSidebar}
          >
            <Menu size={20} />
          </Button>
        </div>
        
        <div className="flex flex-col justify-between h-full p-4">
          <nav>
            {sidebarOpen ? (
              <h2 className="text-xs uppercase text-gray-500 font-semibold mb-4 tracking-wider">Navigation</h2>
            ) : null}
            
            <NavItem 
              icon={<LayoutDashboard size={20} />}
              label="Main Dashboard"
              path="/admin"
              active={location.pathname === "/admin"}
            />
            
            <NavItem 
              icon={<Award size={20} />}
              label="Agent Dashboard"
              path="/admin/agent-dashboard"
              active={location.pathname === "/admin/agent-dashboard"}
              roleRequired="admin"
            />
            
            <NavItem 
              icon={<TrendingUp size={20} />}
              label="Sales Dashboard"
              path="/admin/sales-dashboard"
              active={location.pathname === "/admin/sales-dashboard"}
              roleRequired="admin"
            />
            
            <NavItem 
              icon={<Building2 size={20} />}
              label="Properties"
              path="/admin/properties"
              active={location.pathname.startsWith("/admin/properties")}
              roleRequired="agent"
            />
            
            <NavItem 
              icon={<Users size={20} />}
              label="Agents"
              path="/admin/agents"
              active={location.pathname.startsWith("/admin/agents")}
              roleRequired="admin"
            />
            
            <NavItem 
              icon={<Map size={20} />}
              label="Areas"
              path="/admin/areas"
              active={location.pathname.startsWith("/admin/areas")}
              roleRequired="admin"
            />
            
            <NavItem 
              icon={<MessageSquare size={20} />}
              label="Inquiries"
              path="/admin/inquiries"
              active={location.pathname.startsWith("/admin/inquiries")}
            />
            
            <NavItem 
              icon={<LineChart size={20} />}
              label="Market Insights"
              path="/admin/insights"
              active={location.pathname.startsWith("/admin/insights")}
              roleRequired="admin"
            />

            {isSuperAdmin && (
              <NavItem 
                icon={<Users size={20} />}
                label="User Management"
                path="/admin/users"
                active={location.pathname.startsWith("/admin/users")}
                roleRequired="superadmin"
              />
            )}
            
            <NavItem 
              icon={<Settings size={20} />}
              label="Settings"
              path="/admin/settings"
              active={location.pathname.startsWith("/admin/settings")}
            />
            
            {sidebarOpen ? (
              <div className="pt-4 mt-6 border-t border-gray-200">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 px-4"
                  onClick={handleSignOut}
                >
                  <LogOut size={20} className="mr-3" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="pt-4 mt-6 border-t border-gray-200">
                <Button
                  variant="ghost"
                  className="w-full justify-center text-red-500 hover:text-red-600 hover:bg-red-50"
                  onClick={handleSignOut}
                >
                  <LogOut size={20} />
                </Button>
              </div>
            )}
          </nav>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center px-4 md:px-6">
          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </Button>
          
          <h1 className="text-xl font-semibold text-gray-800 md:hidden ml-2">
            <span className="text-gold">Elite</span>
            <span>Estates</span>
          </h1>
          
          {/* Link Back to Frontend */}
          <div className="ml-auto md:ml-0 flex items-center">
            <Link to="/" className="text-deep-blue hover:text-gold transition-colors mr-4">
              <Home size={20} />
              <span className="hidden md:inline ml-2">Visit Website</span>
            </Link>
          </div>
          
          {/* User Menu - Right Side */}
          <div className="ml-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 rounded-full">
                  <Avatar>
                    <AvatarImage src="" alt={userName} />
                    <AvatarFallback className="bg-deep-blue text-white">
                      {userInitials}
                    </AvatarFallback>
                  </Avatar>
                  
                  <span className="hidden md:inline ml-2">{userName}</span>
                  <ChevronDown className="hidden md:inline ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{userName}</p>
                    <p className="text-xs leading-none text-gray-500">{userEmail}</p>
                  </div>
                </DropdownMenuLabel>
                
                <DropdownMenuSeparator />
                
                <DropdownMenuItem asChild>
                  <Link to="/admin/profile" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                
                <DropdownMenuItem asChild>
                  <Link to="/admin/settings" className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                
                <DropdownMenuSeparator />
                
                <DropdownMenuItem onClick={handleSignOut} className="text-red-500 cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Mobile Navigation Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              className="fixed inset-0 bg-black/50 z-50 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
            >
              <motion.div 
                className="absolute top-0 left-0 bottom-0 w-3/4 max-w-xs bg-white"
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                exit={{ x: -300 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-4 flex justify-between items-center border-b">
                  <Link to="/admin" className="text-xl font-bold">
                    <span className="text-gold">Elite</span>
                    <span className="text-deep-blue">Estates</span>
                  </Link>
                  
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <X size={20} />
                  </Button>
                </div>
                
                <div className="p-4">
                  <nav>
                    <h2 className="text-xs uppercase text-gray-500 font-semibold mb-4 tracking-wider">Navigation</h2>
                    
                    <NavItem 
                      icon={<LayoutDashboard size={20} />}
                      label="Main Dashboard"
                      path="/admin"
                      active={location.pathname === "/admin"}
                      onClick={() => setMobileMenuOpen(false)}
                    />
                    
                    <NavItem 
                      icon={<Award size={20} />}
                      label="Agent Dashboard"
                      path="/admin/agent-dashboard"
                      active={location.pathname === "/admin/agent-dashboard"}
                      onClick={() => setMobileMenuOpen(false)}
                      roleRequired="admin"
                    />
                    
                    <NavItem 
                      icon={<TrendingUp size={20} />}
                      label="Sales Dashboard"
                      path="/admin/sales-dashboard"
                      active={location.pathname === "/admin/sales-dashboard"}
                      onClick={() => setMobileMenuOpen(false)}
                      roleRequired="admin"
                    />
                    
                    <NavItem 
                      icon={<Building2 size={20} />}
                      label="Properties"
                      path="/admin/properties"
                      active={location.pathname.startsWith("/admin/properties")}
                      onClick={() => setMobileMenuOpen(false)}
                      roleRequired="agent"
                    />
                    
                    <NavItem 
                      icon={<Users size={20} />}
                      label="Agents"
                      path="/admin/agents"
                      active={location.pathname.startsWith("/admin/agents")}
                      onClick={() => setMobileMenuOpen(false)}
                      roleRequired="admin"
                    />
                    
                    <NavItem 
                      icon={<Map size={20} />}
                      label="Areas"
                      path="/admin/areas"
                      active={location.pathname.startsWith("/admin/areas")}
                      onClick={() => setMobileMenuOpen(false)}
                      roleRequired="admin"
                    />
                    
                    <NavItem 
                      icon={<MessageSquare size={20} />}
                      label="Inquiries"
                      path="/admin/inquiries"
                      active={location.pathname.startsWith("/admin/inquiries")}
                      onClick={() => setMobileMenuOpen(false)}
                    />
                    
                    <NavItem 
                      icon={<LineChart size={20} />}
                      label="Market Insights"
                      path="/admin/insights"
                      active={location.pathname.startsWith("/admin/insights")}
                      onClick={() => setMobileMenuOpen(false)}
                      roleRequired="admin"
                    />

                    {isSuperAdmin && (
                      <NavItem 
                        icon={<Users size={20} />}
                        label="User Management"
                        path="/admin/users"
                        active={location.pathname.startsWith("/admin/users")}
                        onClick={() => setMobileMenuOpen(false)}
                        roleRequired="superadmin"
                      />
                    )}
                    
                    <NavItem 
                      icon={<Settings size={20} />}
                      label="Settings"
                      path="/admin/settings"
                      active={location.pathname.startsWith("/admin/settings")}
                      onClick={() => setMobileMenuOpen(false)}
                    />
                    
                    <div className="pt-4 mt-6 border-t border-gray-200">
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 px-4"
                        onClick={() => {
                          handleSignOut();
                          setMobileMenuOpen(false);
                        }}
                      >
                        <LogOut size={20} className="mr-3" />
                        Sign Out
                      </Button>
                    </div>
                  </nav>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
