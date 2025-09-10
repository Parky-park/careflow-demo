import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Database, Wifi, WifiOff, Settings, Plus, Trash2 } from "lucide-react";

interface ManageIntegrationsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ManageIntegrationsModal({ open, onOpenChange }: ManageIntegrationsModalProps) {
  const { toast } = useToast();
  const [integrations, setIntegrations] = useState([
    {
      id: "1",
      name: "FHIR API Connection",
      description: "Healthcare data interoperability standard",
      status: "connected",
      enabled: true,
      endpoint: "https://fhir.hospital.ca/api/v1",
      lastSync: "2024-01-09 14:30:15",
      dataTypes: ["Patient Records", "Observations", "Medications"]
    },
    {
      id: "2",
      name: "Provincial Health Registry",
      description: "Real-time patient updates and demographics",
      status: "connected",
      enabled: true,
      endpoint: "https://phr.ontario.ca/api/v2",
      lastSync: "2024-01-09 14:25:42",
      dataTypes: ["Demographics", "Insurance", "Emergency Contacts"]
    },
    {
      id: "3",
      name: "Laboratory Systems",
      description: "Lab results integration and monitoring",
      status: "pending",
      enabled: false,
      endpoint: "https://labs.hospital.ca/hl7/v3",
      lastSync: "Never",
      dataTypes: ["Lab Results", "Test Orders", "Critical Values"]
    },
    {
      id: "4",
      name: "Pharmacy Network",
      description: "Prescription management and drug interactions",
      status: "connected",
      enabled: true,
      endpoint: "https://pharmacy.network.ca/api",
      lastSync: "2024-01-09 14:20:33",
      dataTypes: ["Prescriptions", "Drug Interactions", "Inventory"]
    },
    {
      id: "5",
      name: "Radiology PACS",
      description: "Medical imaging and radiology reports",
      status: "error",
      enabled: true,
      endpoint: "https://pacs.hospital.ca/dicom",
      lastSync: "2024-01-09 12:15:22",
      dataTypes: ["Medical Images", "Radiology Reports", "DICOM Data"]
    }
  ]);

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

  const handleToggleIntegration = (id: string) => {
    setIntegrations(prev => prev.map(integration => 
      integration.id === id 
        ? { ...integration, enabled: !integration.enabled }
        : integration
    ));
    
    const integration = integrations.find(i => i.id === id);
    toast({
      title: `Integration ${integration?.enabled ? 'Disabled' : 'Enabled'}`,
      description: `${integration?.name} has been ${integration?.enabled ? 'disabled' : 'enabled'}.`,
    });
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
                            checked={integration.enabled}
                            onCheckedChange={() => handleToggleIntegration(integration.id)}
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
                          <p className="mt-1">{integration.lastSync}</p>
                        </div>
                      </div>
                      
                      <div className="mt-3">
                        <Label className="text-xs font-medium text-muted-foreground">Data Types</Label>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {integration.dataTypes.map((type, index) => (
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