import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Clock, Info, CheckCircle } from "lucide-react";

interface AlertsPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const mockAlerts = [
  {
    id: "1",
    type: "critical",
    title: "ICU Capacity Alert",
    message: "ICU at 95% capacity. Consider implementing overflow protocols.",
    timestamp: "5 min ago",
    acknowledged: false
  },
  {
    id: "2",
    type: "warning", 
    title: "Multiple Admissions",
    message: "8 admissions in last hour - above normal threshold",
    timestamp: "12 min ago",
    acknowledged: false
  },
  {
    id: "3",
    type: "info",
    title: "System Sync",
    message: "ADT feed synchronized with all systems successfully",
    timestamp: "1 hour ago",
    acknowledged: true
  }
];

export function AlertsPanel({ open, onOpenChange }: AlertsPanelProps) {
  const [alerts, setAlerts] = useState(mockAlerts);

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical': return <AlertTriangle className="h-4 w-4" />;
      case 'warning': return <AlertTriangle className="h-4 w-4" />;
      case 'info': return <Info className="h-4 w-4" />;
      case 'success': return <CheckCircle className="h-4 w-4" />;
      default: return <Info className="h-4 w-4" />;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'critical': return 'bg-destructive text-destructive-foreground';
      case 'warning': return 'bg-warning text-warning-foreground';
      case 'success': return 'bg-success text-success-foreground';
      default: return 'bg-primary text-primary-foreground';
    }
  };

  const acknowledgeAlert = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, acknowledged: true } : alert
    ));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-warning" />
            System Alerts
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto px-1">
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div 
                key={alert.id} 
                className={`p-4 border rounded-lg ${alert.acknowledged ? 'opacity-60' : ''}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Badge className={getAlertColor(alert.type)}>
                      {getAlertIcon(alert.type)}
                      <span className="ml-1">{alert.type}</span>
                    </Badge>
                    {alert.acknowledged && (
                      <Badge variant="outline">Acknowledged</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {alert.timestamp}
                  </div>
                </div>
                
                <h3 className="font-semibold mb-2">{alert.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{alert.message}</p>
                
                <div className="flex gap-2">
                  {!alert.acknowledged && (
                    <Button 
                      size="sm"
                      onClick={() => acknowledgeAlert(alert.id)}
                    >
                      Acknowledge
                    </Button>
                  )}
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex gap-2 pt-4 flex-shrink-0 border-t">
          <Button 
            variant="outline" 
            onClick={() => {
              setAlerts(prev => prev.map(alert => ({ ...alert, acknowledged: true })));
            }}
          >
            Acknowledge All
          </Button>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}