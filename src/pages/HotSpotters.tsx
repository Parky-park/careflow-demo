import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserRoundCheck, TrendingUp, DollarSign, Calendar, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HotSpotters() {
  const navigate = useNavigate();
  
  const hotSpotterMetrics = [
    { label: "High Utilizers", value: "47", icon: UserRoundCheck },
    { label: "Cost Impact", value: "$2.3M", icon: DollarSign },
    { label: "Interventions Active", value: "23", icon: TrendingUp },
    { label: "Next Reviews", value: "8", icon: Calendar },
  ];

  const highUtilizers = [
    {
      id: "HS001",
      name: "Robert Martinez",
      age: 58,
      visits: 28,
      lastVisit: "2024-01-15",
      cost: "$45,200",
      conditions: ["COPD", "Diabetes", "Heart Failure"],
      riskScore: 95,
      status: "Active Intervention"
    },
    {
      id: "HS002", 
      name: "Mary Thompson",
      age: 72,
      visits: 24,
      lastVisit: "2024-01-14",
      cost: "$38,900",
      conditions: ["Chronic Pain", "Depression", "Hypertension"],
      riskScore: 87,
      status: "Care Plan Review"
    },
    {
      id: "HS003",
      name: "James Wilson",
      age: 45,
      visits: 31,
      lastVisit: "2024-01-16",
      cost: "$52,100",
      conditions: ["Substance Use", "Mental Health", "Homeless"],
      riskScore: 98,
      status: "Crisis Intervention"
    },
  ];

  const getRiskColor = (score: number) => {
    if (score >= 90) return "bg-red-500 text-white";
    if (score >= 75) return "bg-orange-500 text-white";
    if (score >= 60) return "bg-yellow-500 text-black";
    return "bg-green-500 text-white";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Crisis Intervention": return "bg-red-100 text-red-800 border-red-200";
      case "Active Intervention": return "bg-blue-100 text-blue-800 border-blue-200";
      case "Care Plan Review": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h1 className="text-3xl font-bold">Hot-Spotter Teams</h1>
        <p className="text-muted-foreground">
          Identifying and managing the 20% of patients who account for 80% of system utilization
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {hotSpotterMetrics.map((metric, index) => {
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

      {/* High Utilizer Patients */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <UserRoundCheck className="h-5 w-5" />
              High Utilizer Patients
            </CardTitle>
            <CardDescription>Patients requiring intensive care coordination and intervention</CardDescription>
          </div>
          <Button onClick={() => navigate('/patients/add?type=high-utilizer')}>Add Patient</Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {highUtilizers.map((patient) => (
              <div key={patient.id} className="border rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">{patient.name}</h3>
                    <p className="text-muted-foreground">Age: {patient.age} • ID: {patient.id}</p>
                  </div>
                  <Badge className={getRiskColor(patient.riskScore)}>
                    Risk: {patient.riskScore}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Visits (12 months)</p>
                    <p className="text-2xl font-bold text-red-600">{patient.visits}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Cost</p>
                    <p className="text-2xl font-bold text-orange-600">{patient.cost}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Last Visit</p>
                    <p className="text-lg font-medium">{patient.lastVisit}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-muted-foreground mb-2">Primary Conditions</p>
                  <div className="flex flex-wrap gap-2">
                    {patient.conditions.map((condition, idx) => (
                      <Badge key={idx} variant="secondary">
                        {condition}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Badge className={getStatusColor(patient.status)} variant="outline">
                    {patient.status}
                  </Badge>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => {
                        window.open(`tel:+1234567890`);
                      }}
                    >
                      <Phone className="h-4 w-4 mr-1" />
                      Contact
                    </Button>
                    <Button 
                      size="sm"
                      onClick={() => {
                        navigate(`/patients/${patient.id}/care-plan`);
                      }}
                    >
                      View Care Plan
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Intervention Programs */}
      <Card>
        <CardHeader>
          <CardTitle>Active Intervention Programs</CardTitle>
          <CardDescription>Current programs targeting high-utilizer populations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2">Frequent ED Visitors Program</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Coordinated care for patients with 10+ ED visits annually
              </p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">15 patients</span>
                <Badge>Active</Badge>
              </div>
            </div>
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2">Complex Care Management</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Intensive case management for multi-morbidity patients
              </p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">8 patients</span>
                <Badge>Active</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}