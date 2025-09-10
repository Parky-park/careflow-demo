import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HeartHandshake, Users, Calendar, MessageSquare, Phone, Star, Clock } from "lucide-react";

const CareTeams = () => {
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
      rating: 4.9,
      status: "active"
    },
    {
      id: "2",
      name: "Nurse Jennifer Lee",
      role: "Charge Nurse",
      specialty: "Critical Care Nursing", 
      experience: "8 years",
      currentPatients: 12,
      rating: 4.8,
      status: "active"
    },
    {
      id: "3",
      name: "Dr. Raj Patel",
      role: "Resident Physician",
      specialty: "Internal Medicine",
      experience: "3 years", 
      currentPatients: 18,
      rating: 4.6,
      status: "active"
    },
    {
      id: "4",
      name: "Maria Santos",
      role: "Clinical Coordinator", 
      specialty: "Care Coordination",
      experience: "6 years",
      currentPatients: 45,
      rating: 4.7,
      status: "break"
    }
  ];

  const getAvailabilityColor = (status: string) => {
    switch (status) {
      case 'Available': return 'bg-success text-success-foreground';
      case 'Busy': return 'bg-warning text-warning-foreground';
      case 'Unavailable': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success';
      case 'break': return 'bg-warning';
      case 'off-duty': return 'bg-muted';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-background via-background to-muted/20 flex flex-col">
      <DashboardHeader />
      
      <div className="flex flex-1 overflow-hidden">
        <NavigationSidebar />
        
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="space-y-6">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
                <HeartHandshake className="h-8 w-8 text-primary" />
                Care Teams
              </h1>
              <p className="text-muted-foreground mt-2">
                Collaborative healthcare team management and coordination
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
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={`https://api.dicebear.com/7.x/personas/svg?seed=${team.lead}`} />
                        <AvatarFallback>
                          {team.lead.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{team.lead}</p>
                        <p className="text-xs text-muted-foreground">Team Lead</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Members</p>
                        <p className="font-medium">{team.members}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Active Patients</p>
                        <p className="font-medium">{team.activePatients}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Specialties</p>
                      <div className="flex flex-wrap gap-1">
                        {team.specialties.map((specialty, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Performance</span>
                        <span className="font-medium">{team.performance}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full">
                        <div 
                          className="h-full bg-success rounded-full transition-all"
                          style={{ width: `${team.performance}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1 gap-1">
                        <MessageSquare className="h-3 w-3" />
                        Message
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 gap-1">
                        <Calendar className="h-3 w-3" />
                        Schedule
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Team Members */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Team Members - Cardiology Unit A
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teamMembers.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-muted/30 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={`https://api.dicebear.com/7.x/personas/svg?seed=${member.name}`} />
                            <AvatarFallback>
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white ${getStatusColor(member.status)}`} />
                        </div>
                        
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{member.name}</h3>
                            <Badge variant="outline" className="text-xs">
                              {member.role}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>{member.specialty}</span>
                            <span>•</span>
                            <span>{member.experience}</span>
                            <span>•</span>
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 text-yellow-500 fill-current" />
                              <span>{member.rating}</span>
                            </div>
                          </div>
                          
                          <div className="text-sm text-muted-foreground">
                            Current patients: {member.currentPatients}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="gap-1">
                          <MessageSquare className="h-3 w-3" />
                          Message
                        </Button>
                        <Button variant="outline" size="sm" className="gap-1">
                          <Phone className="h-3 w-3" />
                          Call
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Team Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Average Response Time</p>
                      <p className="text-2xl font-bold">4.2min</p>
                      <p className="text-xs text-success flex items-center gap-1 mt-1">
                        <Clock className="h-3 w-3" />
                        12% faster than last month
                      </p>
                    </div>
                    <Clock className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Patient Satisfaction</p>
                      <p className="text-2xl font-bold">96.8%</p>
                      <p className="text-xs text-success flex items-center gap-1 mt-1">
                        <Star className="h-3 w-3" />
                        +2.1% from last quarter
                      </p>
                    </div>
                    <Star className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Care Coordination</p>
                      <p className="text-2xl font-bold">94.1%</p>
                      <p className="text-xs text-success flex items-center gap-1 mt-1">
                        <HeartHandshake className="h-3 w-3" />
                        Excellent collaboration
                      </p>
                    </div>
                    <HeartHandshake className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CareTeams;