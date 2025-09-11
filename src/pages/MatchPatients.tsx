import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Users, MapPin, Target } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const MatchPatients = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const unattachedPatients = [
    {
      id: "1",
      name: "John Smith",
      age: 45,
      location: "Downtown",
      conditions: ["Diabetes", "Hypertension"],
      distance: "2.3 miles",
      matchScore: 92
    },
    {
      id: "2", 
      name: "Mary Johnson",
      age: 67,
      location: "Westside",
      conditions: ["COPD"],
      distance: "1.8 miles", 
      matchScore: 88
    },
    {
      id: "3",
      name: "Robert Davis",
      age: 34,
      location: "Eastside",
      conditions: ["Anxiety"],
      distance: "3.1 miles",
      matchScore: 85
    }
  ];

  const medicalHomes = [
    { id: "1", name: "Downtown Primary Care", capacity: 85, distance: "2.1 miles" },
    { id: "2", name: "Westside Community Health", capacity: 78, distance: "1.5 miles" },
    { id: "3", name: "Eastside Family Medicine", capacity: 92, distance: "2.8 miles" }
  ];

  const handleMatch = (patientId: string, homeId: string) => {
    toast({
      title: "Success",
      description: "Patient successfully matched to medical home!",
    });
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'bg-green-500 text-white';
    if (score >= 80) return 'bg-yellow-500 text-black';
    return 'bg-red-500 text-white';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/medical-homes')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Medical Homes
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Target className="h-8 w-8 text-primary" />
            Match Patients to Medical Homes
          </h1>
          <p className="text-muted-foreground mt-2">AI-powered patient-provider matching</p>
        </div>
      </div>

      {/* Unattached Patients */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Unattached Patients ({unattachedPatients.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {unattachedPatients.map((patient) => (
              <div key={patient.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={`https://api.dicebear.com/7.x/personas/svg?seed=${patient.name}`} />
                      <AvatarFallback>
                        {patient.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="space-y-1">
                      <h3 className="font-semibold">{patient.name}</h3>
                      <p className="text-sm text-muted-foreground">Age: {patient.age}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {patient.location} • {patient.distance}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {patient.conditions.map((condition, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {condition}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <Badge className={getScoreColor(patient.matchScore)}>
                      {patient.matchScore}% match
                    </Badge>
                  </div>
                </div>
                
                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-2">Recommended Medical Homes:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    {medicalHomes.map((home) => (
                      <div key={home.id} className="flex items-center justify-between p-2 border rounded">
                        <div>
                          <p className="text-sm font-medium">{home.name}</p>
                          <p className="text-xs text-muted-foreground">{home.capacity}% capacity • {home.distance}</p>
                        </div>
                        <Button 
                          size="sm"
                          onClick={() => handleMatch(patient.id, home.id)}
                        >
                          Match
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MatchPatients;