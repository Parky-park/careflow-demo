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

      <Card>
        <CardHeader>
          <CardTitle>System Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Settings content here...</p>
        </CardContent>
      </Card>
      
      <ChangePasswordModal open={showChangePasswordModal} onOpenChange={setShowChangePasswordModal} />
      <SecurityLogModal open={showSecurityLogModal} onOpenChange={setShowSecurityLogModal} />
      <SystemLogsModal open={showSystemLogsModal} onOpenChange={setShowSystemLogsModal} />
      <ManageIntegrationsModal open={showManageIntegrationsModal} onOpenChange={setShowManageIntegrationsModal} />
    </div>
  );
};

export default Settings;