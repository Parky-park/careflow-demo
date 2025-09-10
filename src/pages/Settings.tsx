import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { NavigationSidebar } from "@/components/dashboard/NavigationSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ChangePasswordModal } from "@/components/modals/ChangePasswordModal";
import { SecurityLogModal } from "@/components/modals/SecurityLogModal";
import { SystemLogsModal } from "@/components/modals/SystemLogsModal";
import { ManageIntegrationsModal } from "@/components/modals/ManageIntegrationsModal";
import { useToast } from "@/hooks/use-toast";
import { Settings as SettingsIcon, Shield, Bell, User, Database, Zap, Lock, Key } from "lucide-react";
import { useState } from "react";

const Settings = () => {
  const { toast } = useToast();
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [showSecurityLogModal, setShowSecurityLogModal] = useState(false);
  const [showSystemLogsModal, setShowSystemLogsModal] = useState(false);
  const [showManageIntegrationsModal, setShowManageIntegrationsModal] = useState(false);

  const handleUpdateProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile information has been successfully updated.",
    });
  };

  const handleExportData = () => {
    toast({
      title: "Data Export Started",
      description: "Your data export is being prepared. You will receive an email when it's ready for download.",
    });
    
    // Simulate export progress
    setTimeout(() => {
      toast({
        title: "Data Export Complete",
        description: "Your data has been exported successfully. Download link sent to your email.",
      });
    }, 3000);
  };

  return (
    <div className="h-screen bg-gradient-to-br from-background via-background to-muted/20 flex flex-col">
      <DashboardHeader />
      
      <div className="flex flex-1 overflow-hidden">
        <NavigationSidebar />
        
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="space-y-6">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
                <SettingsIcon className="h-8 w-8 text-primary" />
                System Settings
              </h1>
              <p className="text-muted-foreground mt-2">
                Configure CareFlow Dashboard preferences and system parameters
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* User Profile */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-primary" />
                    User Profile
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" defaultValue="Dr. Sarah Wilson" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" defaultValue="sarah.wilson@careflow.health" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Input id="role" defaultValue="Primary Care Provider" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Input id="department" defaultValue="Cardiology" />
                  </div>
                  
                  <Button className="w-full" onClick={handleUpdateProfile}>Update Profile</Button>
                </CardContent>
              </Card>

              {/* Security Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Security & Authentication
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Biometric Login</Label>
                      <p className="text-sm text-muted-foreground">
                        Use fingerprint or face recognition
                      </p>
                    </div>
                    <Switch />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Session Timeout</Label>
                    <Input defaultValue="30 minutes" />
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1 gap-2" onClick={() => setShowChangePasswordModal(true)}>
                      <Key className="h-4 w-4" />
                      Change Password
                    </Button>
                    <Button variant="outline" className="flex-1 gap-2" onClick={() => setShowSecurityLogModal(true)}>
                      <Lock className="h-4 w-4" />
                      Security Log
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Notification Preferences */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-primary" />
                    Notification Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Critical Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        High-priority patient alerts and emergencies
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Patient Updates</Label>
                      <p className="text-sm text-muted-foreground">
                        Routine patient status changes
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>System Maintenance</Label>
                      <p className="text-sm text-muted-foreground">
                        Scheduled maintenance and updates
                      </p>
                    </div>
                    <Switch />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Team Messages</Label>
                      <p className="text-sm text-muted-foreground">
                        Messages from care team members
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>

              {/* AI & Analytics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-accent" />
                    AI & Analytics Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Predictive Analytics</Label>
                      <p className="text-sm text-muted-foreground">
                        Enable AI-powered patient risk predictions
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Auto-Suggestions</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive AI-generated care recommendations
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Confidence Threshold</Label>
                    <Input defaultValue="85%" />
                    <p className="text-xs text-muted-foreground">
                      Minimum confidence level for AI recommendations
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Data Analytics</Label>
                      <p className="text-sm text-muted-foreground">
                        Participate in anonymized research data
                      </p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>

              {/* System Integration */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5 text-primary" />
                    System Integration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">FHIR API Connection</p>
                        <p className="text-sm text-muted-foreground">Healthcare data interoperability</p>
                      </div>
                      <Badge className="bg-success text-success-foreground">Connected</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Provincial Health Registry</p>
                        <p className="text-sm text-muted-foreground">Real-time patient updates</p>
                      </div>
                      <Badge className="bg-success text-success-foreground">Connected</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Laboratory Systems</p>
                        <p className="text-sm text-muted-foreground">Lab results integration</p>
                      </div>
                      <Badge className="bg-warning text-warning-foreground">Pending</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Pharmacy Network</p>
                        <p className="text-sm text-muted-foreground">Prescription management</p>
                      </div>
                      <Badge className="bg-success text-success-foreground">Connected</Badge>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full" onClick={() => setShowManageIntegrationsModal(true)}>
                    Manage Integrations
                  </Button>
                </CardContent>
              </Card>

              {/* System Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5 text-primary" />
                    System Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">System Version</p>
                      <p className="font-medium">CareFlow v2.4.1</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Last Update</p>
                      <p className="font-medium">Jan 5, 2024</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Server Status</p>
                      <Badge className="bg-success text-success-foreground">Operational</Badge>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Data Backup</p>
                      <Badge className="bg-success text-success-foreground">Current</Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Storage Usage</Label>
                    <div className="h-2 bg-muted rounded-full">
                      <div className="h-full bg-primary w-3/4 rounded-full" />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      74% of 1TB used (742 GB available)
                    </p>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1" onClick={() => setShowSystemLogsModal(true)}>
                      System Logs
                    </Button>
                    <Button variant="outline" className="flex-1" onClick={handleExportData}>
                      Export Data
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
      
      <ChangePasswordModal 
        open={showChangePasswordModal} 
        onOpenChange={setShowChangePasswordModal} 
      />
      <SecurityLogModal 
        open={showSecurityLogModal} 
        onOpenChange={setShowSecurityLogModal} 
      />
      <SystemLogsModal 
        open={showSystemLogsModal} 
        onOpenChange={setShowSystemLogsModal} 
      />
      <ManageIntegrationsModal 
        open={showManageIntegrationsModal} 
        onOpenChange={setShowManageIntegrationsModal} 
      />
    </div>
  );
};

export default Settings;