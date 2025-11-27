import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Activity, AlertTriangle, Clock, Users, Heart, RefreshCw, Siren } from "lucide-react";
import { useEmergencyCases, useEmergencyMetrics } from "@/hooks/useEmergency";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";

export default function EmergencyDepartment() {
  const navigate = useNavigate();
  const { data: cases, isLoading: casesLoading, refetch } = useEmergencyCases();
  const { data: metrics, isLoading: metricsLoading } = useEmergencyMetrics();

  // Filter active cases (not discharged)
  const activeCases = cases?.filter(c => c.status !== 'discharged' && !c.discharge_time) || [];

  const getTriageColor = (level: number) => {
    if (level === 1) return "bg-red-600 text-white"; // Resuscitation
    if (level === 2) return "bg-red-500 text-white"; // Emergency
    if (level === 3) return "bg-orange-500 text-white"; // Urgent
    if (level === 4) return "bg-yellow-500 text-black"; // Standard
    return "bg-green-500 text-white"; // Non-urgent
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "waiting": return "bg-blue-100 text-blue-800";
      case "in_treatment": return "bg-purple-100 text-purple-800";
      case "ready_discharge": return "bg-green-100 text-green-800";
      case "discharged": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getMetricColor = (value: number, thresholds: { low: number, high: number }) => {
    if (value >= thresholds.high) return "text-red-600";
    if (value >= thresholds.low) return "text-orange-600";
    return "text-green-600";
  };

  if (casesLoading || metricsLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-24 w-full" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Siren className="h-8 w-8 text-red-500" />
          Emergency Department
        </h1>
        <p className="text-muted-foreground">Real-time ED monitoring and patient flow management</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Occupancy</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getMetricColor(metrics?.occupancy || 0, { low: 50, high: 75 })}`}>
              {metrics?.occupancyPercent || '0%'}
            </div>
            <p className="text-xs text-muted-foreground">{metrics?.activeCases || 0} active patients</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Wait Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getMetricColor(metrics?.avgWaitTime || 0, { low: 30, high: 60 })}`}>
              {metrics?.avgWaitTimeDisplay || '0 min'}
            </div>
            <p className="text-xs text-muted-foreground">Last 24 hours</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Cases</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getMetricColor(metrics?.criticalCases || 0, { low: 5, high: 10 })}`}>
              {metrics?.criticalCases || 0}
            </div>
            <p className="text-xs text-muted-foreground">Triage 1-2</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Discharge Rate</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {metrics?.dischargeRateDisplay || '0/hr'}
            </div>
            <p className="text-xs text-muted-foreground">Last hour</p>
          </CardContent>
        </Card>
      </div>

      {/* Current Patients */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5" />
              Current ED Patients
            </CardTitle>
            <CardDescription>Real-time patient status and triage information</CardDescription>
          </div>
          <Button 
            onClick={() => refetch()}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        </CardHeader>
        <CardContent>
          {activeCases.length > 0 ? (
            <div className="space-y-4">
              {activeCases.map((edCase) => {
                const patient = edCase.patients;
                const waitTime = edCase.wait_time_minutes 
                  ? `${edCase.wait_time_minutes} min` 
                  : formatDistanceToNow(new Date(edCase.arrival_time), { addSuffix: false });

                return (
                  <div 
                    key={edCase.id} 
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/5 transition-colors cursor-pointer"
                    onClick={() => navigate(`/patient-chart/${edCase.patient_id}`)}
                  >
                    <div className="flex items-center gap-4">
                      <Badge className={getTriageColor(edCase.triage_level)}>
                        Triage {edCase.triage_level}
                      </Badge>
                      <div>
                        <p className="font-medium">
                          {patient?.first_name} {patient?.last_name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {patient?.medical_record_number} • {edCase.chief_complaint}
                        </p>
                        {edCase.bed_number && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Bed: {edCase.bed_number}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">Wait: {waitTime}</p>
                      <Badge variant="outline" className={`mt-1 ${getStatusColor(edCase.status || 'waiting')}`}>
                        {edCase.status?.replace('_', ' ')}
                      </Badge>
                      {edCase.assigned_provider && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Provider: {edCase.assigned_provider}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="p-4 rounded-full bg-muted/30 mb-4">
                <Heart className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-sm font-medium text-foreground mb-1">No Active Patients</p>
              <p className="text-xs text-muted-foreground">Emergency department is currently clear</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Capacity Alert */}
      {metrics && metrics.occupancy >= 75 && (
        <Card className="border-orange-200 bg-orange-50 dark:bg-orange-900/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-800 dark:text-orange-400">
              <AlertTriangle className="h-5 w-5" />
              Capacity Alert
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-orange-700 dark:text-orange-300">
              Emergency Department is at {metrics.occupancyPercent} capacity. Consider implementing surge protocols 
              and coordinating with inpatient units for admissions.
            </p>
            <Button 
              className="mt-3" 
              variant="outline"
              onClick={() => navigate('/analytics')}
            >
              View Analytics
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}