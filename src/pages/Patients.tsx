import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Users, Search, Plus, AlertTriangle, Heart, Clock, X } from "lucide-react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

const Patients = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [localSearch, setLocalSearch] = useState("");

  const { data: patients, isLoading } = useQuery({
    queryKey: ['patients'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('patients')
        .select('*')
        .order('last_name', { ascending: true });
      
      if (error) throw error;
      return data || [];
    },
  });

  const activeSearch = searchParams.get("search") || localSearch;

  const handleLocalSearch = (value: string) => {
    setLocalSearch(value);
    if (searchParams.get("search")) {
      setSearchParams({});
    }
  };

  const clearSearch = () => {
    setLocalSearch("");
    setSearchParams({});
  };

  const filteredPatients = useMemo(() => {
    if (!patients) return [];
    if (!activeSearch) return patients;
    
    const query = activeSearch.toLowerCase();
    return patients.filter(patient =>
      patient.first_name?.toLowerCase().includes(query) ||
      patient.last_name?.toLowerCase().includes(query) ||
      patient.email?.toLowerCase().includes(query) ||
      patient.phone?.toLowerCase().includes(query) ||
      patient.medical_record_number?.toLowerCase().includes(query) ||
      patient.status?.toLowerCase().includes(query)
    );
  }, [patients, activeSearch]);

  const getRiskColor = (score: number) => {
    if (score >= 80) return 'bg-destructive text-destructive-foreground';
    if (score >= 60) return 'bg-warning text-warning-foreground';
    return 'bg-success text-success-foreground';
  };

  const getRiskIcon = (score: number) => {
    if (score >= 80) return <AlertTriangle className="h-3 w-3" />;
    if (score >= 60) return <Clock className="h-3 w-3" />;
    return <Heart className="h-3 w-3" />;
  };

  const getRiskLabel = (score: number) => {
    if (score >= 80) return 'High Risk';
    if (score >= 60) return 'Medium Risk';
    return 'Low Risk';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'border-success text-success';
      case 'inactive': return 'border-muted text-muted-foreground';
      case 'critical': return 'border-destructive text-destructive';
      case 'stable': return 'border-accent text-accent';
      default: return 'border-muted text-muted-foreground';
    }
  };

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

  if (isLoading) {
    return (
      <div className="space-y-4 md:space-y-6 p-4 md:p-6">
        <Skeleton className="h-20 w-full" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-40 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6 p-4 md:p-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-xl md:text-2xl">Patient Management</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  {filteredPatients.length} {filteredPatients.length === 1 ? 'patient' : 'patients'} found
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <Button onClick={() => navigate('/patients/add')} className="gap-2">
                <Plus className="h-4 w-4" />
                Add Patient
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search by name, MRN, email, phone..."
              value={activeSearch}
              onChange={(e) => handleLocalSearch(e.target.value)}
              className="pl-10 pr-10"
            />
            {activeSearch && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearSearch}
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          {filteredPatients.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPatients.map((patient) => {
                const age = calculateAge(patient.date_of_birth);
                
                return (
                  <Card 
                    key={patient.id} 
                    className="hover:shadow-md transition-shadow cursor-pointer group"
                    onClick={() => navigate(`/patients/${patient.id}/chart`)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={`https://api.dicebear.com/7.x/personas/svg?seed=${patient.id}`} />
                          <AvatarFallback>
                            {patient.first_name[0]}{patient.last_name[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0 flex-1">
                              <h3 className="font-semibold text-sm truncate group-hover:text-primary transition-colors">
                                {patient.first_name} {patient.last_name}
                              </h3>
                              <p className="text-xs text-muted-foreground">
                                {age} years • {patient.gender || 'N/A'}
                              </p>
                            </div>
                          </div>
                          
                          <div className="mt-3 space-y-2">
                            <div className="flex items-center gap-2 flex-wrap">
                              <Badge className={`text-xs ${getRiskColor(patient.risk_score)}`}>
                                {getRiskIcon(patient.risk_score)}
                                {getRiskLabel(patient.risk_score)}
                              </Badge>
                              <Badge 
                                variant="outline" 
                                className={`text-xs ${getStatusColor(patient.status)}`}
                              >
                                {patient.status}
                              </Badge>
                            </div>
                            
                            {patient.medical_record_number && (
                              <p className="text-xs text-muted-foreground">
                                MRN: {patient.medical_record_number}
                              </p>
                            )}
                            
                            {patient.last_visit && (
                              <p className="text-xs text-muted-foreground">
                                Last visit: {new Date(patient.last_visit).toLocaleDateString()}
                              </p>
                            )}

                            {patient.phone && (
                              <p className="text-xs text-muted-foreground truncate">
                                📞 {patient.phone}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No patients found</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {activeSearch 
                  ? "Try adjusting your search criteria"
                  : "Get started by adding your first patient"
                }
              </p>
              {!activeSearch && (
                <Button onClick={() => navigate('/patients/add')}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Patient
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Patients;
