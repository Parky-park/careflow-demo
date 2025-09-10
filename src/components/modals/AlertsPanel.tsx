import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertTriangle, Clock, CheckCircle, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AlertsPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AlertsPanel({ open, onOpenChange }: AlertsPanelProps) {
  const { toast } = useToast();

  const systemAlerts = [
    {
      id: "1",
      type: "critical",
      title: "ICU Capacity Critical",
      message: "ICU is at 95% capacity with only 1 bed remaining. Consider discharge planning.",
      timestamp: "2 minutes ago",
      acknowledged: false,
      source: "Capacity Management"
    },
    {
      id: "2",
      type: "warning",
      title: "Medication Stock Low",
      message: "Insulin pens are below minimum threshold (8 remaining). Reorder required.",
      timestamp: "15 minutes ago",
      acknowledged: false,
      source: "Inventory System"
    },
    {
      id: "3",
      type: "equipment",
      title: "Equipment Maintenance Due",
      message: "Ventilator V-204 in Ward 3A requires scheduled maintenance within 24 hours.",
      timestamp: "1 hour ago",
      acknowledged: true,
      source: "Equipment Management"
    },
    {
      id: "4",
      title: "Staffing Alert",
      type: "staffing",
      message: "Night shift in Emergency Department is understaffed. Additional nurse required.",
      timestamp: "2 hours ago",
      acknowledged: false,
      source: "HR System"
    },
    {
      id: "5",
      type: "patient",
      title: "High-Risk Patient Alert",
      message: "Patient Sarah Johnson (MRN-001234) shows signs of deterioration. Immediate assessment recommended.",
      timestamp: "3 hours ago",
      acknowledged: true,
      source: "Patient Monitoring"
    }
  ];

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical':
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-warning" />;
      case 'equipment':
        return <Clock className="h-4 w-4 text-accent" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-primary" />;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'critical':
        return 'border-l-destructive bg-destructive/5';
      case 'warning':
        return 'border-l-warning bg-warning/5';
      case 'equipment':
        return 'border-l-accent bg-accent/5';
      default:
        return 'border-l-primary bg-primary/5';
    }
  };

  const getSeverityBadge = (type: string) => {
    switch (type) {
      case 'critical':
        return <Badge className="bg-destructive text-destructive-foreground">Critical</Badge>;
      case 'warning':
        return <Badge className="bg-warning text-warning-foreground">Warning</Badge>;
      case 'equipment':
        return <Badge className="bg-accent text-accent-foreground">Maintenance</Badge>;
      case 'staffing':
        return <Badge className="bg-primary text-primary-foreground">Staffing</Badge>;
      case 'patient':
        return <Badge className="bg-success text-success-foreground">Patient</Badge>;
      default:
        return <Badge variant="outline">Info</Badge>;
    }
  };

  const handleAcknowledge = (alertId: string, title: string) => {
    toast({
      title: "Alert Acknowledged",
      description: `"${title}" has been acknowledged and marked as resolved.`,
    });
  };

  const handleDismiss = (alertId: string, title: string) => {
    toast({
      title: "Alert Dismissed",
      description: `"${title}" has been dismissed.`,
    });
  };

  const activeAlerts = systemAlerts.filter(alert => !alert.acknowledged);
  const acknowledgedAlerts = systemAlerts.filter(alert => alert.acknowledged);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-warning" />
            System Alerts ({activeAlerts.length} active)
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="h-[60vh]">
          <div className="space-y-6">
            {/* Active Alerts */}
            {activeAlerts.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-semibold text-destructive flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Active Alerts ({activeAlerts.length})
                </h3>
                {activeAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-4 border-l-4 rounded-lg ${getAlertColor(alert.type)}`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 flex-1">
                        {getAlertIcon(alert.type)}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-medium">{alert.title}</h4>
                            {getSeverityBadge(alert.type)}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {alert.message}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {alert.timestamp}
                            </span>
                            <span>Source: {alert.source}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleAcknowledge(alert.id, alert.title)}
                          className="gap-1"
                        >
                          <CheckCircle className="h-3 w-3" />
                          Acknowledge
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDismiss(alert.id, alert.title)}
                          className="gap-1"
                        >
                          <X className="h-3 w-3" />
                          Dismiss
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Acknowledged Alerts */}
            {acknowledgedAlerts.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-semibold text-muted-foreground flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Recently Acknowledged ({acknowledgedAlerts.length})
                </h3>
                {acknowledgedAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="p-4 border-l-4 border-l-muted bg-muted/20 rounded-lg opacity-60"
                  >
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-4 w-4 text-success mt-0.5" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-sm">{alert.title}</h4>
                          <Badge variant="outline" className="text-xs">Acknowledged</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">
                          {alert.message}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>{alert.timestamp}</span>
                          <span>Source: {alert.source}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {systemAlerts.length === 0 && (
              <div className="text-center py-8">
                <CheckCircle className="h-12 w-12 mx-auto text-success mb-4" />
                <h3 className="text-lg font-medium mb-2">All Clear!</h3>
                <p className="text-muted-foreground">
                  No active system alerts at this time.
                </p>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="flex justify-between items-center pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          {activeAlerts.length > 0 && (
            <Button 
              onClick={() => {
                toast({
                  title: "All Alerts Acknowledged",
                  description: `${activeAlerts.length} alerts have been marked as acknowledged.`,
                });
              }}
            >
              Acknowledge All ({activeAlerts.length})
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}