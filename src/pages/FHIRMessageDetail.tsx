import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MessageSquare, User, Clock, AlertCircle, CheckCircle } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

export default function FHIRMessageDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock message data
  const message = {
    id: id || "MSG001",
    type: "Patient Registration",
    status: "Processed",
    timestamp: "2024-01-16 14:22:31",
    source: "Epic EHR",
    destination: "Local Database",
    patient: {
      name: "Sarah Johnson",
      id: "PT67890",
      mrn: "MRN123456"
    },
    messageSize: "2.4 KB",
    processingTime: "180ms",
    retryCount: 0,
    payload: {
      resourceType: "Patient",
      id: "PT67890",
      name: [{
        use: "official",
        family: "Johnson",
        given: ["Sarah", "Marie"]
      }],
      gender: "female",
      birthDate: "1985-03-15",
      address: [{
        use: "home",
        line: ["123 Main Street"],
        city: "Springfield",
        state: "IL",
        postalCode: "62701"
      }],
      telecom: [{
        system: "phone",
        value: "555-123-4567",
        use: "mobile"
      }]
    },
    validationResults: [
      { field: "Patient ID", status: "Valid", message: "Unique identifier confirmed" },
      { field: "Name", status: "Valid", message: "Required fields present" },
      { field: "Birth Date", status: "Valid", message: "Valid date format" },
      { field: "Address", status: "Warning", message: "Zip code format unusual but accepted" }
    ],
    processing: [
      { step: "Message Received", time: "14:22:31.001", status: "Success" },
      { step: "Schema Validation", time: "14:22:31.045", status: "Success" },
      { step: "Business Rules Check", time: "14:22:31.089", status: "Success" },
      { step: "Database Update", time: "14:22:31.156", status: "Success" },
      { step: "Acknowledgment Sent", time: "14:22:31.182", status: "Success" }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Processed": return "bg-green-100 text-green-800 border-green-200";
      case "Failed": return "bg-red-100 text-red-800 border-red-200";
      case "Processing": return "bg-blue-100 text-blue-800 border-blue-200";
      case "Warning": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getValidationIcon = (status: string) => {
    switch (status) {
      case "Valid": return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "Warning": return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case "Error": return <AlertCircle className="h-4 w-4 text-red-500" />;
      default: return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 border-b pb-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/fhir/messages')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Messages
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">FHIR Message Details</h1>
          <p className="text-muted-foreground">Message ID: {message.id}</p>
        </div>
        <Badge className={getStatusColor(message.status)} variant="outline">
          {message.status}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Message Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Message Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Type</p>
              <p className="font-semibold">{message.type}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Source</p>
              <p>{message.source}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Destination</p>
              <p>{message.destination}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Timestamp</p>
              <p>{message.timestamp}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Processing Time</p>
              <p>{message.processingTime}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Message Size</p>
              <p>{message.messageSize}</p>
            </div>
          </CardContent>
        </Card>

        {/* Patient Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Patient Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="font-semibold">{message.patient.name}</p>
              <p className="text-sm text-muted-foreground">Patient ID: {message.patient.id}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Medical Record Number</p>
              <p>{message.patient.mrn}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Birth Date</p>
              <p>{message.payload.birthDate}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Gender</p>
              <p className="capitalize">{message.payload.gender}</p>
            </div>
          </CardContent>
        </Card>

        {/* Validation Results */}
        <Card>
          <CardHeader>
            <CardTitle>Validation Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {message.validationResults.map((result, index) => (
                <div key={index} className="flex items-start gap-3">
                  {getValidationIcon(result.status)}
                  <div className="flex-1">
                    <p className="font-medium text-sm">{result.field}</p>
                    <p className="text-xs text-muted-foreground">{result.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Processing Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Processing Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {message.processing.map((step, index) => (
              <div key={index} className="flex items-center gap-3 pb-3 border-b last:border-0">
                <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                <div className="flex-1">
                  <p className="font-medium">{step.step}</p>
                  <p className="text-sm text-muted-foreground">{step.time}</p>
                </div>
                <Badge variant="outline" className="bg-green-100 text-green-800">
                  {step.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Raw Message Payload */}
      <Card>
        <CardHeader>
          <CardTitle>Raw Message Payload</CardTitle>
          <CardDescription>FHIR JSON structure</CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="bg-muted p-4 rounded-lg text-sm overflow-auto max-h-96">
            {JSON.stringify(message.payload, null, 2)}
          </pre>
        </CardContent>
      </Card>

      {/* Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Button variant="outline">
              Resend Message
            </Button>
            <Button variant="outline">
              Download Raw Data
            </Button>
            <Button variant="outline">
              View Related Messages
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}