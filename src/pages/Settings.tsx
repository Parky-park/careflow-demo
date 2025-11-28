import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { ChangePasswordModal } from "@/components/modals/ChangePasswordModal";
import { SecurityLogModal } from "@/components/modals/SecurityLogModal";
import { SystemLogsModal } from "@/components/modals/SystemLogsModal";
import { ManageIntegrationsModal } from "@/components/modals/ManageIntegrationsModal";
import { EditProfileModal } from "@/components/modals/EditProfileModal";
import { TwoFactorModal } from "@/components/modals/TwoFactorModal";
import { BackupModal } from "@/components/modals/BackupModal";
import { LanguageModal } from "@/components/modals/LanguageModal";
import { TimezoneModal } from "@/components/modals/TimezoneModal";
import { useToast } from "@/hooks/use-toast";
import { useUserProfile, useUserPreferences, useUpdatePreferences } from "@/hooks/useUserSettings";
import { Settings as SettingsIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { data: profile, isLoading: profileLoading } = useUserProfile();
  const { data: preferences, isLoading: preferencesLoading } = useUserPreferences();
  const updatePreferences = useUpdatePreferences();
  
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [showSecurityLogModal, setShowSecurityLogModal] = useState(false);
  const [showSystemLogsModal, setShowSystemLogsModal] = useState(false);
  const [showManageIntegrationsModal, setShowManageIntegrationsModal] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [showTwoFactorModal, setShowTwoFactorModal] = useState(false);
  const [showBackupModal, setShowBackupModal] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showTimezoneModal, setShowTimezoneModal] = useState(false);

  const handleThemeChange = (theme: string) => {
    updatePreferences.mutate({ theme });
  };

  const handleNotificationToggle = (key: string, value: boolean) => {
    updatePreferences.mutate({ [key]: value });
  };

  if (profileLoading || preferencesLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-20 w-full" />
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  const initials = profile?.full_name 
    ? profile.full_name.split(' ').map((n: string) => n[0]).join('').toUpperCase()
    : profile?.email?.substring(0, 2).toUpperCase() || 'U';

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
                <span className="text-xl font-semibold text-primary">{initials}</span>
              </div>
              <div>
                <h3 className="font-semibold">{profile?.full_name || 'User'}</h3>
                <p className="text-sm text-muted-foreground">{profile?.email}</p>
              </div>
            </div>
            <Button className="w-full" variant="outline" onClick={() => setShowEditProfileModal(true)}>
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
              onClick={() => setShowTwoFactorModal(true)}
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
              onClick={() => setShowBackupModal(true)}
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
                <Button 
                  variant={preferences?.theme === 'light' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => handleThemeChange('light')}
                >
                  Light
                </Button>
                <Button 
                  variant={preferences?.theme === 'dark' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => handleThemeChange('dark')}
                >
                  Dark
                </Button>
                <Button 
                  variant={preferences?.theme === 'auto' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => handleThemeChange('auto')}
                >
                  Auto
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Language</label>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => setShowLanguageModal(true)}
              >
                {preferences?.language || 'en-US'}
              </Button>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Timezone</label>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => setShowTimezoneModal(true)}
              >
                {preferences?.timezone || 'UTC-5'}
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
              <Switch
                checked={preferences?.email_notifications ?? true}
                onCheckedChange={(checked) => handleNotificationToggle('email_notifications', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">SMS Alerts</span>
              <Switch
                checked={preferences?.sms_alerts ?? true}
                onCheckedChange={(checked) => handleNotificationToggle('sms_alerts', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Push Notifications</span>
              <Switch
                checked={preferences?.push_notifications ?? false}
                onCheckedChange={(checked) => handleNotificationToggle('push_notifications', checked)}
              />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <EditProfileModal open={showEditProfileModal} onOpenChange={setShowEditProfileModal} />
      <ChangePasswordModal open={showChangePasswordModal} onOpenChange={setShowChangePasswordModal} />
      <SecurityLogModal open={showSecurityLogModal} onOpenChange={setShowSecurityLogModal} />
      <SystemLogsModal open={showSystemLogsModal} onOpenChange={setShowSystemLogsModal} />
      <ManageIntegrationsModal open={showManageIntegrationsModal} onOpenChange={setShowManageIntegrationsModal} />
      <TwoFactorModal open={showTwoFactorModal} onOpenChange={setShowTwoFactorModal} />
      <BackupModal open={showBackupModal} onOpenChange={setShowBackupModal} />
      <LanguageModal 
        open={showLanguageModal} 
        onOpenChange={setShowLanguageModal}
        currentLanguage={preferences?.language || 'en-US'}
      />
      <TimezoneModal 
        open={showTimezoneModal} 
        onOpenChange={setShowTimezoneModal}
        currentTimezone={preferences?.timezone || 'UTC-5'}
      />
    </div>
  );
};

export default Settings;