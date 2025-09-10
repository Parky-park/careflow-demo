import { MetricCard } from "@/components/dashboard/MetricCard";
import { PatientList } from "@/components/dashboard/PatientList";
import { AnalyticsChart } from "@/components/dashboard/AnalyticsChart";
import { MessagingPanel } from "@/components/dashboard/MessagingPanel";
import { MovIntegrationStatus } from "@/components/dashboard/MovIntegrationStatus";
import { Users, UserCheck, AlertTriangle, TrendingUp, Activity, Package, Brain, Stethoscope, Pill, Clock } from "lucide-react";
import heroImage from "@/assets/dashboard-hero.jpg";

const Index = () => {
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="relative rounded-xl overflow-hidden">
        <div 
          className="h-32 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-accent/90" />
          <div className="relative p-6 text-white">
            <h2 className="text-2xl font-bold mb-2">Welcome to CareFlow Dashboard</h2>
            <p className="text-white/90">Integrated healthcare management with AI-driven insights</p>
          </div>
        </div>
      </div>

      {/* Executive Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Patient Management Overview */}
        <div className="bg-card rounded-lg border p-6 space-y-4">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Users className="h-4 w-4" />
            Patient Management
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Unattached Patients</span>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-orange-600">247</span>
                <span className="text-xs text-green-600">↓8</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">High Utilizers</span>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-red-600">23</span>
                <span className="text-xs text-red-600">↑12</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Active Patients</span>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-green-600">1,247</span>
                <span className="text-xs text-green-600">↑5%</span>
              </div>
            </div>
          </div>
        </div>

        {/* AI & Operations Overview */}
        <div className="bg-card rounded-lg border p-6 space-y-4">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Brain className="h-4 w-4" />
            AI & Operations
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">AI Risk Predictions</span>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-orange-600">15</span>
                <span className="text-xs text-orange-600">↑3</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Hot-Spotter Cases</span>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-green-600">8</span>
                <span className="text-xs text-green-600">↓2</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">ED Wait Time</span>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-green-600">24m</span>
                <span className="text-xs text-green-600">↓5m</span>
              </div>
            </div>
          </div>
        </div>

        {/* System Performance Overview */}
        <div className="bg-card rounded-lg border p-6 space-y-4">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Activity className="h-4 w-4" />
            System Performance
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Pharmacy Processing</span>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-green-600">98%</span>
                <span className="text-xs text-green-600">↑1%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Inventory Status</span>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-green-600">94%</span>
                <span className="text-xs text-green-600">↑2%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Avg. Cost/Visit</span>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-green-600">$342</span>
                <span className="text-xs text-green-600">↓$3</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <AnalyticsChart />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <MetricCard
              title="ICU Capacity"
              value="78%"
              change={{ value: 5, type: 'increase' }}
              status="warning"
              icon={<Activity className="h-4 w-4" />}
            />
            <MetricCard
              title="Messages & Alerts"
              value="12"
              change={{ value: 3, type: 'increase' }}
              status="warning"
              icon={<AlertTriangle className="h-4 w-4" />}
            />
          </div>
        </div>

        <div className="space-y-6">
          <PatientList />
          <MovIntegrationStatus />
          <MessagingPanel />
        </div>
      </div>
    </div>
  );
};

export default Index;
