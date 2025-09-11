import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Settings, Bell, Mail, Phone } from "lucide-react";

const NotificationSettings = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/notifications')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Notifications
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Settings className="h-8 w-8 text-primary" />
            Notification Settings
          </h1>
          <p className="text-muted-foreground mt-2">Configure your notification preferences</p>
        </div>
      </div>

      {/* Email Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Email Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="email-alerts">Critical Alerts</Label>
            <Switch id="email-alerts" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="email-reports">Daily Reports</Label>
            <Switch id="email-reports" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="email-updates">System Updates</Label>
            <Switch id="email-updates" />
          </div>
        </CardContent>
      </Card>

      {/* Push Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Push Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="push-critical">Critical Patient Events</Label>
            <Switch id="push-critical" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="push-messages">New Messages</Label>
            <Switch id="push-messages" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="push-schedule">Schedule Reminders</Label>
            <Switch id="push-schedule" />
          </div>
        </CardContent>
      </Card>

      {/* SMS Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5" />
            SMS Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="sms-emergency">Emergency Alerts Only</Label>
            <Switch id="sms-emergency" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="sms-oncall">On-Call Notifications</Label>
            <Switch id="sms-oncall" />
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button onClick={() => navigate('/notifications')}>
          Save Settings
        </Button>
        <Button variant="outline" onClick={() => navigate('/notifications')}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default NotificationSettings;