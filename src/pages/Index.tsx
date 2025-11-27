import { MetricCard } from "@/components/dashboard/MetricCard";
import { PatientList } from "@/components/dashboard/PatientList";
import { AnalyticsChart } from "@/components/dashboard/AnalyticsChart";
import { MessagingPanel } from "@/components/dashboard/MessagingPanel";
import { MovIntegrationStatus } from "@/components/dashboard/MovIntegrationStatus";
import { Users, UserCheck, AlertTriangle, TrendingUp, Activity, Package, Brain, Stethoscope, Pill, Clock } from "lucide-react";
import heroImage from "@/assets/dashboard-hero.jpg";
import { useDashboardMetrics } from "@/hooks/useDashboardMetrics";
import { Skeleton } from "@/components/ui/skeleton";

const Index = () => {
  const { data: metrics, isLoading } = useDashboardMetrics();

  if (isLoading) {
    return (
      <div className="space-y-4 md:space-y-6">
        <Skeleton className="h-32 w-full rounded-xl" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-4 md:space-y-6">
      {/* Hero Section */}
      <div className="relative rounded-xl overflow-hidden">
        <div 
          className="h-24 md:h-32 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-accent/90" />
          <div className="relative p-4 md:p-6 text-white">
            <h2 className="text-lg md:text-2xl font-bold mb-1 md:mb-2">Welcome to CareFlow Dashboard</h2>
            <p className="text-sm md:text-base text-white/90">Integrated healthcare management with AI-driven insights</p>
          </div>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <MetricCard
          title="Critical Patients"
          value={metrics?.criticalPatients || 0}
          status="critical"
          icon={<AlertTriangle className="h-4 w-4" />}
          href="/patients?filter=critical"
        />
        <MetricCard
          title="High Risk"
          value={metrics?.highRiskPatients || 0}
          status="warning"
          icon={<AlertTriangle className="h-4 w-4" />}
          href="/patients?filter=high-risk"
        />
        <MetricCard
          title="Active Patients"
          value={metrics?.activePatients || 0}
          status="success"
          icon={<UserCheck className="h-4 w-4" />}
          href="/patients"
        />
        <MetricCard
          title="AI Risk Predictions"
          value={metrics?.activeInsights || 0}
          status="warning"
          icon={<Brain className="h-4 w-4" />}
          href="/insights"
        />
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <MetricCard
          title="Waiting in ED"
          value={metrics?.waitingInED || 0}
          status={metrics && metrics.waitingInED > 5 ? "warning" : "success"}
          icon={<Stethoscope className="h-4 w-4" />}
          href="/emergency"
        />
        <MetricCard
          title="ED Wait Time"
          value={`${metrics?.avgWaitTime || 0} min`}
          status={metrics && metrics.avgWaitTime > 30 ? "warning" : "success"}
          icon={<Clock className="h-4 w-4" />}
          href="/emergency"
        />
        <MetricCard
          title="In Treatment"
          value={metrics?.inTreatment || 0}
          status="success"
          icon={<Activity className="h-4 w-4" />}
          href="/emergency"
        />
        <MetricCard
          title="Avg. Cost per Visit"
          value={`$${metrics?.avgCost || 0}`}
          status="success"
          icon={<TrendingUp className="h-4 w-4" />}
          href="/analytics"
        />
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="lg:col-span-2 space-y-4 md:space-y-6">
          <AnalyticsChart />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <MetricCard
              title="Total Patients"
              value={metrics?.totalPatients || 0}
              status="normal"
              icon={<Users className="h-4 w-4" />}
              href="/patients"
            />
            <MetricCard
              title="Emergency Cases" 
              value={(metrics?.waitingInED || 0) + (metrics?.inTreatment || 0)}
              status="normal"
              icon={<Activity className="h-4 w-4" />}
              href="/emergency"
            />
          </div>
        </div>

        <div className="space-y-4 md:space-y-6">
          <PatientList />
          <MovIntegrationStatus />
          <MessagingPanel />
        </div>
      </div>
    </div>
  );
};

export default Index;
