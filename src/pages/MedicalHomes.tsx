import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building2, Users, TrendingUp, Clock, UserCheck } from "lucide-react";

export default function MedicalHomes() {
  const medicalHomeMetrics = [
    { label: "Active Medical Homes", value: "12", icon: Building2 },
    { label: "Attached Patients", value: "8,547", icon: Users },
    { label: "Unattached Patients", value: "1,203", icon: UserCheck },
    { label: "Avg. Attachment Time", value: "14 days", icon: Clock },
  ];

  const medicalHomes = [
    {
      id: "MH001",
      name: "Downtown Family Health Centre",
      location: "Downtown",
      patients: 1247,
      providers: 8,
      attachmentRate: 94,
      continuityScore: 87,
      status: "Accepting",
      waitTime: "12 days"
    },
    {
      id: "MH002",
      name: "Riverside Community Clinic",
      location: "Riverside",
      patients: 982,
      providers: 6,
      attachmentRate: 89,
      continuityScore: 91,
      status: "Limited",
      waitTime: "18 days"
    },
    {
      id: "MH003",
      name: "North End Medical Centre",
      location: "North End",
      patients: 1456,
      providers: 10,
      attachmentRate: 97,
      continuityScore: 85,
      status: "Full",
      waitTime: "25 days"
    },
  ];

  const unattachedPatients = [
    { name: "Jennifer Adams", age: 34, priority: "High", reason: "Chronic Conditions", waitTime: "45 days" },
    { name: "Michael Brown", age: 67, priority: "High", reason: "Recent Discharge", waitTime: "32 days" },
    { name: "Sarah Davis", age: 28, priority: "Medium", reason: "Routine Care", waitTime: "12 days" },
    { name: "Robert Lee", age: 52, priority: "High", reason: "Multiple ED Visits", waitTime: "67 days" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Accepting": return "bg-green-100 text-green-800 border-green-200";
      case "Limited": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Full": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-red-500 text-white";
      case "Medium": return "bg-yellow-500 text-black";
      case "Low": return "bg-green-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h1 className="text-3xl font-bold">Medical Homes</h1>
        <p className="text-muted-foreground">
          Team-based care coordination and patient attachment management
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {medicalHomeMetrics.map((metric, index) => {
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

      {/* Medical Homes Overview */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Medical Home Status
            </CardTitle>
            <CardDescription>Current capacity and performance of medical homes</CardDescription>
          </div>
          <Button>Add Medical Home</Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {medicalHomes.map((home) => (
              <div key={home.id} className="border rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">{home.name}</h3>
                    <p className="text-muted-foreground">{home.location} • {home.id}</p>
                  </div>
                  <Badge className={getStatusColor(home.status)} variant="outline">
                    {home.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Patients</p>
                    <p className="text-2xl font-bold">{home.patients.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Providers</p>
                    <p className="text-2xl font-bold">{home.providers}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Attachment Rate</p>
                    <p className="text-2xl font-bold text-green-600">{home.attachmentRate}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Wait Time</p>
                    <p className="text-lg font-medium">{home.waitTime}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm text-muted-foreground">Continuity Score: </span>
                    <Badge variant="secondary">{home.continuityScore}%</Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                    <Button size="sm">
                      Manage Capacity
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Unattached Patients */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <UserCheck className="h-5 w-5" />
              Unattached Patients Queue
            </CardTitle>
            <CardDescription>Patients waiting for medical home attachment</CardDescription>
          </div>
          <Button>Match Patients</Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {unattachedPatients.map((patient, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <Badge className={getPriorityColor(patient.priority)}>
                    {patient.priority}
                  </Badge>
                  <div>
                    <p className="font-medium">{patient.name}</p>
                    <p className="text-sm text-muted-foreground">Age: {patient.age} • {patient.reason}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">Waiting: {patient.waitTime}</p>
                  <Button size="sm" className="mt-1">
                    Assign
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Attachment Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Attachment Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>This Month</span>
                <span className="font-bold text-green-600">+127 attachments</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Average Wait Time</span>
                <span className="font-bold">14 days</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Success Rate</span>
                <span className="font-bold text-green-600">92%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Continuity Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Same Provider Visits</span>
                <span className="font-bold text-blue-600">78%</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Care Plan Adherence</span>
                <span className="font-bold text-green-600">85%</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Patient Satisfaction</span>
                <span className="font-bold text-green-600">4.2/5</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}