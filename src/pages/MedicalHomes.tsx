import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Building2, Users, TrendingUp, Clock, UserCheck, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export default function MedicalHomes() {
  const navigate = useNavigate();
  
  const { data: facilities, isLoading: facilitiesLoading } = useQuery({
    queryKey: ['medical-homes'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('facilities')
        .select('*')
        .eq('facility_type', 'medical_home')
        .order('name');
      
      if (error) throw error;
      return data || [];
    },
  });

  const { data: patients } = useQuery({
    queryKey: ['patients-count'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('patients')
        .select('id');
      
      if (error) throw error;
      return data || [];
    },
  });

  const totalPatients = patients?.length || 0;
  const attachedPatients = 0; // Would need a facility_id column in patients table
  const unattachedPatients = totalPatients - attachedPatients;

  const medicalHomeMetrics = [
    { label: "Active Medical Homes", value: facilities?.length.toString() || "0", icon: Building2 },
    { label: "Attached Patients", value: attachedPatients.toString(), icon: Users },
    { label: "Unattached Patients", value: unattachedPatients.toString(), icon: UserCheck },
    { label: "Avg. Attachment Time", value: "—", icon: Clock },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available": return "bg-success/10 text-success border-success/20";
      case "limited": return "bg-warning/10 text-warning border-warning/20";
      case "unavailable": return "bg-destructive/10 text-destructive border-destructive/20";
      default: return "bg-muted text-muted-foreground border-border";
    }
  };

  if (facilitiesLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-20 w-full" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </div>
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

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
          <Button onClick={() => navigate('/medical-homes/add')}>Add Medical Home</Button>
        </CardHeader>
        <CardContent>
          {facilities && facilities.length > 0 ? (
            <div className="space-y-4">
              {facilities.map((home) => (
                <div key={home.id} className="border rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">{home.name}</h3>
                      <p className="text-muted-foreground">{home.location || 'Location not specified'}</p>
                    </div>
                    <Badge className={getStatusColor(home.status)} variant="outline">
                      {home.status}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Capacity</p>
                      <p className="text-2xl font-bold">{home.capacity || 0}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Current Occupancy</p>
                      <p className="text-2xl font-bold">{home.current_occupancy || 0}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Occupancy Rate</p>
                      <p className="text-2xl font-bold text-primary">
                        {home.capacity > 0 ? Math.round((home.current_occupancy / home.capacity) * 100) : 0}%
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Type</p>
                      <Badge variant="secondary">{home.facility_type}</Badge>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm text-muted-foreground">Created: </span>
                      <span className="text-sm">{new Date(home.created_at).toLocaleDateString()}</span>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => navigate(`/medical-homes/${home.id}`)}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No medical homes found</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Create your first medical home to get started
              </p>
              <Button onClick={() => navigate('/medical-homes/add')}>
                Add Medical Home
              </Button>
            </div>
          )}
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
                <span>Total Facilities</span>
                <span className="font-bold text-primary">{facilities?.length || 0}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Total Capacity</span>
                <span className="font-bold">
                  {facilities?.reduce((sum, f) => sum + (f.capacity || 0), 0) || 0}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Current Occupancy</span>
                <span className="font-bold text-success">
                  {facilities?.reduce((sum, f) => sum + (f.current_occupancy || 0), 0) || 0}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Available Homes</span>
                <span className="font-bold text-success">
                  {facilities?.filter(f => f.status === 'available').length || 0}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>At Capacity</span>
                <span className="font-bold text-warning">
                  {facilities?.filter(f => f.status === 'unavailable').length || 0}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Total Patients</span>
                <span className="font-bold text-blue-600">{totalPatients}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}