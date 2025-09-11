import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HeartHandshake, Users, Calendar, MessageSquare, Phone, Star, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CareTeams = () => {
  const navigate = useNavigate();
  
  const teams = [
    {
      id: "1",
      name: "Cardiology Unit A",
      lead: "Dr. Sarah Wilson",
      members: 8,
      activePatients: 34,
      specialties: ["Cardiology", "Cardiac Surgery"],
      performance: 96,
      availability: "Available"
    },
    {
      id: "2", 
      name: "Emergency Medicine",
      lead: "Dr. Michael Chen",
      members: 12,
      activePatients: 67,
      specialties: ["Emergency Medicine", "Trauma"],
      performance: 94,
      availability: "Busy"
    },
    {
      id: "3",
      name: "Internal Medicine Team",
      lead: "Dr. Jennifer Rodriguez",
      members: 15,
      activePatients: 89,
      specialties: ["Internal Medicine", "Geriatrics"],
      performance: 92,
      availability: "Available"
    }
  ];

  const teamMembers = [
    {
      id: "1",
      name: "Dr. Sarah Wilson",
      role: "Team Lead - Cardiologist",
      specialty: "Interventional Cardiology",
      experience: "15 years",
      currentPatients: 23,
      availability: "Available",
      rating: 4.9
    },
    {
      id: "2",
      name: "Dr. Michael Chen",
      role: "Emergency Physician",
      specialty: "Emergency Medicine",
      experience: "12 years",
      currentPatients: 18,
      availability: "In Surgery",
      rating: 4.8
    },
    {
      id: "3",
      name: "Nurse Jennifer Smith",
      role: "Senior Nurse",
      specialty: "Critical Care",
      experience: "10 years",
      currentPatients: 12,
      availability: "Available",
      rating: 4.7
    }
  ];

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'Available': return 'bg-green-500 text-white';
      case 'Busy': return 'bg-yellow-500 text-black';
      case 'In Surgery': return 'bg-red-500 text-white';
      case 'Off Duty': return 'bg-gray-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getPerformanceColor = (performance: number) => {
    if (performance >= 95) return 'text-green-600';
    if (performance >= 90) return 'text-blue-600';
    if (performance >= 85) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
          <HeartHandshake className="h-8 w-8 text-primary" />
          Care Teams
        </h1>
        <p className="text-muted-foreground mt-2">
          Coordinate healthcare teams and manage collaborative care
        </p>
      </div>

      {/* Team Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {teams.map((team) => (
          <Card key={team.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{team.name}</CardTitle>
                <Badge className={getAvailabilityColor(team.availability)}>
                  {team.availability}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">Led by {team.lead}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Team Members</span>
                  <span className="font-medium">{team.members}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Active Patients</span>
                  <span className="font-medium">{team.activePatients}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Performance</span>
                  <span className={`font-bold ${getPerformanceColor(team.performance)}`}>
                    {team.performance}%
                  </span>
                </div>
                <div className="pt-2">
                  <p className="text-xs text-muted-foreground mb-2">Specialties:</p>
                  <div className="flex flex-wrap gap-1">
                    {team.specialties.map((specialty, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button 
                    size="sm" 
                    className="flex-1"
                    onClick={() => {
                      navigate(`/messages?team=${team.id}`);
                    }}
                  >
                    <MessageSquare className="h-3 w-3 mr-1" />
                    Message
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => {
                      navigate(`/teams/${team.id}`);
                    }}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Team Members */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Team Members
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {teamMembers.map((member) => (
              <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/20 transition-colors">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={`https://api.dicebear.com/7.x/personas/svg?seed=${member.name}`} />
                    <AvatarFallback>
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold">{member.name}</h3>
                      <Badge className={getAvailabilityColor(member.availability)}>
                        {member.availability}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {member.experience}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {member.currentPatients} patients
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        {member.rating}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => {
                      window.location.href = `tel:+1234567890`;
                    }}
                  >
                    <Phone className="h-3 w-3 mr-1" />
                    Call
                  </Button>
                  <Button 
                    size="sm"
                    onClick={() => {
                      navigate(`/messages?user=${member.id}`);
                    }}
                  >
                    <MessageSquare className="h-3 w-3 mr-1" />
                    Message
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Team Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Team Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">94.2%</p>
              <p className="text-sm text-muted-foreground">Average Team Performance</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">190</p>
              <p className="text-sm text-muted-foreground">Total Active Patients</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">35</p>
              <p className="text-sm text-muted-foreground">Total Team Members</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CareTeams;