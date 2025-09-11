import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Database, Activity, CheckCircle, AlertCircle, RefreshCw, Link } from "lucide-react";

export default function FHIRIntegration() {
  const integrationMetrics = [
    { label: "Active Connections", value: "8", icon: Link },
    { label: "Messages Today", value: "12,459", icon: Activity },
    { label: "Success Rate", value: "99.2%", icon: CheckCircle },
    { label: "Failed Transactions", value: "23", icon: AlertCircle },
  ];

  const fhirConnections = [
    {
      id: "FHIR001",
      name: "Provincial Health Registry",
      type: "Patient Registry",
      status: "Connected",
      lastSync: "2 min ago",
      messages: 4567,
      version: "R4"
    },
    {
      id: "FHIR002",
      name: "Regional Hospital Network",
      type: "ADT Feed",
      status: "Connected", 
      lastSync: "1 min ago",
      messages: 2843,
      version: "R4"
    },
    {
      id: "FHIR003",
      name: "Laboratory Information System",
      type: "Lab Results",
      status: "Connected",
      lastSync: "5 min ago", 
      messages: 1956,
      version: "R4"
    },
    {
      id: "FHIR004",
      name: "Pharmacy Management System",
      type: "Medication Orders",
      status: "Warning",
      lastSync: "15 min ago",
      messages: 892,
      version: "R4"
    },
  ];

  const recentMessages = [
    {
      timestamp: "14:23:45",
      source: "Provincial Registry",
      type: "Patient Update",
      resource: "Patient/12345",
      status: "Success",
      details: "Demographics updated for John Smith"
    },
    {
      timestamp: "14:22:12",
      source: "Hospital Network",
      type: "ADT Admission", 
      resource: "Encounter/67890",
      status: "Success",
      details: "Patient admitted to ICU"
    },
    {
      timestamp: "14:21:30",
      source: "Lab System",
      type: "Observation",
      resource: "Observation/24680",
      status: "Failed",
      details: "Invalid observation code"
    },
    {
      timestamp: "14:20:45",
      source: "Pharmacy System",
      type: "MedicationRequest",
      resource: "MedicationRequest/13579",
      status: "Success", 
      details: "New prescription for Metformin"
    },
  ];

  const dataStatistics = [
    { resource: "Patient", count: 124567, growth: "+2.3%" },
    { resource: "Encounter", count: 89234, growth: "+5.7%" },
    { resource: "Observation", count: 456789, growth: "+8.1%" },
    { resource: "MedicationRequest", count: 34567, growth: "+1.9%" },
    { resource: "Condition", count: 67890, growth: "+3.4%" },
    { resource: "Procedure", count: 23456, growth: "+4.2%" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Connected": return "bg-green-100 text-green-800 border-green-200";
      case "Warning": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Disconnected": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getMessageStatusColor = (status: string) => {
    switch (status) {
      case "Success": return "bg-green-500 text-white";
      case "Failed": return "bg-red-500 text-white";
      case "Warning": return "bg-yellow-500 text-black";
      default: return "bg-gray-500 text-white";
    }
  };

  const getGrowthColor = (growth: string) => {
    if (growth.startsWith('+')) return "text-green-600";
    if (growth.startsWith('-')) return "text-red-600";
    return "text-gray-600";
  };

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
          <Button onClick={() => window.location.reload()}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh All
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {fhirConnections.map((connection) => (
              <div key={connection.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold">{connection.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {connection.id} • {connection.type} • FHIR {connection.version}
                    </p>
                  </div>
                  <Badge className={getStatusColor(connection.status)} variant="outline">
                    {connection.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Messages Today</p>
                    <p className="text-2xl font-bold text-blue-600">{connection.messages.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Last Sync</p>
                    <p className="text-lg font-medium">{connection.lastSync}</p>
                  </div>
                  <div className="flex items-end">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => {
                        window.location.href = `/fhir/connections/${connection.id}/configure`;
                      }}
                    >
                      Configure
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
          <Button variant="outline" onClick={() => window.location.href = '/fhir/messages'}>View Message Log</Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentMessages.map((message, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <Badge className={getMessageStatusColor(message.status)}>
                    {message.status}
                  </Badge>
                  <div>
                    <p className="font-medium">{message.type}</p>
                    <p className="text-sm text-muted-foreground">
                      {message.source} • {message.resource} • {message.timestamp}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {message.details}
                    </p>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => {
                    window.location.href = `/fhir/messages/${index}`;
                  }}
                >
                  Details
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Data Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>FHIR Resource Statistics</CardTitle>
          <CardDescription>Current data volumes by FHIR resource type</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dataStatistics.map((stat, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">{stat.resource}</h4>
                  <Badge variant="secondary">FHIR R4</Badge>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-2xl font-bold text-primary">
                      {stat.count.toLocaleString()}
                    </p>
                    <p className="text-sm text-muted-foreground">Resources</p>
                  </div>
                  <p className={`text-sm font-medium ${getGrowthColor(stat.growth)}`}>
                    {stat.growth}
                  </p>
                </div>
              </div>
            ))}
          </div>
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
                <span>Overall Uptime</span>
                <span className="font-bold text-green-600">99.8%</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Average Response Time</span>
                <span className="font-bold">245ms</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Error Rate</span>
                <span className="font-bold text-green-600">0.2%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Compliance Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>FHIR R4 Compliance</span>
                <span className="font-bold text-green-600">100%</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Security Standards</span>
                <span className="font-bold text-green-600">Compliant</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Data Validation</span>
                <span className="font-bold text-green-600">98.7%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}