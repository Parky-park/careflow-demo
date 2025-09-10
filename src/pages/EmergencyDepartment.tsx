import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Activity, AlertTriangle, Clock, Users, Heart } from "lucide-react";

export default function EmergencyDepartment() {
  const edMetrics = [
    { label: "Current Occupancy", value: "85%", status: "high", icon: Users },
    { label: "Average Wait Time", value: "45 min", status: "medium", icon: Clock },
    { label: "Critical Cases", value: "12", status: "high", icon: AlertTriangle },
    { label: "Discharge Rate", value: "23/hr", status: "normal", icon: Activity },
  ];

  const currentPatients = [
    { id: "ED001", name: "John Smith", triage: "2", condition: "Chest Pain", waitTime: "15 min", status: "critical" },
    { id: "ED002", name: "Sarah Johnson", triage: "3", condition: "Fracture", waitTime: "32 min", status: "urgent" },
    { id: "ED003", name: "Mike Davis", triage: "4", condition: "Flu Symptoms", waitTime: "65 min", status: "standard" },
    { id: "ED004", name: "Lisa Wilson", triage: "1", condition: "Cardiac Arrest", waitTime: "0 min", status: "resuscitation" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "resuscitation": return "bg-red-600 text-white";
      case "critical": return "bg-red-500 text-white";
      case "urgent": return "bg-orange-500 text-white";
      case "standard": return "bg-yellow-500 text-black";
      default: return "bg-gray-500 text-white";
    }
  };

  const getMetricColor = (status: string) => {
    switch (status) {
      case "high": return "text-red-600";
      case "medium": return "text-orange-600";
      case "normal": return "text-green-600";
      default: return "text-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h1 className="text-3xl font-bold">Emergency Department</h1>
        <p className="text-muted-foreground">Real-time ED monitoring and patient flow management</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {edMetrics.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{metric.label}</CardTitle>
                <IconComponent className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${getMetricColor(metric.status)}`}>
                  {metric.value}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Current Patients */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5" />
              Current ED Patients
            </CardTitle>
            <CardDescription>Real-time patient status and triage information</CardDescription>
          </div>
          <Button>Refresh</Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {currentPatients.map((patient) => (
              <div key={patient.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <Badge className={getStatusColor(patient.status)}>
                    Triage {patient.triage}
                  </Badge>
                  <div>
                    <p className="font-medium">{patient.name}</p>
                    <p className="text-sm text-muted-foreground">{patient.id} • {patient.condition}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">Wait: {patient.waitTime}</p>
                  <Badge variant="outline" className="mt-1">
                    {patient.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Capacity Alert */}
      <Card className="border-orange-200 bg-orange-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-800">
            <AlertTriangle className="h-5 w-5" />
            Capacity Alert
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-orange-700">
            Emergency Department is at 85% capacity. Consider implementing surge protocols 
            and coordinating with inpatient units for admissions.
          </p>
          <Button className="mt-3" variant="outline">
            View Surge Protocols
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}