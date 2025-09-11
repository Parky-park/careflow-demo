import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HeartHandshake, ArrowLeft, Users, MessageSquare, Phone, Star } from "lucide-react";

const TeamDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock team data - in real app this would come from API
  const team = {
    id: id,
    name: "Cardiology Unit A",
    lead: "Dr. Sarah Wilson",
    members: [
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
        role: "Cardiologist",
        specialty: "Electrophysiology",
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
    ],
    activePatients: 34,
    specialties: ["Cardiology", "Cardiac Surgery"],
    performance: 96,
    availability: "Available"
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'Available': return 'bg-green-500 text-white';
      case 'Busy': return 'bg-yellow-500 text-black';
      case 'In Surgery': return 'bg-red-500 text-white';
      case 'Off Duty': return 'bg-gray-500 text-white';
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
          onClick={() => navigate('/teams')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Teams
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <HeartHandshake className="h-8 w-8 text-primary" />
            {team.name}
          </h1>
          <p className="text-muted-foreground mt-2">Led by {team.lead}</p>
        </div>
      </div>

      {/* Team Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Team Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{team.members.length}</p>
              <p className="text-sm text-muted-foreground">Team Members</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{team.activePatients}</p>
              <p className="text-sm text-muted-foreground">Active Patients</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{team.performance}%</p>
              <p className="text-sm text-muted-foreground">Performance</p>
            </div>
            <div className="text-center">
              <Badge className={getAvailabilityColor(team.availability)}>
                {team.availability}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

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
            {team.members.map((member) => (
              <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
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
                      <span>{member.experience}</span>
                      <span>{member.currentPatients} patients</span>
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
                    onClick={() => window.open(`tel:+1234567890`)}
                  >
                    <Phone className="h-3 w-3 mr-1" />
                    Call
                  </Button>
                  <Button 
                    size="sm"
                    onClick={() => navigate(`/messages?user=${member.id}`)}
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
    </div>
  );
};

export default TeamDetail;