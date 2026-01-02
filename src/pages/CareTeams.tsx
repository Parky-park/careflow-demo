import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { HeartHandshake, Users, MessageSquare, Phone, Package, Plus, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCareTeams, useStaffMembers } from "@/hooks/useCareTeams";
import { AddCareTeamModal } from "@/components/modals/AddCareTeamModal";
import { AddStaffModal } from "@/components/modals/AddStaffModal";
import { useState } from "react";

const CareTeams = () => {
  const navigate = useNavigate();
  const { data: teams, isLoading: teamsLoading } = useCareTeams();
  const { data: staff, isLoading: staffLoading } = useStaffMembers();
  const [showAddTeamModal, setShowAddTeamModal] = useState(false);
  const [showAddStaffModal, setShowAddStaffModal] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success text-success-foreground';
      case 'inactive': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  if (teamsLoading || staffLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-20 w-full" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-60 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <HeartHandshake className="h-8 w-8 text-primary" />
            Care Teams
          </h1>
          <p className="text-muted-foreground mt-2">
            Coordinate healthcare teams and manage collaborative care
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowAddStaffModal(true)}>
            <UserPlus className="h-4 w-4 mr-2" />
            Add Staff
          </Button>
          <Button onClick={() => setShowAddTeamModal(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Team
          </Button>
        </div>
      </div>

      {/* Team Overview */}
      {teams && teams.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {teams.map((team: any) => (
            <Card key={team.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{team.name}</CardTitle>
                  <Badge className={getStatusColor(team.status)}>
                    {team.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Led by {team.lead?.full_name || 'Not assigned'}
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Team Members</span>
                    <span className="font-medium">{team.team_members?.length || 0}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Specialty</span>
                    <Badge variant="secondary">{team.specialty || 'General'}</Badge>
                  </div>
                  <div className="pt-2">
                    <p className="text-xs text-muted-foreground mb-2">Created:</p>
                    <p className="text-sm">{new Date(team.created_at).toLocaleDateString()}</p>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button 
                      size="sm" 
                      className="flex-1"
                      onClick={() => navigate(`/messages?team=${team.id}`)}
                    >
                      <MessageSquare className="h-3 w-3 mr-1" />
                      Message
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => navigate(`/teams/${team.id}`)}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="text-center py-12">
            <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No care teams found</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Create your first care team to get started
            </p>
            <Button onClick={() => setShowAddTeamModal(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Team
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Staff Members */}
      {staff && staff.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Staff Members
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {staff.map((member: any) => (
                <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/20 transition-colors">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={`https://api.dicebear.com/7.x/personas/svg?seed=${member.full_name}`} />
                      <AvatarFallback>
                        {member.full_name.split(' ').map((n: string) => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold">{member.full_name}</h3>
                        <Badge className={getStatusColor(member.status)}>
                          {member.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {member.department || 'General'}
                        </div>
                        {member.shift && (
                          <div className="flex items-center gap-1">
                            <span>{member.shift}</span>
                          </div>
                        )}
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
      )}

      {/* Summary Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{teams?.length || 0}</p>
              <p className="text-sm text-muted-foreground">Care Teams</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{staff?.length || 0}</p>
              <p className="text-sm text-muted-foreground">Staff Members</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-success">
                {teams?.filter((t: any) => t.status === 'active').length || 0}
              </p>
              <p className="text-sm text-muted-foreground">Active Teams</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <AddCareTeamModal open={showAddTeamModal} onOpenChange={setShowAddTeamModal} />
      <AddStaffModal open={showAddStaffModal} onOpenChange={setShowAddStaffModal} />
    </div>
  );
};

export default CareTeams;