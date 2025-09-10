import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { AppSidebar } from "@/components/layout/AppSidebar";
import Index from "./pages/Index";
import Patients from "./pages/Patients";
import Analytics from "./pages/Analytics";
import AIInsights from "./pages/AIInsights";
import CareTeams from "./pages/CareTeams";
import Inventory from "./pages/Inventory";
import Schedule from "./pages/Schedule";
import Settings from "./pages/Settings";
import Messages from "./pages/Messages";
import Notifications from "./pages/Notifications";
import RealtimeFeed from "./pages/RealtimeFeed";
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
          <div className="min-h-screen flex w-full bg-background">
            <AppSidebar />
            <SidebarInset className="flex-1">
              <DashboardHeader />
              <main className="flex-1 overflow-auto">
                <div className="p-4 md:p-6">
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/patients" element={<Patients />} />
                    <Route path="/analytics" element={<Analytics />} />
                    <Route path="/insights" element={<AIInsights />} />
                    <Route path="/teams" element={<CareTeams />} />
                    <Route path="/inventory" element={<Inventory />} />
                    <Route path="/schedule" element={<Schedule />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/messages" element={<Messages />} />
                    <Route path="/notifications" element={<Notifications />} />
                    <Route path="/realtime-feed" element={<RealtimeFeed />} />
                    <Route path="/emergency" element={<EmergencyDepartment />} />
                    <Route path="/hot-spotters" element={<HotSpotters />} />
                    <Route path="/medical-homes" element={<MedicalHomes />} />
                    <Route path="/pharmacy-ai" element={<PharmacyAI />} />
                    <Route path="/drug-utilization" element={<DrugUtilization />} />
                    <Route path="/fhir" element={<FHIRIntegration />} />
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </div>
              </main>
            </SidebarInset>
          </div>
          <Toaster />
          <Sonner />
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
