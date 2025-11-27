import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useDashboardMetrics = () => {
  return useQuery({
    queryKey: ['dashboard-metrics'],
    queryFn: async () => {
      // Fetch all metrics in parallel
      const [
        patientsResult,
        emergencyCasesResult,
        aiInsightsResult,
        visitCostResult
      ] = await Promise.all([
        supabase.from('patients').select('id, status, risk_score'),
        supabase.from('emergency_cases').select('id, status, wait_time_minutes, arrival_time'),
        supabase.from('ai_insights').select('id, severity, status'),
        supabase.from('patient_visits').select('cost')
          .gte('visit_date', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())
      ]);

      if (patientsResult.error) throw patientsResult.error;
      if (emergencyCasesResult.error) throw emergencyCasesResult.error;
      if (aiInsightsResult.error) throw aiInsightsResult.error;
      if (visitCostResult.error) throw visitCostResult.error;

      const patients = patientsResult.data || [];
      const emergencyCases = emergencyCasesResult.data || [];
      const insights = aiInsightsResult.data || [];
      const visits = visitCostResult.data || [];

      // Calculate metrics
      const activePatients = patients.filter(p => p.status === 'active').length;
      const highRiskPatients = patients.filter(p => p.risk_score >= 70).length;
      const criticalPatients = patients.filter(p => p.status === 'critical').length;
      const activeInsights = insights.filter(i => i.status === 'active').length;
      
      // Calculate average ED wait time
      const recentCases = emergencyCases.filter(c => 
        new Date(c.arrival_time).getTime() > Date.now() - 24 * 60 * 60 * 1000
      );
      const avgWaitTime = recentCases.length > 0
        ? Math.round(recentCases.reduce((sum, c) => sum + (c.wait_time_minutes || 0), 0) / recentCases.length)
        : 0;
      
      // Calculate average cost per visit
      const avgCost = visits.length > 0
        ? Math.round(visits.reduce((sum, v) => sum + Number(v.cost || 0), 0) / visits.length)
        : 0;

      // Calculate ED status
      const waitingInED = emergencyCases.filter(c => c.status === 'waiting').length;
      const inTreatment = emergencyCases.filter(c => c.status === 'in_treatment').length;

      return {
        activePatients,
        highRiskPatients,
        criticalPatients,
        activeInsights,
        avgWaitTime,
        avgCost,
        waitingInED,
        inTreatment,
        totalPatients: patients.length,
      };
    },
    refetchInterval: 30000, // Refetch every 30 seconds
  });
};
