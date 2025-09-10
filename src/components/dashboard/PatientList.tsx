import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Clock, Heart, UserCheck, UserX, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface Patient {
  id: string;
  name: string;
  age: number;
  riskLevel: 'high' | 'medium' | 'low';
  lastVisit: string;
  conditions: string[];
  utilization: number;
  attachmentStatus: 'attached' | 'unattached' | 'pending';
  careTeam: string;
  continuityScore: number;
}

const mockPatients: Patient[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    age: 67,
    riskLevel: "high",
    lastVisit: "2024-01-08",
    conditions: ["Diabetes", "Hypertension"],
    utilization: 12,
    attachmentStatus: "attached",
    careTeam: "Dr. Wilson's Team",
    continuityScore: 85
  },
  {
    id: "2", 
    name: "Michael Chen",
    age: 45,
    riskLevel: "medium",
    lastVisit: "2024-01-07",
    conditions: ["Asthma"],
    utilization: 8,
    attachmentStatus: "unattached",
    careTeam: "Available",
    continuityScore: 42
  },
  {
    id: "3",
    name: "Emma Rodriguez",
    age: 72,
    riskLevel: "high", 
    lastVisit: "2024-01-06",
    conditions: ["COPD", "Heart Disease"],
    utilization: 15,
    attachmentStatus: "attached",
    careTeam: "Cardiology Team",
    continuityScore: 92
  }
];

export function PatientList() {
  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high': return 'bg-destructive text-destructive-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'low': return 'bg-success text-success-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'high': return <AlertTriangle className="h-3 w-3" />;
      case 'medium': return <Clock className="h-3 w-3" />;
      case 'low': return <Heart className="h-3 w-3" />;
    }
  };

  const getAttachmentColor = (status: string) => {
    switch (status) {
      case 'attached': return 'bg-success text-success-foreground';
      case 'unattached': return 'bg-destructive text-destructive-foreground';
      case 'pending': return 'bg-warning text-warning-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getAttachmentIcon = (status: string) => {
    switch (status) {
      case 'attached': return <UserCheck className="h-3 w-3" />;
      case 'unattached': return <UserX className="h-3 w-3" />;
      case 'pending': return <Users className="h-3 w-3" />;
    }
  };

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-primary" />
          High Utilizer Patients
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockPatients.map((patient) => (
          <div key={patient.id} className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={`https://api.dicebear.com/7.x/personas/svg?seed=${patient.name}`} />
                <AvatarFallback>
                  {patient.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium">{patient.name}</p>
                  <Badge variant="secondary" className="text-xs">
                    {patient.age}y
                  </Badge>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge className={cn("text-xs flex items-center gap-1", getRiskColor(patient.riskLevel))}>
                    {getRiskIcon(patient.riskLevel)}
                    {patient.riskLevel} risk
                  </Badge>
                  <Badge className={cn("text-xs flex items-center gap-1", getAttachmentColor(patient.attachmentStatus))}>
                    {getAttachmentIcon(patient.attachmentStatus)}
                    {patient.attachmentStatus}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {patient.utilization} visits
                  </span>
                </div>
                <div className="text-xs text-muted-foreground">
                  <span>Team: {patient.careTeam}</span>
                  <span className="ml-2">Continuity: {patient.continuityScore}%</span>
                </div>
              </div>
            </div>
            <Button variant="outline" size="sm">
              View
            </Button>
          </div>
        ))}
        <Button variant="outline" className="w-full">
          View All Patients
        </Button>
      </CardContent>
    </Card>
  );
}