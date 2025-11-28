import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Index";
import Patients from "./pages/Patients";
import Analytics from "./pages/Analytics";
import AIInsights from "./pages/AIInsights";
import CareTeams from "./pages/CareTeams";
import Inventory from "./pages/Inventory";
import Schedule from "./pages/Schedule";
import Settings from "./pages/Settings";
import Messages from "./pages/Messages";
import Chat from "./pages/Chat";
import NewConversation from "./pages/NewConversation";
import Notifications from "./pages/Notifications";
import RealtimeFeed from "./pages/RealtimeFeed";
import EmergencyDepartment from "./pages/EmergencyDepartment";
import HotSpotters from "./pages/HotSpotters";
import MedicalHomes from "./pages/MedicalHomes";
import PharmacyAI from "./pages/PharmacyAI";
import DrugUtilization from "./pages/DrugUtilization";
import FHIRIntegration from "./pages/FHIRIntegration";
import PatientChart from "./pages/PatientChart";
import InsightDetail from "./pages/InsightDetail";
import TeamDetail from "./pages/TeamDetail";
import DrugUtilizationRules from "./pages/DrugUtilizationRules";
import DrugUtilizationEvaluations from "./pages/DrugUtilizationEvaluations";
import NotificationSettings from "./pages/NotificationSettings";
import AddMedicalHome from "./pages/AddMedicalHome";
import MatchPatients from "./pages/MatchPatients";
import AddPatient from "./pages/AddPatient";
import FHIRMessages from "./pages/FHIRMessages";
import PharmacyProcessing from "./pages/PharmacyProcessing";
import DrugUtilizationRuleDetail from "./pages/DrugUtilizationRuleDetail";
import DrugUtilizationRuleEdit from "./pages/DrugUtilizationRuleEdit";
import DrugUtilizationRuleNew from "./pages/DrugUtilizationRuleNew";
import DrugUtilizationEvaluationDetail from "./pages/DrugUtilizationEvaluationDetail";
import FHIRMessageDetail from "./pages/FHIRMessageDetail";
import PharmacyPrescriptionDetail from "./pages/PharmacyPrescriptionDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected Routes with Dashboard Layout */}
            <Route path="/*" element={
              <ProtectedRoute>
                <SidebarProvider>
                  <div className="min-h-screen flex w-full bg-background">
                    <AppSidebar />
                    <SidebarInset className="flex-1">
                      <DashboardHeader />
                      <main className="flex-1 overflow-auto">
                        <div className="p-4 md:p-6">
                          <Routes>
                            <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/patients/:id/chart" element={<PatientChart />} />
                        <Route path="/patients" element={<Patients />} />
                        <Route path="/analytics" element={<Analytics />} />
                        <Route path="/insights" element={<AIInsights />} />
                        <Route path="/teams" element={<CareTeams />} />
                        <Route path="/inventory" element={<Inventory />} />
                        <Route path="/schedule" element={<Schedule />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/messages" element={<Messages />} />
                        <Route path="/chat/new" element={<NewConversation />} />
                        <Route path="/chat/:id" element={<Chat />} />
                        <Route path="/notifications" element={<Notifications />} />
                        <Route path="/realtime-feed" element={<RealtimeFeed />} />
                        <Route path="/emergency" element={<EmergencyDepartment />} />
                        <Route path="/hot-spotters" element={<HotSpotters />} />
                        <Route path="/medical-homes" element={<MedicalHomes />} />
                        <Route path="/pharmacy-ai" element={<PharmacyAI />} />
                        <Route path="/drug-utilization" element={<DrugUtilization />} />
                        <Route path="/fhir" element={<FHIRIntegration />} />
                        <Route path="/insights/:id" element={<InsightDetail />} />
                        <Route path="/teams/:id" element={<TeamDetail />} />
                        <Route path="/drug-utilization/rules" element={<DrugUtilizationRules />} />
                        <Route path="/drug-utilization/evaluations" element={<DrugUtilizationEvaluations />} />
                        <Route path="/notifications/settings" element={<NotificationSettings />} />
                        <Route path="/medical-homes/add" element={<AddMedicalHome />} />
                        <Route path="/medical-homes/match-patients" element={<MatchPatients />} />
                        <Route path="/patients/add" element={<AddPatient />} />
                        <Route path="/fhir/messages" element={<FHIRMessages />} />
                        <Route path="/fhir/messages/:id" element={<FHIRMessageDetail />} />
                        <Route path="/pharmacy-ai/processing" element={<PharmacyProcessing />} />
                        <Route path="/pharmacy-ai/prescription/:id" element={<PharmacyPrescriptionDetail />} />
                        <Route path="/drug-utilization/rules/:id" element={<DrugUtilizationRuleDetail />} />
                        <Route path="/drug-utilization/rules/:id/edit" element={<DrugUtilizationRuleEdit />} />
                        <Route path="/drug-utilization/rules/new" element={<DrugUtilizationRuleNew />} />
                        <Route path="/drug-utilization/evaluation/:id" element={<DrugUtilizationEvaluationDetail />} />
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
              </ProtectedRoute>
            } />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
