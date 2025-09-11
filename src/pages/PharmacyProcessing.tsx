import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Pill, Activity, Clock, AlertTriangle } from "lucide-react";

const PharmacyProcessing = () => {
  const navigate = useNavigate();

  const processingQueue = [
    {
      id: "1",
      prescriptionId: "RX-2024-001234",
      patientName: "Sarah Johnson",
      medication: "Lisinopril 10mg",
      prescriber: "Dr. Smith",
      status: "Processing",
      priority: "Normal",
      queueTime: "5 mins",
      progress: 65
    },
    {
      id: "2",
      prescriptionId: "RX-2024-001235", 
      patientName: "Michael Chen",
      medication: "Metformin 500mg",
      prescriber: "Dr. Johnson",
      status: "Verification",
      priority: "High",
      queueTime: "12 mins",
      progress: 30
    },
    {
      id: "3",
      prescriptionId: "RX-2024-001236",
      patientName: "Jennifer Davis",
      medication: "Albuterol Inhaler",
      prescriber: "Dr. Williams",
      status: "Ready",
      priority: "Urgent",
      queueTime: "2 mins",
      progress: 100
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ready': return 'bg-green-100 text-green-800';
      case 'Processing': return 'bg-blue-100 text-blue-800';
      case 'Verification': return 'bg-yellow-100 text-yellow-800';
      case 'Error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Urgent': return 'bg-red-500 text-white';
      case 'High': return 'bg-orange-500 text-white';
      case 'Normal': return 'bg-blue-500 text-white';
      case 'Low': return 'bg-gray-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/pharmacy-ai')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Pharmacy AI
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Activity className="h-8 w-8 text-primary" />
            Pharmacy Processing Queue
          </h1>
          <p className="text-muted-foreground mt-2">Real-time prescription processing status</p>
        </div>
      </div>

      {/* Queue Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">In Queue</p>
                <p className="text-2xl font-bold">47</p>
              </div>
              <Clock className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Processing</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <Activity className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Ready</p>
                <p className="text-2xl font-bold">8</p>
              </div>
              <Pill className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Wait</p>
                <p className="text-2xl font-bold">6m</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Processing Queue */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Active Processing Queue
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {processingQueue.map((item) => (
              <div key={item.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge className={getPriorityColor(item.priority)}>
                        {item.priority}
                      </Badge>
                      <Badge className={getStatusColor(item.status)}>
                        {item.status}
                      </Badge>
                    </div>
                    <h3 className="font-semibold">{item.prescriptionId}</h3>
                    <p className="text-sm text-muted-foreground">Patient: {item.patientName}</p>
                  </div>
                  <div className="text-right text-sm text-muted-foreground">
                    <p>Queue time: {item.queueTime}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Medication</p>
                    <p className="font-medium">{item.medication}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Prescriber</p>
                    <p className="font-medium">{item.prescriber}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Processing Progress</span>
                    <span>{item.progress}%</span>
                  </div>
                  <Progress value={item.progress} className="w-full" />
                </div>
                
                <div className="flex gap-2 mt-4">
                  <Button 
                    size="sm"
                    onClick={() => navigate(`/pharmacy-ai/prescription/${item.id}`)}
                  >
                    View Details
                  </Button>
                  {item.status === 'Ready' && (
                    <Button size="sm" variant="outline">
                      Dispense
                    </Button>
                  )}
                  {item.status === 'Verification' && (
                    <Button size="sm" variant="outline">
                      Override
                    </Button>
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

export default PharmacyProcessing;