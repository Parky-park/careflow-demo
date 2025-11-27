import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Clock, Heart, UserCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

export function PatientList() {
  const navigate = useNavigate();
  
  const { data: patients, isLoading } = useQuery({
    queryKey: ['high-risk-patients'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('patients')
        .select('*')
        .gte('risk_score', 60)
        .order('risk_score', { ascending: false })
        .limit(5);
      
      if (error) throw error;
      return data || [];
    },
  });
  
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
    if (score >= 80) return 'high';
    if (score >= 60) return 'medium';
    return 'low';
  };

  if (isLoading) {
    return (
      <Card className="h-fit">
        <CardHeader>
          <CardTitle>High Risk Patients</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-20 w-full" />
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-primary" />
          High Risk Patients
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 md:space-y-4 px-4 md:px-6">
        {patients && patients.length > 0 ? (
          <>
            {patients.map((patient) => {
              const age = patient.date_of_birth 
                ? new Date().getFullYear() - new Date(patient.date_of_birth).getFullYear()
                : null;
              
              return (
                <div key={patient.id} className="flex items-center justify-between p-2 md:p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
                    <Avatar className="h-8 w-8 md:h-10 md:w-10 flex-shrink-0">
                      <AvatarImage src={`https://api.dicebear.com/7.x/personas/svg?seed=${patient.id}`} />
                      <AvatarFallback>
                        {patient.first_name[0]}{patient.last_name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-xs md:text-sm font-medium truncate">
                          {patient.first_name} {patient.last_name}
                        </p>
                        {age && (
                          <Badge variant="secondary" className="text-xs flex-shrink-0">
                            {age}y
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-1 md:gap-2 flex-wrap">
                        <Badge className={cn("text-xs flex items-center gap-1", getRiskColor(patient.risk_score))}>
                          {getRiskIcon(patient.risk_score)}
                          <span className="hidden sm:inline">{getRiskLabel(patient.risk_score)} risk</span>
                          <span className="sm:hidden">Score: {patient.risk_score}</span>
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          <UserCheck className="h-3 w-3 mr-1" />
                          {patient.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="ml-2 flex-shrink-0 text-xs px-2 md:px-3"
                    onClick={() => navigate(`/patients/${patient.id}/chart`)}
                  >
                    View
                  </Button>
                </div>
              );
            })}
            <Button 
              variant="outline" 
              className="w-full text-sm"
              onClick={() => navigate('/patients')}
            >
              View All Patients
            </Button>
          </>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <p className="text-sm">No high-risk patients at this time</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => navigate('/patients/add')}
            >
              Add Patient
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}