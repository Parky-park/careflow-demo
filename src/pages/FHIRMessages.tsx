import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Database, MessageSquare, Activity } from "lucide-react";

const FHIRMessages = () => {
  const navigate = useNavigate();

  const messages = [
    {
      id: "1",
      timestamp: "2024-01-15 14:30:22",
      direction: "Inbound",
      messageType: "Patient Record",
      source: "Epic EHR",
      destination: "CareFlow System",
      status: "Success",
      size: "2.4 KB",
      processingTime: "125ms"
    },
    {
      id: "2",
      timestamp: "2024-01-15 14:28:15",
      direction: "Outbound", 
      messageType: "Lab Results",
      source: "CareFlow System",
      destination: "Quest Diagnostics",
      status: "Failed",
      size: "1.8 KB",
      processingTime: "2.3s",
      error: "Authentication timeout"
    },
    {
      id: "3",
      timestamp: "2024-01-15 14:25:30",
      direction: "Inbound",
      messageType: "Medication List",
      source: "Cerner PowerChart",
      destination: "CareFlow System", 
      status: "Success",
      size: "3.1 KB",
      processingTime: "89ms"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Success': return 'bg-green-100 text-green-800';
      case 'Failed': return 'bg-red-100 text-red-800';
      case 'Processing': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDirectionColor = (direction: string) => {
    switch (direction) {
      case 'Inbound': return 'bg-blue-100 text-blue-800';
      case 'Outbound': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/fhir')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to FHIR Integration
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <MessageSquare className="h-8 w-8 text-primary" />
            FHIR Message Log
          </h1>
          <p className="text-muted-foreground mt-2">Monitor FHIR message transactions and status</p>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">12,459</p>
              <p className="text-sm text-muted-foreground">Messages Today</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">8,234</p>
              <p className="text-sm text-muted-foreground">Inbound</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">4,225</p>
              <p className="text-sm text-muted-foreground">Outbound</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">23</p>
              <p className="text-sm text-muted-foreground">Failed</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Message Log */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Recent Messages
            </CardTitle>
            <Button size="sm">
              <Activity className="h-4 w-4 mr-2" />
              Real-time View
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge className={getDirectionColor(message.direction)}>
                        {message.direction}
                      </Badge>
                      <Badge variant="outline">{message.messageType}</Badge>
                      <Badge className={getStatusColor(message.status)}>
                        {message.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{message.timestamp}</p>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => navigate(`/fhir/messages/${message.id}`)}
                  >
                    View Details
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Source → Destination</p>
                    <p className="font-medium">{message.source} → {message.destination}</p>
                  </div>
                  <div className="flex gap-4">
                    <div>
                      <p className="text-muted-foreground">Size</p>
                      <p className="font-medium">{message.size}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Processing Time</p>
                      <p className="font-medium">{message.processingTime}</p>
                    </div>
                  </div>
                </div>
                
                {message.error && (
                  <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded">
                    <p className="text-sm text-red-700">
                      <strong>Error:</strong> {message.error}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FHIRMessages;