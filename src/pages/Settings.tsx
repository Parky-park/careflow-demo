import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChangePasswordModal } from "@/components/modals/ChangePasswordModal";
import { SecurityLogModal } from "@/components/modals/SecurityLogModal";
import { SystemLogsModal } from "@/components/modals/SystemLogsModal";
import { ManageIntegrationsModal } from "@/components/modals/ManageIntegrationsModal";
import { useToast } from "@/hooks/use-toast";
import { Settings as SettingsIcon } from "lucide-react";
import { useState } from "react";

const Settings = () => {
  const { toast } = useToast();
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [showSecurityLogModal, setShowSecurityLogModal] = useState(false);
  const [showSystemLogsModal, setShowSystemLogsModal] = useState(false);
  const [showManageIntegrationsModal, setShowManageIntegrationsModal] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
          <SettingsIcon className="h-8 w-8 text-primary" />
          System Settings
        </h1>
        <p className="text-muted-foreground mt-2">
          Configure system preferences and security settings
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>User Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-xl font-semibold text-primary">DR</span>
              </div>
              <div>
                <h3 className="font-semibold">Dr. Richard Chen</h3>
                <p className="text-sm text-muted-foreground">Chief Medical Officer</p>
                <p className="text-sm text-muted-foreground">richard.chen@careflow.health</p>
              </div>
            </div>
            <div className="space-y-2 pt-4 border-t">
              <div className="flex justify-between text-sm">
                <span>Department:</span>
                <span className="font-medium">Cardiology</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Employee ID:</span>
                <span className="font-medium">CMO-001</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>License:</span>
                <span className="font-medium">MD-CAL-12345</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Last Login:</span>
                <span className="font-medium">Today, 9:15 AM</span>
              </div>
            </div>
            <Button className="w-full" variant="outline">
              Edit Profile
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Account Security</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => setShowChangePasswordModal(true)}
            >
              Change Password
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => setShowSecurityLogModal(true)}
            >
              View Security Log
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => toast({ title: "Two-Factor Authentication", description: "2FA configuration opened." })}
            >
              Two-Factor Authentication
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Management</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => setShowManageIntegrationsModal(true)}
            >
              Manage Integrations
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => setShowSystemLogsModal(true)}
            >
              System Logs
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => toast({ title: "Backup Settings", description: "Backup configuration opened." })}
            >
              Backup & Recovery
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Theme</label>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Light</Button>
                <Button variant="outline" size="sm">Dark</Button>
                <Button variant="default" size="sm">Auto</Button>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Language</label>
              <Button variant="outline" className="w-full justify-start">
                English (US)
              </Button>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Timezone</label>
              <Button variant="outline" className="w-full justify-start">
                UTC-5 (Eastern Time)
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Email Notifications</span>
              <Button variant="outline" size="sm">Enabled</Button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">SMS Alerts</span>
              <Button variant="outline" size="sm">Enabled</Button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Push Notifications</span>
              <Button variant="outline" size="sm">Disabled</Button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Security Alerts</span>
              <Button variant="default" size="sm">Always On</Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <ChangePasswordModal open={showChangePasswordModal} onOpenChange={setShowChangePasswordModal} />
      <SecurityLogModal open={showSecurityLogModal} onOpenChange={setShowSecurityLogModal} />
      <SystemLogsModal open={showSystemLogsModal} onOpenChange={setShowSystemLogsModal} />
      <ManageIntegrationsModal open={showManageIntegrationsModal} onOpenChange={setShowManageIntegrationsModal} />
    </div>
  );
};

export default Settings;