import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { 
  Shield, 
  Mail, 
  Server, 
  Database, 
  Upload, 
  RefreshCw, 
  Check, 
  Save
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const SystemSettings = () => {
  const { isSuperAdmin } = useAuth();
  const [emailSettings, setEmailSettings] = useState({
    smtpServer: 'smtp.example.com',
    smtpPort: '587',
    smtpUsername: 'notifications@example.com',
    smtpPassword: '••••••••••••',
    fromEmail: 'noreply@example.com',
    fromName: 'Elite Estates'
  });
  
  const [securitySettings, setSecuritySettings] = useState({
    enableMfa: true,
    passwordMinLength: '8',
    passwordRequireSpecial: true,
    passwordRequireNumbers: true,
    sessionTimeout: '60',
    maxLoginAttempts: '5'
  });
  
  const [generalSettings, setGeneralSettings] = useState({
    siteName: 'Elite Estates',
    supportEmail: 'support@example.com',
    supportPhone: '+1 (555) 123-4567',
    enableMaintenance: false,
    debugMode: false,
    cacheLifetime: '60'
  });

  const handleSaveSettings = (settingsType: string) => {
    // In a real application, this would save the settings to the database
    toast({
      title: "Settings updated",
      description: `${settingsType} settings have been saved successfully.`,
    });
  };

  const handleRunMaintenance = (task: string) => {
    toast({
      title: "Maintenance task initiated",
      description: `${task} task has been started. This may take a few minutes.`,
    });
  };

  return (
    <DashboardLayout title="System Settings" userType="superadmin">
      <Tabs defaultValue="general">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Configure basic system settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="siteName" className="font-medium">Site Name</label>
                  <Input 
                    id="siteName" 
                    value={generalSettings.siteName}
                    onChange={(e) => setGeneralSettings({...generalSettings, siteName: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="supportEmail" className="font-medium">Support Email</label>
                  <Input 
                    id="supportEmail" 
                    value={generalSettings.supportEmail}
                    onChange={(e) => setGeneralSettings({...generalSettings, supportEmail: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="supportPhone" className="font-medium">Support Phone</label>
                  <Input 
                    id="supportPhone" 
                    value={generalSettings.supportPhone}
                    onChange={(e) => setGeneralSettings({...generalSettings, supportPhone: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="cacheLifetime" className="font-medium">Cache Lifetime (minutes)</label>
                  <Input 
                    id="cacheLifetime" 
                    value={generalSettings.cacheLifetime}
                    onChange={(e) => setGeneralSettings({...generalSettings, cacheLifetime: e.target.value})}
                  />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Maintenance Mode</h3>
                    <p className="text-sm text-muted-foreground">
                      When enabled, the site will be inaccessible to regular users
                    </p>
                  </div>
                  <Switch 
                    checked={generalSettings.enableMaintenance}
                    onCheckedChange={(checked) => setGeneralSettings({...generalSettings, enableMaintenance: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Debug Mode</h3>
                    <p className="text-sm text-muted-foreground">
                      Show detailed error messages and debugging information
                    </p>
                  </div>
                  <Switch 
                    checked={generalSettings.debugMode}
                    onCheckedChange={(checked) => setGeneralSettings({...generalSettings, debugMode: checked})}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-end">
              <Button onClick={() => handleSaveSettings('General')}>
                <Save className="mr-2" size={18} />
                Save Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Configure authentication and security options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="passwordMinLength" className="font-medium">Minimum Password Length</label>
                  <Input 
                    id="passwordMinLength" 
                    value={securitySettings.passwordMinLength}
                    onChange={(e) => setSecuritySettings({...securitySettings, passwordMinLength: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="sessionTimeout" className="font-medium">Session Timeout (minutes)</label>
                  <Input 
                    id="sessionTimeout" 
                    value={securitySettings.sessionTimeout}
                    onChange={(e) => setSecuritySettings({...securitySettings, sessionTimeout: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="maxLoginAttempts" className="font-medium">Max Login Attempts</label>
                  <Input 
                    id="maxLoginAttempts" 
                    value={securitySettings.maxLoginAttempts}
                    onChange={(e) => setSecuritySettings({...securitySettings, maxLoginAttempts: e.target.value})}
                  />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Enable Multi-Factor Authentication</h3>
                    <p className="text-sm text-muted-foreground">
                      Require MFA for all admin and superadmin users
                    </p>
                  </div>
                  <Switch 
                    checked={securitySettings.enableMfa}
                    onCheckedChange={(checked) => setSecuritySettings({...securitySettings, enableMfa: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Require Special Characters</h3>
                    <p className="text-sm text-muted-foreground">
                      Passwords must contain special characters
                    </p>
                  </div>
                  <Switch 
                    checked={securitySettings.passwordRequireSpecial}
                    onCheckedChange={(checked) => setSecuritySettings({...securitySettings, passwordRequireSpecial: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Require Numbers</h3>
                    <p className="text-sm text-muted-foreground">
                      Passwords must contain at least one number
                    </p>
                  </div>
                  <Switch 
                    checked={securitySettings.passwordRequireNumbers}
                    onCheckedChange={(checked) => setSecuritySettings({...securitySettings, passwordRequireNumbers: checked})}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-end">
              <Button onClick={() => handleSaveSettings('Security')}>
                <Shield className="mr-2" size={18} />
                Save Security Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle>Email Configuration</CardTitle>
              <CardDescription>Configure email sending settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="smtpServer" className="font-medium">SMTP Server</label>
                  <Input 
                    id="smtpServer" 
                    value={emailSettings.smtpServer}
                    onChange={(e) => setEmailSettings({...emailSettings, smtpServer: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="smtpPort" className="font-medium">SMTP Port</label>
                  <Input 
                    id="smtpPort" 
                    value={emailSettings.smtpPort}
                    onChange={(e) => setEmailSettings({...emailSettings, smtpPort: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="smtpUsername" className="font-medium">SMTP Username</label>
                  <Input 
                    id="smtpUsername" 
                    value={emailSettings.smtpUsername}
                    onChange={(e) => setEmailSettings({...emailSettings, smtpUsername: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="smtpPassword" className="font-medium">SMTP Password</label>
                  <Input 
                    id="smtpPassword" 
                    type="password"
                    value={emailSettings.smtpPassword}
                    onChange={(e) => setEmailSettings({...emailSettings, smtpPassword: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="fromEmail" className="font-medium">From Email</label>
                  <Input 
                    id="fromEmail" 
                    value={emailSettings.fromEmail}
                    onChange={(e) => setEmailSettings({...emailSettings, fromEmail: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="fromName" className="font-medium">From Name</label>
                  <Input 
                    id="fromName" 
                    value={emailSettings.fromName}
                    onChange={(e) => setEmailSettings({...emailSettings, fromName: e.target.value})}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-between">
              <Button variant="outline" onClick={() => toast({ title: "Test email sent", description: "A test email has been sent to verify your SMTP settings." })}>
                <Mail className="mr-2" size={18} />
                Send Test Email
              </Button>
              <Button onClick={() => handleSaveSettings('Email')}>
                <Save className="mr-2" size={18} />
                Save Email Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="maintenance">
          <Card>
            <CardHeader>
              <CardTitle>System Maintenance</CardTitle>
              <CardDescription>Perform maintenance tasks and optimize system performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                  <div>
                    <h3 className="font-medium">Clear Cache</h3>
                    <p className="text-sm text-muted-foreground">
                      Reset all system caches to improve performance
                    </p>
                  </div>
                  <Button variant="outline" onClick={() => handleRunMaintenance('Clear Cache')}>
                    <RefreshCw className="mr-2" size={18} />
                    Clear Now
                  </Button>
                </div>
                
                <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                  <div>
                    <h3 className="font-medium">Backup Database</h3>
                    <p className="text-sm text-muted-foreground">
                      Create a full backup of the database
                    </p>
                  </div>
                  <Button variant="outline" onClick={() => handleRunMaintenance('Database Backup')}>
                    <Database className="mr-2" size={18} />
                    Backup Now
                  </Button>
                </div>
                
                <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                  <div>
                    <h3 className="font-medium">Check System Status</h3>
                    <p className="text-sm text-muted-foreground">
                      Verify all system components are working correctly
                    </p>
                  </div>
                  <Button variant="outline" onClick={() => handleRunMaintenance('System Check')}>
                    <Check className="mr-2" size={18} />
                    Run Check
                  </Button>
                </div>
                
                <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                  <div>
                    <h3 className="font-medium">Update System</h3>
                    <p className="text-sm text-muted-foreground">
                      Check for and apply any available updates
                    </p>
                  </div>
                  <Button variant="outline" onClick={() => handleRunMaintenance('System Update')}>
                    <Upload className="mr-2" size={18} />
                    Check Updates
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default SystemSettings;
