import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Database, Clock, AlertTriangle, Info, CheckCircle, X } from "lucide-react";
import { useSystemLogs } from "@/hooks/useSystemSettings";
import { Skeleton } from "@/components/ui/skeleton";

interface SystemLogsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SystemLogsModal({ open, onOpenChange }: SystemLogsModalProps) {
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedService, setSelectedService] = useState("all");
  const { data: systemLogs, isLoading } = useSystemLogs();

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'ERROR':
        return <X className="h-4 w-4 text-destructive" />;
      case 'WARN':
        return <AlertTriangle className="h-4 w-4 text-warning" />;
      case 'INFO':
        return <Info className="h-4 w-4 text-primary" />;
      default:
        return <CheckCircle className="h-4 w-4 text-success" />;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'ERROR':
        return 'bg-destructive text-destructive-foreground';
      case 'WARN':
        return 'bg-warning text-warning-foreground';
      case 'INFO':
        return 'bg-primary text-primary-foreground';
      default:
        return 'bg-success text-success-foreground';
    }
  };

  const getLogColor = (level: string) => {
    switch (level) {
      case 'ERROR':
        return 'border-l-destructive bg-destructive/5';
      case 'WARN':
        return 'border-l-warning bg-warning/5';
      default:
        return 'border-l-primary bg-primary/5';
    }
  };

  const filteredLogs = systemLogs?.filter(log => {
    const levelMatch = selectedLevel === "all" || log.level === selectedLevel;
    const serviceMatch = selectedService === "all" || log.service === selectedService;
    return levelMatch && serviceMatch;
  }) || [];

  const services = [...new Set((systemLogs || []).map(log => log.service))];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="flex items-center gap-2">
            <Database className="h-5 w-5 text-primary" />
            System Logs
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex gap-4 mb-4 flex-shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Level:</span>
            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="ERROR">Error</SelectItem>
                <SelectItem value="WARN">Warning</SelectItem>
                <SelectItem value="INFO">Info</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Service:</span>
            <Select value={selectedService} onValueChange={setSelectedService}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Services</SelectItem>
                {services.map(service => (
                  <SelectItem key={service} value={service}>{service}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto px-1">
          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-32 w-full" />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredLogs.map((log) => (
              <div
                key={log.id}
                className={`p-4 border-l-4 rounded-lg ${getLogColor(log.level)}`}
              >
                <div className="flex items-start gap-3">
                  {getLevelIcon(log.level)}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={getLevelColor(log.level)}>
                        {log.level}
                      </Badge>
                      <Badge variant="outline">
                        {log.service}
                      </Badge>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground ml-auto">
                        <Clock className="h-3 w-3" />
                        {log.timestamp}
                      </div>
                    </div>
                    
                    <p className="font-medium mb-1">{log.message}</p>
                    <p className="text-sm text-muted-foreground">{log.details}</p>
                  </div>
                </div>
              </div>
              ))}
              
              {filteredLogs.length === 0 && (
              <div className="text-center py-8">
                <Database className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No logs found</h3>
                <p className="text-muted-foreground">
                  No system logs match the selected filters.
                </p>
              </div>
              )}
            </div>
          )}
        </div>

        <div className="flex justify-between items-center pt-4 border-t flex-shrink-0">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <div className="flex gap-2">
            <Button variant="outline">
              Refresh Logs
            </Button>
            <Button variant="outline">
              Export Logs
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}