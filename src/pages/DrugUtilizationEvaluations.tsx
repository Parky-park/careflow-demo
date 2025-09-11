import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Activity, Database, RefreshCw } from "lucide-react";

const DrugUtilizationEvaluations = () => {
  const navigate = useNavigate();

  const evaluations = [
    {
      id: "1",
      patientName: "Sarah Johnson",
      medication: "Oxycodone 10mg",
      evaluationType: "High-Risk Combination",
      riskLevel: "Critical",
      evaluationDate: "2024-01-15",
      status: "Under Review",
      pharmacist: "Dr. Miller",
      notes: "Concurrent benzodiazepine prescription flagged"
    },
    {
      id: "2",
      patientName: "Michael Chen", 
      medication: "Atorvastatin 40mg",
      evaluationType: "Duplicate Therapy",
      riskLevel: "Medium",
      evaluationDate: "2024-01-14",
      status: "Resolved",
      pharmacist: "Dr. Smith",
      notes: "Alternative statin discontinued"
    },
    {
      id: "3",
      patientName: "Jennifer Davis",
      medication: "Metformin 1000mg",
      evaluationType: "Dosage Verification",
      riskLevel: "Low",
      evaluationDate: "2024-01-13", 
      status: "Approved",
      pharmacist: "Dr. Johnson",
      notes: "Dosage within recommended limits"
    }
  ];

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'Critical': return 'bg-red-500 text-white';
      case 'High': return 'bg-red-400 text-white';
      case 'Medium': return 'bg-yellow-500 text-black';
      case 'Low': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Under Review': return 'bg-yellow-100 text-yellow-800';
      case 'Resolved': return 'bg-green-100 text-green-800';
      case 'Approved': return 'bg-blue-100 text-blue-800';
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
          onClick={() => navigate('/drug-utilization')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Drug Utilization
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Activity className="h-8 w-8 text-primary" />
            Drug Utilization Evaluations
          </h1>
          <p className="text-muted-foreground mt-2">Review and manage medication evaluations</p>
        </div>
      </div>

      {/* Evaluations List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Recent Evaluations
            </CardTitle>
            <Button size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {evaluations.map((evaluation) => (
              <div key={evaluation.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="space-y-1">
                    <h3 className="font-semibold">{evaluation.patientName}</h3>
                    <p className="text-sm text-muted-foreground">{evaluation.medication}</p>
                    <p className="text-sm font-medium">{evaluation.evaluationType}</p>
                  </div>
                  <div className="flex flex-col gap-2 items-end">
                    <Badge className={getRiskColor(evaluation.riskLevel)}>
                      {evaluation.riskLevel} Risk
                    </Badge>
                    <Badge className={getStatusColor(evaluation.status)}>
                      {evaluation.status}
                    </Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Evaluation Date</p>
                    <p className="font-medium">{evaluation.evaluationDate}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Reviewing Pharmacist</p>
                    <p className="font-medium">{evaluation.pharmacist}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Notes</p>
                    <p className="font-medium">{evaluation.notes}</p>
                  </div>
                </div>
                
                <div className="flex gap-2 mt-4">
                  <Button 
                    size="sm"
                    onClick={() => navigate(`/drug-utilization/evaluation/${evaluation.id}`)}
                  >
                    View Details
                  </Button>
                  {evaluation.status === 'Under Review' && (
                    <>
                      <Button size="sm" variant="outline">
                        Approve
                      </Button>
                      <Button size="sm" variant="destructive">
                        Reject
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DrugUtilizationEvaluations;