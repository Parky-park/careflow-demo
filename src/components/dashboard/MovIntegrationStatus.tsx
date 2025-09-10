import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Database, CheckCircle, AlertCircle, Clock } from "lucide-react";

export function MovIntegrationStatus() {
  const integrationStatus = [
    {
      name: "MoV Core System",
      status: "active",
      lastSync: "2 minutes ago",
      description: "Drug Utilization Evaluation engine"
    },
    {
      name: "Rules Engine",
      status: "active", 
      lastSync: "1 minute ago",
      description: "Patient matching and prioritization"
    },
    {
      name: "ADT Feed",
      status: "active",
      lastSync: "Real-time",
      description: "Admission, Discharge, Transfer data"
    },
    {
      name: "Provincial Registry",
      status: "warning",
      lastSync: "15 minutes ago", 
      description: "Patient demographic updates"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4 text-success" />;
      case 'warning': return <AlertCircle className="h-4 w-4 text-warning" />;
      case 'error': return <AlertCircle className="h-4 w-4 text-destructive" />;
      default: return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success text-success-foreground';
      case 'warning': return 'bg-warning text-warning-foreground';
      case 'error': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5 text-primary" />
          MoV Integration Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 md:space-y-3 px-4 md:px-6">
        {integrationStatus.map((integration, index) => (
          <div key={index} className="flex items-center justify-between p-2 md:p-3 rounded-lg border">
            <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
              {getStatusIcon(integration.status)}
              <div className="min-w-0 flex-1">
                <p className="font-medium text-xs md:text-sm truncate">{integration.name}</p>
                <p className="text-xs text-muted-foreground line-clamp-1">{integration.description}</p>
              </div>
            </div>
            <div className="text-right flex-shrink-0 ml-2">
              <Badge className={`text-xs ${getStatusColor(integration.status)}`}>
                {integration.status}
              </Badge>
              <p className="text-xs text-muted-foreground mt-1 hidden sm:block">
                {integration.lastSync}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}