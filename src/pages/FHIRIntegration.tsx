import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Database, Activity, CheckCircle, AlertCircle, RefreshCw, Link as LinkIcon, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useFHIRConnections, useFHIRMessages, useFHIRMetrics } from "@/hooks/useFHIR";
import { formatDistanceToNow } from "date-fns";

export default function FHIRIntegration() {
  const navigate = useNavigate();
  const { data: connections, isLoading: connectionsLoading } = useFHIRConnections();
  const { data: messages, isLoading: messagesLoading } = useFHIRMessages();
  const { data: metrics } = useFHIRMetrics();
  
  const integrationMetrics = [
    { label: "Active Connections", value: metrics?.activeConnections.toString() || "0", icon: LinkIcon },
    { label: "Messages Today", value: metrics?.totalMessages.toString() || "0", icon: Activity },
    { label: "Success Rate", value: `${metrics?.successRate || 0}%`, icon: CheckCircle },
    { label: "Failed Transactions", value: metrics?.failedMessages.toString() || "0", icon: AlertCircle },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-success/10 text-success border-success/20";
      case "warning": return "bg-warning/10 text-warning border-warning/20";
      case "inactive": return "bg-destructive/10 text-destructive border-destructive/20";
      default: return "bg-muted text-muted-foreground border-border";
    }
  };

  const getMessageStatusColor = (status: string) => {
    switch (status) {
      case "success": return "bg-success text-success-foreground";
      case "failed": return "bg-destructive text-destructive-foreground";
      case "warning": return "bg-warning text-warning-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  if (connectionsLoading || messagesLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-20 w-full" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </div>
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h1 className="text-3xl font-bold">FHIR Integration</h1>
        <p className="text-muted-foreground">
          Real-time healthcare data integration using FHIR standards
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {integrationMetrics.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{metric.label}</CardTitle>
                <IconComponent className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">
                  {metric.value}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* FHIR Connections */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              FHIR Connections
            </CardTitle>
            <CardDescription>Active healthcare system integrations</CardDescription>
          </div>
          <Button onClick={() => console.log('Refreshing FHIR data...')}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh All
          </Button>
        </CardHeader>
        <CardContent>
          {connections && connections.length > 0 ? (
            <div className="space-y-4">
              {connections.map((connection: any) => (
                <div key={connection.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold">{connection.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {connection.connection_type} • FHIR {connection.fhir_version}
                      </p>
                    </div>
                    <Badge className={getStatusColor(connection.status)} variant="outline">
                      {connection.status}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Messages Today</p>
                      <p className="text-2xl font-bold text-blue-600">{connection.message_count?.toLocaleString() || 0}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Last Sync</p>
                      <p className="text-lg font-medium">
                        {connection.last_sync 
                          ? formatDistanceToNow(new Date(connection.last_sync), { addSuffix: true })
                          : 'Never'}
                      </p>
                    </div>
                    <div className="flex items-end">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => navigate(`/fhir/connections/${connection.id}/configure`)}
                      >
                        Configure
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No FHIR connections found</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Create FHIR connections to integrate with healthcare systems
              </p>
              <Button>
                Add Connection
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Messages */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Messages
            </CardTitle>
            <CardDescription>Latest FHIR message transactions</CardDescription>
          </div>
          <Button variant="outline" onClick={() => navigate('/fhir/messages')}>View Message Log</Button>
        </CardHeader>
        <CardContent>
          {messages && messages.length > 0 ? (
            <div className="space-y-3">
              {messages.map((message: any) => (
                <div key={message.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <Badge className={getMessageStatusColor(message.status)}>
                      {message.status}
                    </Badge>
                    <div>
                      <p className="font-medium">{message.message_type}</p>
                      <p className="text-sm text-muted-foreground">
                        {message.connection?.name} • {message.resource_type}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(message.created_at), { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => navigate(`/fhir/messages/${message.id}`)}
                  >
                    Details
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No messages found</h3>
              <p className="text-sm text-muted-foreground">
                FHIR messages will appear here as they are processed
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Integration Health */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Integration Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Active Connections</span>
                <span className="font-bold text-success">{metrics?.activeConnections || 0}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Total Messages</span>
                <span className="font-bold text-primary">{metrics?.totalMessages || 0}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Success Rate</span>
                <span className="font-bold text-success">{metrics?.successRate || 0}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Message Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Successful</span>
                <span className="font-bold text-success">
                  {messages?.filter((m: any) => m.status === 'success').length || 0}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Failed</span>
                <span className="font-bold text-destructive">{metrics?.failedMessages || 0}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Pending</span>
                <span className="font-bold text-warning">
                  {messages?.filter((m: any) => m.status === 'pending').length || 0}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}