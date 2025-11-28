import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Database, Wifi, WifiOff, Settings, Plus } from "lucide-react";
import { useIntegrations, useUpdateIntegration } from "@/hooks/useSystemSettings";
import { Skeleton } from "@/components/ui/skeleton";

interface ManageIntegrationsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ManageIntegrationsModal({ open, onOpenChange }: ManageIntegrationsModalProps) {
  const { toast } = useToast();
  const { data: integrations, isLoading } = useIntegrations();
  const updateIntegration = useUpdateIntegration();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
        return 'bg-success text-success-foreground';
      case 'pending':
        return 'bg-warning text-warning-foreground';
      case 'error':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
        return <Wifi className="h-4 w-4" />;
      case 'error':
        return <WifiOff className="h-4 w-4" />;
      default:
        return <Settings className="h-4 w-4" />;
    }
  };

  const handleToggleIntegration = (id: string, currentEnabled: boolean) => {
    updateIntegration.mutate({ id, enabled: !currentEnabled });
  };

  const handleTestConnection = (integration: any) => {
    toast({
      title: "Testing Connection",
      description: `Testing connection to ${integration.name}...`,
    });
    
    // Simulate connection test
    setTimeout(() => {
      toast({
        title: "Connection Test Complete",
        description: `${integration.name} connection test ${Math.random() > 0.3 ? 'successful' : 'failed'}.`,
      });
    }, 2000);
  };

  const handleConfigureIntegration = (integration: any) => {
    toast({
      title: "Configuration Panel",
      description: `Opening configuration for ${integration.name}...`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="flex items-center gap-2">
            <Database className="h-5 w-5 text-primary" />
            Manage System Integrations
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto px-1">
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-48 w-full" />
              ))}
            </div>
          ) : integrations && integrations.length > 0 ? (
            <div className="space-y-4">
              {integrations.map((integration) => (
              <div key={integration.id} className="p-4 border rounded-lg bg-card">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="p-2 rounded-full bg-muted">
                      {getStatusIcon(integration.status)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-medium">{integration.name}</h4>
                        <Badge className={getStatusColor(integration.status)}>
                          {integration.status}
                        </Badge>
                        <div className="ml-auto">
                          <Switch
                            checked={integration.enabled || false}
                            onCheckedChange={() => handleToggleIntegration(integration.id, integration.enabled || false)}
                          />
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {integration.description}
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <Label className="text-xs font-medium text-muted-foreground">Endpoint</Label>
                          <p className="font-mono text-xs bg-muted p-1 rounded mt-1">
                            {integration.endpoint}
                          </p>
                        </div>
                        <div>
                          <Label className="text-xs font-medium text-muted-foreground">Last Sync</Label>
                          <p className="mt-1">
                            {integration.last_sync 
                              ? new Date(integration.last_sync).toLocaleString()
                              : 'Never'}
                          </p>
                        </div>
                      </div>
                      
                      <div className="mt-3">
                        <Label className="text-xs font-medium text-muted-foreground">Data Types</Label>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {integration.data_types?.map((type, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {type}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleTestConnection(integration)}
                  >
                    Test Connection
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleConfigureIntegration(integration)}
                  >
                    <Settings className="h-3 w-3 mr-1" />
                    Configure
                  </Button>
                  {integration.status === 'error' && (
                    <Button variant="outline" size="sm">
                      Retry Connection
                    </Button>
                  )}
                </div>
              </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Database className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No integrations configured</h3>
              <p className="text-muted-foreground">
                Add integrations to connect external systems
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center pt-4 border-t flex-shrink-0">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Plus className="h-4 w-4" />
              Add Integration
            </Button>
            <Button>
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}