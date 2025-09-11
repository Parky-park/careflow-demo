import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Pill, User, Clock, AlertTriangle, CheckCircle, FileText } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

export default function PharmacyPrescriptionDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock prescription data
  const prescription = {
    id: id || "RX001",
    patient: {
      name: "Emily Chen",
      id: "PT34567",
      age: 42,
      dob: "1982-06-15",
      allergies: ["Sulfa drugs", "Latex"]
    },
    medication: {
      name: "Metformin 500mg",
      strength: "500mg",
      form: "Tablet",
      ndc: "0123-4567-89",
      manufacturer: "Generic Pharma",
      quantity: 90,
      daysSupply: 30,
      directions: "Take 1 tablet by mouth twice daily with meals"
    },
    prescriber: {
      name: "Dr. Maria Rodriguez",
      npi: "1234567890",
      practice: "Springfield Family Medicine",
      phone: "555-123-4567"
    },
    prescription: {
      rxNumber: "RX2024001234",
      dateWritten: "2024-01-15",
      dateReceived: "2024-01-16",
      refillsRemaining: 5,
      originalRefills: 5,
      priority: "Routine",
      daw: "Generic Substitution Allowed"
    },
    aiAnalysis: {
      riskScore: 2,
      riskLevel: "Low",
      flags: [],
      recommendations: [
        "Monitor for GI side effects",
        "Counsel on taking with food",
        "Check blood glucose levels regularly"
      ],
      interactions: [],
      duplicateTherapy: false,
      priorAuth: false
    },
    processing: {
      status: "Ready for Verification",
      enteredBy: "Pharmacy Tech - John Smith",
      enteredAt: "2024-01-16 10:30:00",
      verifiedBy: null,
      verifiedAt: null,
      dispensedBy: null,
      dispensedAt: null
    },
    timeline: [
      { time: "10:15:00", event: "Prescription received electronically", user: "System" },
      { time: "10:16:00", event: "AI analysis completed", user: "AI Engine" },
      { time: "10:30:00", event: "Data entry completed", user: "John Smith" },
      { time: "10:31:00", event: "Ready for pharmacist verification", user: "System" }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ready for Verification": return "bg-blue-100 text-blue-800 border-blue-200";
      case "Verified": return "bg-green-100 text-green-800 border-green-200";
      case "Dispensed": return "bg-green-100 text-green-800 border-green-200";
      case "On Hold": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Rejected": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case "Low": return "text-green-600";
      case "Medium": return "text-yellow-600";
      case "High": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 border-b pb-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/pharmacy-ai/processing')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Processing Queue
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">Prescription Details</h1>
          <p className="text-muted-foreground">Rx #: {prescription.prescription.rxNumber}</p>
        </div>
        <Badge className={getStatusColor(prescription.processing.status)} variant="outline">
          {prescription.processing.status}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
              <p className="font-semibold">{prescription.patient.name}</p>
              <p className="text-sm text-muted-foreground">ID: {prescription.patient.id}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Date of Birth</p>
              <p>{prescription.patient.dob} (Age {prescription.patient.age})</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Known Allergies</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {prescription.patient.allergies.map((allergy, index) => (
                  <Badge key={index} variant="outline" className="bg-red-50 text-red-700">
                    {allergy}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Medication Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Pill className="h-5 w-5" />
              Medication Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="font-semibold">{prescription.medication.name}</p>
              <p className="text-sm text-muted-foreground">
                {prescription.medication.strength} {prescription.medication.form}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">NDC Number</p>
              <p>{prescription.medication.ndc}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Manufacturer</p>
              <p>{prescription.medication.manufacturer}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Quantity / Days Supply</p>
              <p>{prescription.medication.quantity} tablets / {prescription.medication.daysSupply} days</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Directions</p>
              <p className="text-sm">{prescription.medication.directions}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Prescriber Information */}
      <Card>
        <CardHeader>
          <CardTitle>Prescriber Information</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Prescriber</p>
            <p className="font-semibold">{prescription.prescriber.name}</p>
            <p className="text-sm">NPI: {prescription.prescriber.npi}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Practice</p>
            <p>{prescription.prescriber.practice}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Contact</p>
            <p>{prescription.prescriber.phone}</p>
          </div>
        </CardContent>
      </Card>

      {/* AI Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            AI Analysis Results
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Risk Score</p>
              <p className="text-2xl font-bold">{prescription.aiAnalysis.riskScore}/10</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Risk Level</p>
              <p className={`font-semibold ${getRiskColor(prescription.aiAnalysis.riskLevel)}`}>
                {prescription.aiAnalysis.riskLevel}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Flags Detected</p>
              <p className="font-bold text-green-600">None</p>
            </div>
          </div>

          {prescription.aiAnalysis.recommendations.length > 0 && (
            <div>
              <h4 className="font-semibold mb-2">Clinical Recommendations</h4>
              <ul className="space-y-1">
                {prescription.aiAnalysis.recommendations.map((rec, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                    <FileText className="h-3 w-3 text-blue-500 mt-0.5 flex-shrink-0" />
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm">No Drug Interactions</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm">No Duplicate Therapy</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm">No Prior Auth Required</span>
            </div>
          </div>
        </CardContent>
      </Card>

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
            {prescription.timeline.map((event, index) => (
              <div key={index} className="flex items-start gap-3 pb-3 border-b last:border-0">
                <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="font-medium">{event.event}</p>
                  <p className="text-sm text-muted-foreground">
                    {event.time} • {event.user}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Button>
              Verify Prescription
            </Button>
            <Button variant="outline">
              Contact Prescriber
            </Button>
            <Button variant="outline">
              Put on Hold
            </Button>
            <Button variant="outline">
              Print Label
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}