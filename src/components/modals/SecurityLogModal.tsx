import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Shield, Clock, MapPin, Monitor, Smartphone, AlertTriangle } from "lucide-react";

interface SecurityLogModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SecurityLogModal({ open, onOpenChange }: SecurityLogModalProps) {
  const securityLogs = [
    {
      id: "1",
      event: "Successful Login",
      timestamp: "2024-01-09 14:32:15",
      ipAddress: "192.168.1.100",
      location: "Toronto, Canada",
      device: "Chrome on Windows 11",
      deviceType: "desktop",
      status: "success"
    },
    {
      id: "2",
      event: "Password Changed",
      timestamp: "2024-01-08 09:15:42",
      ipAddress: "192.168.1.100",
      location: "Toronto, Canada",
      device: "Chrome on Windows 11",
      deviceType: "desktop",
      status: "success"
    },
    {
      id: "3",
      event: "Failed Login Attempt",
      timestamp: "2024-01-07 18:45:23",
      ipAddress: "203.0.113.42",
      location: "Unknown",
      device: "Firefox on Linux",
      deviceType: "desktop",
      status: "warning"
    },
    {
      id: "4",
      event: "Two-Factor Authentication Enabled", 
      timestamp: "2024-01-07 10:22:11",
      ipAddress: "192.168.1.100",
      location: "Toronto, Canada",
      device: "Chrome on Windows 11",
      deviceType: "desktop",
      status: "success"
    },
    {
      id: "5",
      event: "Successful Login",
      timestamp: "2024-01-07 08:30:45",
      ipAddress: "192.168.1.100",
      location: "Toronto, Canada",
      device: "Safari on iPhone 15",
      deviceType: "mobile",
      status: "success"
    },
    {
      id: "6",
      event: "Account Locked (Multiple Failed Attempts)",
      timestamp: "2024-01-06 22:15:33",
      ipAddress: "198.51.100.23",
      location: "New York, USA",
      device: "Chrome on Android",
      deviceType: "mobile",
      status: "critical"
    },
    {
      id: "7",
      event: "Successful Login",
      timestamp: "2024-01-06 07:45:12",
      ipAddress: "192.168.1.100",
      location: "Toronto, Canada",
      device: "Chrome on Windows 11",
      deviceType: "desktop",
      status: "success"
    }
  ];

  const getEventIcon = (event: string) => {
    if (event.includes("Login")) return <Shield className="h-4 w-4" />;
    if (event.includes("Password")) return <Shield className="h-4 w-4" />;
    if (event.includes("Two-Factor")) return <Shield className="h-4 w-4" />;
    if (event.includes("Locked")) return <AlertTriangle className="h-4 w-4" />;
    return <Shield className="h-4 w-4" />;
  };

  const getDeviceIcon = (deviceType: string) => {
    return deviceType === "mobile" ? 
      <Smartphone className="h-3 w-3" /> : 
      <Monitor className="h-3 w-3" />;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-success text-success-foreground';
      case 'warning':
        return 'bg-warning text-warning-foreground';
      case 'critical':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getEventColor = (status: string) => {
    switch (status) {
      case 'critical':
        return 'border-l-destructive bg-destructive/5';
      case 'warning':
        return 'border-l-warning bg-warning/5';
      default:
        return 'border-l-success bg-success/5';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Security Activity Log
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto px-1">
          <div className="space-y-3">
            {securityLogs.map((log) => (
              <div
                key={log.id}
                className={`p-4 border-l-4 rounded-lg ${getEventColor(log.status)}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="p-2 rounded-full bg-muted">
                      {getEventIcon(log.event)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-medium">{log.event}</h4>
                        <Badge className={getStatusColor(log.status)}>
                          {log.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Clock className="h-3 w-3" />
                          {log.timestamp}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-3 w-3" />
                          {log.location}
                        </div>
                        <div className="flex items-center gap-2">
                          {getDeviceIcon(log.deviceType)}
                          {log.device}
                        </div>
                        <div className="flex items-center gap-2">
                          <span>IP: {log.ipAddress}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 border-t flex-shrink-0">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button variant="outline">
            Export Security Log
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}