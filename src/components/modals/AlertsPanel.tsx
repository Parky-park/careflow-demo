import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertTriangle, Clock, CheckCircle, X, Bell, BellOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AlertsPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Alert {
  id: string;
  type: 'critical' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: string;
  location?: string;
  acknowledged: boolean;
}

const mockAlerts: Alert[] = [
  {
    id: "1",
    type: "critical",
    title: "Patient in Distress",
    message: "Patient Sarah Johnson (Room 302) showing signs of cardiac distress. Immediate attention required.",
    timestamp: "2 min ago",
    location: "Room 302",
    acknowledged: false
  },
  {
    id: "2", 
    type: "warning",
    title: "Equipment Malfunction",
    message: "Ventilator in ICU Bay 3 reporting calibration errors. Maintenance team notified.",
    timestamp: "8 min ago",
    location: "ICU Bay 3",
    acknowledged: false
  },
  {
    id: "3",
    type: "warning",
    title: "Low Inventory Alert", 
    message: "Insulin rapid-acting supply critically low (8 units remaining). Reorder required.",
    timestamp: "15 min ago",
    location: "Pharmacy",
    acknowledged: true
  },
  {
    id: "4",
    type: "info",
    title: "Shift Change Reminder",
    message: "Nursing shift change in 30 minutes. Please complete handoff documentation.",
    timestamp: "22 min ago",
    acknowledged: false
  },
  {
    id: "5",
    type: "critical",
    title: "Emergency Admission",
    message: "Multiple trauma patients incoming via ambulance. ETA: 5 minutes. OR prep required.",
    timestamp: "25 min ago",
    location: "Emergency Department", 
    acknowledged: true
  }
];

export function AlertsPanel({ open, onOpenChange }: AlertsPanelProps) {
  const { toast } = useToast();

  const getSeverityColor = (type: string) => {
    switch (type) {
      case 'critical': return 'bg-destructive text-destructive-foreground';
      case 'warning': return 'bg-warning text-warning-foreground';
      case 'info': return 'bg-blue-500 text-white';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getSeverityIcon = (type: string) => {
    switch (type) {
      case 'critical': return <AlertTriangle className="h-4 w-4" />;
      case 'warning': return <Clock className="h-4 w-4" />;
      case 'info': return <Bell className="h-4 w-4" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  const handleAcknowledge = (alertId: string) => {
    toast({
      title: "Alert Acknowledged",
      description: "Alert has been marked as acknowledged.",
    });
  };

  const handleDismiss = (alertId: string) => {
    toast({
      title: "Alert Dismissed",
      description: "Alert has been dismissed and removed.",
    });
  };

  const unacknowledgedCount = mockAlerts.filter(alert => !alert.acknowledged).length;
  const criticalCount = mockAlerts.filter(alert => alert.type === 'critical' && !alert.acknowledged).length;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] h-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-primary" />
            System Alerts
            <Badge variant={criticalCount > 0 ? "destructive" : "secondary"}>
              {unacknowledgedCount} Active
            </Badge>
          </DialogTitle>
          <DialogDescription>
            Monitor and manage real-time system alerts and notifications.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col h-full">
          {/* Alert Summary */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <Card className="border-l-4 border-l-destructive">
              <CardContent className="p-3">
                <div className="text-center">
                  <p className="text-lg font-bold text-destructive">{criticalCount}</p>
                  <p className="text-xs text-muted-foreground">Critical</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-warning">
              <CardContent className="p-3">
                <div className="text-center">
                  <p className="text-lg font-bold text-warning">
                    {mockAlerts.filter(a => a.type === 'warning' && !a.acknowledged).length}
                  </p>
                  <p className="text-xs text-muted-foreground">Warnings</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-blue-500">
              <CardContent className="p-3">
                <div className="text-center">
                  <p className="text-lg font-bold text-blue-600">
                    {mockAlerts.filter(a => a.type === 'info' && !a.acknowledged).length}
                  </p>
                  <p className="text-xs text-muted-foreground">Info</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Alerts List */}
          <ScrollArea className="flex-1">
            <div className="space-y-3">
              {mockAlerts.map((alert) => (
                <Card key={alert.id} className={`${alert.acknowledged ? 'opacity-60' : ''}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Badge className={getSeverityColor(alert.type)}>
                          {getSeverityIcon(alert.type)}
                          {alert.type}
                        </Badge>
                        {alert.acknowledged && (
                          <Badge variant="outline" className="gap-1">
                            <CheckCircle className="h-3 w-3" />
                            Acknowledged
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {alert.timestamp}
                      </div>
                    </div>

                    <h4 className="font-medium mb-2">{alert.title}</h4>
                    <p className="text-sm text-muted-foreground mb-3">{alert.message}</p>
                    
                    {alert.location && (
                      <div className="text-xs text-muted-foreground mb-3">
                        Location: {alert.location}
                      </div>
                    )}

                    <div className="flex gap-2">
                      {!alert.acknowledged ? (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleAcknowledge(alert.id)}
                        >
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Acknowledge
                        </Button>
                      ) : (
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="text-muted-foreground"
                          disabled
                        >
                          <BellOff className="h-3 w-3 mr-1" />
                          Acknowledged
                        </Button>
                      )}
                      
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => handleDismiss(alert.id)}
                      >
                        <X className="h-3 w-3 mr-1" />
                        Dismiss
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}