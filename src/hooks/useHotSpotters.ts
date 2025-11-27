import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useHotSpotterMetrics = () => {
  return useQuery({
    queryKey: ["hot-spotter-metrics"],
    queryFn: async () => {
      const [patientsRes, visitsRes, evaluationsRes] = await Promise.all([
        supabase.from("patients").select("id").gte("risk_score", 80),
        supabase.from("patient_visits").select("patient_id, cost"),
        supabase.from("drug_evaluations").select("patient_id, status")
      ]);

      if (patientsRes.error) throw patientsRes.error;
      if (visitsRes.error) throw visitsRes.error;
      if (evaluationsRes.error) throw evaluationsRes.error;

      const highUtilizerIds = new Set(patientsRes.data?.map(p => p.id) || []);
      
      // Calculate cost impact: sum of visit costs for high utilizers
      // If no cost data, estimate $1500 per visit (industry average)
      const visits = visitsRes.data || [];
      const highUtilizerVisits = visits.filter(v => highUtilizerIds.has(v.patient_id));
      const totalCost = highUtilizerVisits.reduce((sum, visit) => {
        return sum + (Number(visit.cost) || 1500);
      }, 0);
      
      // Count active interventions (drug evaluations) for high utilizers
      const evaluations = evaluationsRes.data || [];
      const activeInterventions = evaluations.filter(
        e => highUtilizerIds.has(e.patient_id) && 
        (e.status === 'pending' || e.status === 'flagged')
      ).length;

      return {
        costImpact: totalCost,
        activeInterventions,
      };
    },
  });
};
