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

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Unattached Patients"
          value={247}
          change={{ value: 8, type: 'decrease' }}
          status="warning"
          icon={<Users className="h-4 w-4" />}
        />
        <MetricCard
          title="High Utilizers"
          value={23}
          change={{ value: 12, type: 'increase' }}
          status="critical"
          icon={<AlertTriangle className="h-4 w-4" />}
        />
        <MetricCard
          title="Active Patients"
          value="1,247"
          change={{ value: 5, type: 'increase' }}
          status="success"
          icon={<UserCheck className="h-4 w-4" />}
        />
        <MetricCard
          title="AI Risk Predictions"
          value={15}
          change={{ value: 3, type: 'increase' }}
          status="warning"
          icon={<Brain className="h-4 w-4" />}
        />
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Hot-Spotter Cases"
          value={8}
          change={{ value: 2, type: 'decrease' }}
          status="success"
          icon={<Stethoscope className="h-4 w-4" />}
        />
        <MetricCard
          title="ED Wait Time"
          value="24 min"
          change={{ value: 5, type: 'decrease' }}
          status="success"
          icon={<Clock className="h-4 w-4" />}
        />
        <MetricCard
          title="Pharmacy Processing"
          value="98%"
          change={{ value: 1, type: 'increase' }}
          status="success"
          icon={<Pill className="h-4 w-4" />}
        />
        <MetricCard
          title="Avg. Cost per Visit"
          value="$342"
          change={{ value: 3, type: 'decrease' }}
          status="success"
          icon={<TrendingUp className="h-4 w-4" />}
        />
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
              title="Inventory Status" 
              value="94%"
              change={{ value: 2, type: 'increase' }}
              status="success"
              icon={<Package className="h-4 w-4" />}
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
