import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, User, Pill, AlertTriangle, FileText, Clock } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

export default function DrugUtilizationEvaluationDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [intervention, setIntervention] = useState("");

  // Mock evaluation data
  const evaluation = {
    id: id || "EVAL001",
    patient: {
      name: "John Smith",
      id: "PT12345",
      age: 65,
      allergies: "Penicillin"
    },
    medication: {
      name: "Oxycodone 10mg",
      dosage: "10mg every 4 hours",
      prescriber: "Dr. Johnson",
      prescribedDate: "2024-01-16"
    },
    rule: {
      name: "High Dose Opioid Warning",
      category: "Safety",
      priority: "Critical"
    },
    status: "Intervention Required",
    triggerReason: "Daily MME exceeds 90mg threshold with concurrent benzodiazepine prescription",
    riskFactors: [
      "Daily MME: 120mg (exceeds 90mg threshold)",
      "Concurrent Lorazepam prescription",
      "No pain management consultation in 6 months",
      "History of substance abuse"
    ],
    recommendations: [
      "Reduce opioid dose by 25-50%",
      "Refer to pain management specialist",
      "Consider alternative pain management strategies",
      "Monitor for signs of respiratory depression"
    ],
    timeline: [
      { time: "2024-01-16 09:15", event: "Prescription entered", user: "Pharmacy Tech" },
      { time: "2024-01-16 09:16", event: "DUE rule triggered", user: "System" },
      { time: "2024-01-16 09:17", event: "Alert sent to pharmacist", user: "System" }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Intervention Required": return "bg-red-100 text-red-800 border-red-200";
      case "Under Review": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Resolved": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const handleIntervention = () => {
    console.log("Recording intervention:", intervention);
    navigate('/drug-utilization/evaluations');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 border-b pb-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/drug-utilization/evaluations')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Evaluations
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">Drug Utilization Evaluation</h1>
          <p className="text-muted-foreground">Evaluation ID: {evaluation.id}</p>
        </div>
        <Badge className={getStatusColor(evaluation.status)} variant="outline">
          {evaluation.status}
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
              <p className="font-semibold">{evaluation.patient.name}</p>
              <p className="text-sm text-muted-foreground">ID: {evaluation.patient.id}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Age</p>
              <p>{evaluation.patient.age} years</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Known Allergies</p>
              <p>{evaluation.patient.allergies}</p>
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
              <p className="font-semibold">{evaluation.medication.name}</p>
              <p className="text-sm text-muted-foreground">{evaluation.medication.dosage}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Prescriber</p>
              <p>{evaluation.medication.prescriber}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Prescribed Date</p>
              <p>{evaluation.medication.prescribedDate}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alert Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Alert Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="font-semibold">{evaluation.rule.name}</p>
            <p className="text-sm text-muted-foreground">
              {evaluation.rule.category} • Priority: {evaluation.rule.priority}
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">Trigger Reason</h4>
            <p className="text-muted-foreground">{evaluation.triggerReason}</p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Risk Factors Identified</h4>
            <ul className="space-y-1">
              {evaluation.riskFactors.map((factor, index) => (
                <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                  <AlertTriangle className="h-3 w-3 text-orange-500 mt-0.5 flex-shrink-0" />
                  {factor}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Clinical Recommendations</h4>
            <ul className="space-y-1">
              {evaluation.recommendations.map((rec, index) => (
                <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                  <FileText className="h-3 w-3 text-blue-500 mt-0.5 flex-shrink-0" />
                  {rec}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Event Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {evaluation.timeline.map((event, index) => (
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

      {/* Intervention Actions */}
      {evaluation.status === "Intervention Required" && (
        <Card>
          <CardHeader>
            <CardTitle>Record Intervention</CardTitle>
            <CardDescription>Document the actions taken to address this alert</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Describe the intervention taken, consultation with prescriber, patient counseling, etc."
              value={intervention}
              onChange={(e) => setIntervention(e.target.value)}
              rows={4}
            />
            <div className="flex gap-4">
              <Button onClick={handleIntervention} disabled={!intervention.trim()}>
                Record Intervention
              </Button>
              <Button variant="outline">
                Contact Prescriber
              </Button>
              <Button variant="outline">
                Defer to Pharmacist
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}