import { MetricCard } from "@/components/dashboard/MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { BarChart3, TrendingUp, Users, Activity, DollarSign, Calendar, Bed, Building2, UserCheck, Shield, Stethoscope, CheckCircle2, AlertCircle } from "lucide-react";
import { useAnalytics } from "@/hooks/useAnalytics";

const Analytics = () => {
  const { data: analytics, isLoading } = useAnalytics();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-4 w-96 mt-2" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      </div>
    );
  }

  if (!analytics) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
          <BarChart3 className="h-8 w-8 text-primary" />
          Analytics Dashboard
        </h1>
        <p className="text-muted-foreground mt-2">
          Comprehensive healthcare analytics and performance metrics
        </p>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Patient Satisfaction"
          value={analytics.patientSatisfaction > 0 ? `${analytics.patientSatisfaction}%` : '—'}
          change={analytics.patientSatisfaction > 0 ? { value: 2.1, type: 'increase' } : undefined}
          status={analytics.patientSatisfaction > 0 ? "success" : "normal"}
          icon={<TrendingUp className="h-4 w-4" />}
        />
        <MetricCard
          title="Average Length of Stay"
          value={analytics.avgLengthOfStay > 0 ? `${analytics.avgLengthOfStay} days` : '—'}
          change={analytics.avgLengthOfStay > 0 ? { value: 0.5, type: 'decrease' } : undefined}
          status={analytics.avgLengthOfStay > 0 ? "success" : "normal"}
          icon={<Calendar className="h-4 w-4" />}
        />
        <MetricCard
          title="Readmission Rate"
          value={analytics.readmissionRate > 0 ? `${analytics.readmissionRate}%` : '—'}
          change={analytics.readmissionRate > 0 ? { value: 1.2, type: 'decrease' } : undefined}
          status={analytics.readmissionRate > 0 ? "success" : "normal"}
          icon={<Activity className="h-4 w-4" />}
        />
        <MetricCard
          title="Cost per Patient"
          value={analytics.avgCost > 0 ? `$${analytics.avgCost.toLocaleString()}` : '—'}
          change={analytics.avgCost > 0 ? { value: 3.8, type: 'decrease' } : undefined}
          status={analytics.avgCost > 0 ? "success" : "normal"}
          icon={<DollarSign className="h-4 w-4" />}
        />
      </div>

      {/* Analytics Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Patient Flow Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Emergency Admissions</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-muted rounded-full h-2">
                    <div className="bg-destructive h-2 rounded-full" style={{ width: `${analytics.patientFlow.emergency}%` }}></div>
                  </div>
                  <span className="text-sm font-medium">{analytics.patientFlow.emergency}%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Scheduled Procedures</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: `${analytics.patientFlow.scheduled}%` }}></div>
                  </div>
                  <span className="text-sm font-medium">{analytics.patientFlow.scheduled}%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Outpatient Visits</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-muted rounded-full h-2">
                    <div className="bg-success h-2 rounded-full" style={{ width: `${analytics.patientFlow.outpatient}%` }}></div>
                  </div>
                  <span className="text-sm font-medium">{analytics.patientFlow.outpatient}%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resource Utilization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.icuBedsTotal > 0 ? (
                <>
                  <div className="flex items-center justify-between p-3 border rounded-lg bg-card hover:bg-accent/5 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-primary/10">
                        <Bed className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">ICU Beds</p>
                        <p className="text-sm text-muted-foreground">{analytics.icuBeds} of {analytics.icuBedsTotal} occupied</p>
                      </div>
                    </div>
                    <Badge variant="secondary">{Math.round((analytics.icuBeds / analytics.icuBedsTotal) * 100)}%</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg bg-card hover:bg-accent/5 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-primary/10">
                        <Building2 className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Operating Rooms</p>
                        <p className="text-sm text-muted-foreground">{analytics.operatingRooms} of {analytics.operatingRoomsTotal} in use</p>
                      </div>
                    </div>
                    <Badge variant="secondary">{analytics.operatingRoomsTotal > 0 ? Math.round((analytics.operatingRooms / analytics.operatingRoomsTotal) * 100) : 0}%</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg bg-card hover:bg-accent/5 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-success/10">
                        <UserCheck className="h-4 w-4 text-success" />
                      </div>
                      <div>
                        <p className="font-medium">Staff Coverage</p>
                        <p className="text-sm text-muted-foreground">{analytics.staffCoverage === 100 ? 'Full staffing achieved' : analytics.staffCoverage > 0 ? `${analytics.staffCoverage}% staffed` : 'Awaiting data'}</p>
                      </div>
                    </div>
                    <Badge className={analytics.staffCoverage === 100 ? "bg-green-500 text-white" : ""}>{analytics.staffCoverage}%</Badge>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center col-span-full">
                  <div className="p-4 rounded-full bg-muted/30 mb-4">
                    <Building2 className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <p className="text-sm font-medium text-foreground mb-1">No Facility Data</p>
                  <p className="text-xs text-muted-foreground max-w-xs">Add facilities to track ICU beds, operating rooms, and staff coverage</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Patient Demographics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Age 0-18</span>
                <span className="font-medium">{analytics.demographics['0-18']}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Age 19-35</span>
                <span className="font-medium">{analytics.demographics['19-35']}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Age 36-65</span>
                <span className="font-medium">{analytics.demographics['36-65']}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Age 65+</span>
                <span className="font-medium">{analytics.demographics['65+']}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Conditions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analytics.topConditions.length > 0 ? (
                analytics.topConditions.map(({ condition, count }) => (
                  <div key={condition} className="flex justify-between items-center">
                    <span className="text-sm">{condition}</span>
                    <Badge variant="outline">{count} cases</Badge>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No condition data available
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quality Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.safetyScore > 0 || analytics.clinicalOutcomes > 0 || analytics.complianceRate > 0 || analytics.errorRate > 0 ? (
                <>
                  <div className="flex items-center justify-between p-2 rounded-lg hover:bg-accent/5 transition-colors">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Safety Score</span>
                    </div>
                    <span className={`font-bold ${analytics.safetyScore > 0 ? 'text-green-600' : 'text-muted-foreground'}`}>
                      {analytics.safetyScore > 0 ? `${analytics.safetyScore}/10` : '—'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg hover:bg-accent/5 transition-colors">
                    <div className="flex items-center gap-2">
                      <Stethoscope className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Clinical Outcomes</span>
                    </div>
                    <span className={`font-bold ${analytics.clinicalOutcomes > 0 ? 'text-green-600' : 'text-muted-foreground'}`}>
                      {analytics.clinicalOutcomes > 0 ? `${analytics.clinicalOutcomes}%` : '—'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg hover:bg-accent/5 transition-colors">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Compliance Rate</span>
                    </div>
                    <span className={`font-bold ${analytics.complianceRate > 0 ? 'text-blue-600' : 'text-muted-foreground'}`}>
                      {analytics.complianceRate > 0 ? `${analytics.complianceRate}%` : '—'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg hover:bg-accent/5 transition-colors">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Error Rate</span>
                    </div>
                    <span className={`font-bold ${analytics.errorRate > 0 ? 'text-green-600' : 'text-muted-foreground'}`}>
                      {analytics.errorRate > 0 ? `${analytics.errorRate}%` : '—'}
                    </span>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="p-3 rounded-full bg-muted/30 mb-3">
                    <Shield className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <p className="text-sm font-medium text-foreground mb-1">No Quality Data</p>
                  <p className="text-xs text-muted-foreground">Track quality metrics to monitor performance</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;