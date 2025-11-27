import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { UserRoundCheck, TrendingUp, DollarSign, Calendar, Phone, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export default function HotSpotters() {
  const navigate = useNavigate();
  
  const { data: highUtilizers, isLoading } = useQuery({
    queryKey: ['high-utilizers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('patients')
        .select('*')
        .gte('risk_score', 80)
        .order('risk_score', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
  });

  const calculateAge = (dob: string) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const getRiskColor = (score: number) => {
    if (score >= 90) return 'bg-destructive text-destructive-foreground';
    if (score >= 75) return 'bg-warning text-warning-foreground';
    return 'bg-success text-success-foreground';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'active': return 'bg-primary/10 text-primary border-primary/20';
      case 'stable': return 'bg-success/10 text-success border-success/20';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  const hotSpotterMetrics = [
    { label: "High Utilizers", value: highUtilizers?.length.toString() || "0", icon: UserRoundCheck },
    { label: "Cost Impact", value: "$2.3M", icon: DollarSign },
    { label: "Interventions Active", value: "23", icon: TrendingUp },
    { label: "Next Reviews", value: "8", icon: Calendar },
  ];

  if (isLoading) {
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
          {highUtilizers && highUtilizers.length > 0 ? (
            <div className="space-y-4">
              {highUtilizers.map((patient) => {
                const age = calculateAge(patient.date_of_birth);
                
                return (
                  <div key={patient.id} className="border rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold">{patient.first_name} {patient.last_name}</h3>
                        <p className="text-muted-foreground">Age: {age} • MRN: {patient.medical_record_number || 'N/A'}</p>
                      </div>
                      <Badge className={getRiskColor(patient.risk_score)}>
                        Risk: {patient.risk_score}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Status</p>
                        <Badge className={getStatusColor(patient.status)} variant="outline">
                          {patient.status}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Last Visit</p>
                        <p className="text-lg font-medium">
                          {patient.last_visit ? new Date(patient.last_visit).toLocaleDateString() : '—'}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Contact</p>
                        <p className="text-sm">{patient.phone || patient.email || '—'}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        {patient.insurance_provider && (
                          <p className="text-sm text-muted-foreground">
                            Insurance: {patient.insurance_provider}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => patient.phone && window.open(`tel:${patient.phone}`)}
                          disabled={!patient.phone}
                        >
                          <Phone className="h-4 w-4 mr-1" />
                          Contact
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => navigate(`/patients/${patient.id}/chart`)}
                        >
                          View Chart
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No high utilizers found</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Add patients with risk scores above 80 to track high utilizers
              </p>
              <Button onClick={() => navigate('/patients/add?type=high-utilizer')}>
                Add High Utilizer
              </Button>
            </div>
          )}
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
                <span className="text-lg font-bold">
                  {highUtilizers?.filter(p => p.risk_score >= 90).length || 0} patients
                </span>
                <Badge>Active</Badge>
              </div>
            </div>
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2">Complex Care Management</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Intensive case management for multi-morbidity patients
              </p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">
                  {highUtilizers?.filter(p => p.risk_score >= 80 && p.risk_score < 90).length || 0} patients
                </span>
                <Badge>Active</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}