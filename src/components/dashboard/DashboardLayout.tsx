
import React, { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Home, 
  Users, 
  Building, 
  FileText, 
  Settings, 
  LogOut, 
  User as UserIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
  userType: 'user' | 'agent' | 'admin' | 'superadmin';
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  children, 
  title,
  userType 
}) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  const getSidebarItems = () => {
    const commonItems = [
      { icon: <Home className="mr-2" />, label: 'Dashboard', path: '/dashboard' },
      { icon: <UserIcon className="mr-2" />, label: 'Profile', path: '/profile' },
    ];

    const roleSpecificItems = {
      user: [
        { icon: <Building className="mr-2" />, label: 'Properties', path: '/properties' },
        { icon: <Users className="mr-2" />, label: 'Agents', path: '/agents' },
      ],
      agent: [
        { icon: <Building className="mr-2" />, label: 'My Properties', path: '/admin/properties' },
        { icon: <Users className="mr-2" />, label: 'Client Inquiries', path: '/admin/inquiries' },
      ],
      admin: [
        { icon: <Building className="mr-2" />, label: 'Properties', path: '/admin/properties' },
        { icon: <Users className="mr-2" />, label: 'Agents', path: '/admin/agent-dashboard' },
        { icon: <FileText className="mr-2" />, label: 'Reports', path: '/admin/sales-dashboard' },
      ],
      superadmin: [
        { icon: <Building className="mr-2" />, label: 'Properties', path: '/admin/properties' },
        { icon: <Users className="mr-2" />, label: 'Users', path: '/admin/users' },
        { icon: <FileText className="mr-2" />, label: 'Reports', path: '/admin/sales-dashboard' },
        { icon: <Settings className="mr-2" />, label: 'System', path: '/admin/system' },
      ],
    };

    return [...commonItems, ...roleSpecificItems[userType]];
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="hidden md:flex flex-col w-64 bg-white shadow-lg">
        <div className="flex items-center justify-center h-20 border-b">
          <h1 className="text-2xl font-bold">
            <span className="text-gold">Elite</span>Estates
          </h1>
        </div>
        <div className="flex flex-col justify-between h-full">
          <div className="p-4">
            <nav className="space-y-2">
              {getSidebarItems().map((item, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => navigate(item.path)}
                >
                  {item.icon}
                  {item.label}
                </Button>
              ))}
            </nav>
          </div>
          <div className="p-4 border-t">
            <Button
              variant="destructive"
              className="w-full justify-start"
              onClick={handleSignOut}
            >
              <LogOut className="mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="px-4 py-4 flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-semibold">{title}</h2>
              <p className="text-muted-foreground">
                Welcome, {user?.user_metadata?.full_name || 'User'}
              </p>
            </div>
            <div className="md:hidden">
              <Button variant="outline" onClick={handleSignOut}>
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </header>

        {/* Mobile menu */}
        <div className="md:hidden bg-white p-2 flex justify-around border-b">
          {getSidebarItems().slice(0, 4).map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              size="icon"
              onClick={() => navigate(item.path)}
              title={item.label}
            >
              {item.icon}
            </Button>
          ))}
        </div>

        {/* Content */}
        <main className="flex-1 overflow-auto bg-gray-50 p-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
