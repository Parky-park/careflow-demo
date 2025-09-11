import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, FileText, Pill, Activity, Phone, Mail, MapPin, Edit, Download } from "lucide-react";

const PatientChart = () => {
  const { id } = useParams();
  
  // Mock patient data - in real app, fetch by ID
  const patient = {
    id: id || "1",
    name: "Sarah Johnson",
    age: 67,
    mrn: "MRN-001234",
    riskLevel: "high",
    lastVisit: "2024-01-08",
    conditions: ["Diabetes", "Hypertension", "COPD"],
    provider: "Dr. Wilson",
    status: "active",
    phone: "(555) 123-4567",
    email: "sarah.johnson@email.com",
    address: "123 Main St, Anytown, ST 12345",
    emergencyContact: "John Johnson (spouse) - (555) 987-6543",
    insurance: "Blue Cross Blue Shield",
    allergies: ["Penicillin", "Shellfish"]
  };

  const vitals = [
    { label: "Blood Pressure", value: "145/92", status: "high", date: "Today" },
    { label: "Heart Rate", value: "78 bpm", status: "normal", date: "Today" },
    { label: "Temperature", value: "98.6°F", status: "normal", date: "Today" },
    { label: "Weight", value: "165 lbs", status: "normal", date: "Yesterday" },
    { label: "BMI", value: "27.3", status: "moderate", date: "Yesterday" },
  ];

  const medications = [
    { name: "Metformin", dosage: "500mg", frequency: "Twice daily", prescriber: "Dr. Wilson" },
    { name: "Lisinopril", dosage: "10mg", frequency: "Once daily", prescriber: "Dr. Wilson" },
    { name: "Albuterol", dosage: "90mcg", frequency: "As needed", prescriber: "Dr. Patel" },
  ];

  const appointments = [
    { date: "2024-01-15", time: "10:00 AM", type: "Follow-up", provider: "Dr. Wilson", status: "Scheduled" },
    { date: "2024-01-08", time: "2:30 PM", type: "Routine", provider: "Dr. Wilson", status: "Completed" },
    { date: "2023-12-20", time: "11:15 AM", type: "Consultation", provider: "Dr. Patel", status: "Completed" },
  ];

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high': return 'bg-destructive text-destructive-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'low': return 'bg-success text-success-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getVitalStatus = (status: string) => {
    switch (status) {
      case 'high': return 'text-destructive';
      case 'low': return 'text-destructive';
      case 'normal': return 'text-success';
      case 'moderate': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" asChild>
          <Link to="/patients">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Patients
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl md:text-3xl font-bold">Patient Chart</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </div>
      </div>

      {/* Patient Overview */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="text-lg">
                {patient.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-2">
                <h2 className="text-xl font-semibold">{patient.name}</h2>
                <Badge className={getRiskColor(patient.riskLevel)}>
                  {patient.riskLevel} risk
                </Badge>
                <Badge variant="outline">{patient.status}</Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-muted-foreground">
                <div>Age: {patient.age} years</div>
                <div>MRN: {patient.mrn}</div>
                <div>Provider: {patient.provider}</div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{patient.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{patient.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{patient.address}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="vitals">Vitals</TabsTrigger>
          <TabsTrigger value="medications">Medications</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Medical Conditions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {patient.conditions.map((condition, index) => (
                    <Badge key={index} variant="outline" className="mr-2">
                      {condition}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Allergies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {patient.allergies.map((allergy, index) => (
                    <Badge key={index} variant="destructive" className="mr-2">
                      {allergy}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Emergency Contact</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{patient.emergencyContact}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Insurance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{patient.insurance}</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="vitals" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Recent Vitals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {vitals.map((vital, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{vital.label}</h4>
                      <span className="text-xs text-muted-foreground">{vital.date}</span>
                    </div>
                    <div className={`text-lg font-semibold ${getVitalStatus(vital.status)}`}>
                      {vital.value}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="medications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Pill className="h-5 w-5" />
                Current Medications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {medications.map((medication, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{medication.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {medication.dosage} • {medication.frequency}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Prescribed by {medication.prescriber}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appointments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Appointment History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {appointments.map((appointment, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{appointment.type}</h4>
                      <p className="text-sm text-muted-foreground">
                        {appointment.date} at {appointment.time}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Provider: {appointment.provider}
                      </p>
                    </div>
                    <Badge variant={appointment.status === "Completed" ? "default" : "secondary"}>
                      {appointment.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PatientChart;