import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Clock, MapPin, Monitor, Smartphone, AlertTriangle } from "lucide-react";
import { useSecurityLogs } from "@/hooks/useSystemSettings";
import { Skeleton } from "@/components/ui/skeleton";

interface SecurityLogModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SecurityLogModal({ open, onOpenChange }: SecurityLogModalProps) {
  const { data: securityLogs, isLoading } = useSecurityLogs();

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
          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-32 w-full" />
              ))}
            </div>
          ) : securityLogs && securityLogs.length > 0 ? (
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
                          {new Date(log.created_at).toLocaleString()}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-3 w-3" />
                          {log.location}
                        </div>
                        <div className="flex items-center gap-2">
                          {getDeviceIcon(log.device_type || 'desktop')}
                          {log.device}
                        </div>
                        <div className="flex items-center gap-2">
                          <span>IP: {log.ip_address}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Shield className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No security logs</h3>
              <p className="text-muted-foreground">
                Your security activity will appear here
              </p>
            </div>
          )}
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