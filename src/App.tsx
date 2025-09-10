import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider } from "@/components/ui/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppSidebar } from "@/components/AppSidebar";
import Index from "./pages/Index";
import Patients from "./pages/Patients";
import Analytics from "./pages/Analytics";
import AIInsights from "./pages/AIInsights";
import CareTeams from "./pages/CareTeams";
import Inventory from "./pages/Inventory";
import Schedule from "./pages/Schedule";
import Settings from "./pages/Settings";
import Notifications from "./pages/Notifications";
import EmergencyDepartment from "./pages/EmergencyDepartment";
import HotSpotters from "./pages/HotSpotters";
import MedicalHomes from "./pages/MedicalHomes";
import PharmacyAI from "./pages/PharmacyAI";
import DrugUtilization from "./pages/DrugUtilization";
import FHIRIntegration from "./pages/FHIRIntegration";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <SidebarProvider>
          <div className="min-h-screen flex w-full">
            <AppSidebar />
            <main className="flex-1 p-6 overflow-auto">
              <Toaster />
              <Sonner />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/patients" element={<Patients />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/insights" element={<AIInsights />} />
                <Route path="/teams" element={<CareTeams />} />
                <Route path="/inventory" element={<Inventory />} />
                <Route path="/schedule" element={<Schedule />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/emergency" element={<EmergencyDepartment />} />
                <Route path="/hot-spotters" element={<HotSpotters />} />
                <Route path="/medical-homes" element={<MedicalHomes />} />
                <Route path="/pharmacy-ai" element={<PharmacyAI />} />
                <Route path="/drug-utilization" element={<DrugUtilization />} />
                <Route path="/fhir" element={<FHIRIntegration />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
