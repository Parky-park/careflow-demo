import { MetricCard } from "@/components/dashboard/MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { BarChart3, TrendingUp, Users, Activity, DollarSign, Calendar } from "lucide-react";
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
          value={analytics.patientSatisfaction > 0 ? `${analytics.patientSatisfaction}%` : 'No data'}
          change={analytics.patientSatisfaction > 0 ? { value: 2.1, type: 'increase' } : undefined}
          status="success"
          icon={<TrendingUp className="h-4 w-4" />}
        />
        <MetricCard
          title="Average Length of Stay"
          value={analytics.avgLengthOfStay > 0 ? `${analytics.avgLengthOfStay} days` : 'No data'}
          change={analytics.avgLengthOfStay > 0 ? { value: 0.5, type: 'decrease' } : undefined}
          status="success"
          icon={<Calendar className="h-4 w-4" />}
        />
        <MetricCard
          title="Readmission Rate"
          value={analytics.readmissionRate > 0 ? `${analytics.readmissionRate}%` : 'No data'}
          change={analytics.readmissionRate > 0 ? { value: 1.2, type: 'decrease' } : undefined}
          status="success"
          icon={<Activity className="h-4 w-4" />}
        />
        <MetricCard
          title="Cost per Patient"
          value={analytics.avgCost > 0 ? `$${analytics.avgCost.toLocaleString()}` : 'No data'}
          change={analytics.avgCost > 0 ? { value: 3.8, type: 'decrease' } : undefined}
          status="success"
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
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">ICU Beds</p>
                      <p className="text-sm text-muted-foreground">{analytics.icuBeds} of {analytics.icuBedsTotal} occupied</p>
                    </div>
                    <Badge variant="secondary">{Math.round((analytics.icuBeds / analytics.icuBedsTotal) * 100)}%</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Operating Rooms</p>
                      <p className="text-sm text-muted-foreground">{analytics.operatingRooms} of {analytics.operatingRoomsTotal} in use</p>
                    </div>
                    <Badge variant="secondary">{analytics.operatingRoomsTotal > 0 ? Math.round((analytics.operatingRooms / analytics.operatingRoomsTotal) * 100) : 0}%</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Staff Coverage</p>
                      <p className="text-sm text-muted-foreground">{analytics.staffCoverage === 100 ? 'Full staffing achieved' : analytics.staffCoverage > 0 ? `${analytics.staffCoverage}% staffed` : 'No data'}</p>
                    </div>
                    <Badge className={analytics.staffCoverage === 100 ? "bg-green-500 text-white" : ""}>{analytics.staffCoverage}%</Badge>
                  </div>
                </>
              ) : (
                <div className="text-center py-8 text-muted-foreground col-span-full">
                  <p className="text-sm">No facility data available</p>
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
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Safety Score</span>
                    <span className={`font-bold ${analytics.safetyScore > 0 ? 'text-green-600' : 'text-muted-foreground'}`}>
                      {analytics.safetyScore > 0 ? `${analytics.safetyScore}/10` : 'No data'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Clinical Outcomes</span>
                    <span className={`font-bold ${analytics.clinicalOutcomes > 0 ? 'text-green-600' : 'text-muted-foreground'}`}>
                      {analytics.clinicalOutcomes > 0 ? `${analytics.clinicalOutcomes}%` : 'No data'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Compliance Rate</span>
                    <span className={`font-bold ${analytics.complianceRate > 0 ? 'text-blue-600' : 'text-muted-foreground'}`}>
                      {analytics.complianceRate > 0 ? `${analytics.complianceRate}%` : 'No data'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Error Rate</span>
                    <span className={`font-bold ${analytics.errorRate > 0 ? 'text-green-600' : 'text-muted-foreground'}`}>
                      {analytics.errorRate > 0 ? `${analytics.errorRate}%` : 'No data'}
                    </span>
                  </div>
                </>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p className="text-sm">No quality metrics available</p>
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