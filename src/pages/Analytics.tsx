import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { NavigationSidebar } from "@/components/dashboard/NavigationSidebar";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, TrendingUp, Users, Activity, DollarSign, Calendar } from "lucide-react";

const Analytics = () => {
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
                value="$2,847"
                change={{ value: 5.3, type: 'decrease' }}
                status="success"
                icon={<DollarSign className="h-4 w-4" />}
              />
            </div>

            {/* Analytics Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Patient Flow Analytics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Patient Flow Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                      <span className="font-medium">Emergency Department</span>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-success">-12%</Badge>
                        <span className="text-sm">Average wait time: 23 min</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                      <span className="font-medium">ICU Utilization</span>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-warning">+8%</Badge>
                        <span className="text-sm">Current capacity: 78%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                      <span className="font-medium">Discharge Processing</span>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-success">-15%</Badge>
                        <span className="text-sm">Average time: 2.1 hours</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Financial Analytics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-primary" />
                    Financial Performance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                      <span className="font-medium">Revenue per Patient</span>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-success">+7%</Badge>
                        <span className="text-sm font-semibold">$4,234</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                      <span className="font-medium">Cost Reduction</span>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-success">-11%</Badge>
                        <span className="text-sm font-semibold">$187K saved</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                      <span className="font-medium">Insurance Claims</span>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-success">98.2%</Badge>
                        <span className="text-sm">Approval rate</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quality Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-primary" />
                    Quality Indicators
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                      <span className="font-medium">Medication Adherence</span>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-success">92.1%</Badge>
                        <TrendingUp className="h-4 w-4 text-success" />
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                      <span className="font-medium">Care Plan Compliance</span>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-success">88.7%</Badge>
                        <TrendingUp className="h-4 w-4 text-success" />
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                      <span className="font-medium">Patient Safety Score</span>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-success">96.4%</Badge>
                        <TrendingUp className="h-4 w-4 text-success" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Predictive Analytics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-accent" />
                    Predictive Insights
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 bg-muted/30 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">30-Day Readmission Risk</span>
                        <Badge variant="outline">AI Prediction</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        23 patients at high risk identified
                      </p>
                      <div className="h-2 w-full bg-muted rounded-full">
                        <div className="h-full bg-warning w-4/5 rounded-full" />
                      </div>
                    </div>
                    <div className="p-3 bg-muted/30 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Capacity Forecast</span>
                        <Badge variant="outline">Next 7 Days</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Expected 15% increase in ED visits
                      </p>
                      <div className="h-2 w-full bg-muted rounded-full">
                        <div className="h-full bg-primary w-3/4 rounded-full" />
                      </div>
                    </div>
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

export default Analytics;