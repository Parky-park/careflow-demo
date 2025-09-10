import { MetricCard } from "@/components/dashboard/MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, TrendingUp, Users, Activity, DollarSign, Calendar } from "lucide-react";

const Analytics = () => {
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
          value="94.2%"
          change={{ value: 2.1, type: 'increase' }}
          status="success"
          icon={<TrendingUp className="h-4 w-4" />}
        />
        <MetricCard
          title="Average Length of Stay"
          value="3.2 days"
          change={{ value: 0.5, type: 'decrease' }}
          status="success"
          icon={<Calendar className="h-4 w-4" />}
        />
        <MetricCard
          title="Readmission Rate"
          value="8.7%"
          change={{ value: 1.2, type: 'decrease' }}
          status="success"
          icon={<Activity className="h-4 w-4" />}
        />
        <MetricCard
          title="Cost per Patient"
          value="$4,250"
          change={{ value: 3.8, type: 'decrease' }}
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
                    <div className="bg-destructive h-2 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                  <span className="text-sm font-medium">78%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Scheduled Procedures</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                  <span className="text-sm font-medium">92%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Outpatient Visits</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-muted rounded-full h-2">
                    <div className="bg-success h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  <span className="text-sm font-medium">85%</span>
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
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">ICU Beds</p>
                  <p className="text-sm text-muted-foreground">18 of 24 occupied</p>
                </div>
                <Badge variant="secondary">75%</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Operating Rooms</p>
                  <p className="text-sm text-muted-foreground">6 of 8 in use</p>
                </div>
                <Badge variant="secondary">75%</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Staff Coverage</p>
                  <p className="text-sm text-muted-foreground">Full staffing achieved</p>
                </div>
                <Badge className="bg-green-500 text-white">100%</Badge>
              </div>
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
                <span className="font-medium">12%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Age 19-35</span>
                <span className="font-medium">23%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Age 36-65</span>
                <span className="font-medium">45%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Age 65+</span>
                <span className="font-medium">20%</span>
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
              <div className="flex justify-between items-center">
                <span className="text-sm">Hypertension</span>
                <Badge variant="outline">234 cases</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Diabetes</span>
                <Badge variant="outline">189 cases</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Heart Disease</span>
                <Badge variant="outline">156 cases</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">COPD</span>
                <Badge variant="outline">98 cases</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quality Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Safety Score</span>
                <span className="font-bold text-green-600">9.2/10</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Clinical Outcomes</span>
                <span className="font-bold text-green-600">94.5%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Compliance Rate</span>
                <span className="font-bold text-blue-600">97.8%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Error Rate</span>
                <span className="font-bold text-green-600">0.3%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;