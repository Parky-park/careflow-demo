import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useDrugRules = () => {
  return useQuery({
    queryKey: ["drug-rules"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("drug_utilization_rules")
        .select("*")
        .eq("active", true)
        .order("priority");
      
      if (error) throw error;
      return data || [];
    },
  });
};

export const useDrugEvaluations = () => {
  return useQuery({
    queryKey: ["drug-evaluations"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("drug_evaluations")
        .select(`
          *,
          patient:patient_id(first_name, last_name),
          prescription:prescription_id(medication_name),
          rule:rule_id(name, priority)
        `)
        .order("created_at", { ascending: false })
        .limit(10);
      
      if (error) throw error;
      return data || [];
    },
  });
};

export const useDrugMetrics = () => {
  return useQuery({
    queryKey: ["drug-metrics"],
    queryFn: async () => {
      const [rulesRes, evalsRes] = await Promise.all([
        supabase.from("drug_utilization_rules").select("*").eq("active", true),
        supabase.from("drug_evaluations").select("*")
      ]);
      
      if (rulesRes.error) throw rulesRes.error;
      if (evalsRes.error) throw evalsRes.error;
      
      const activeRules = rulesRes.data?.length || 0;
      const totalEvals = evalsRes.data?.length || 0;
      const flagged = evalsRes.data?.filter(e => e.status === 'flagged').length || 0;
      
      return {
        activeRules,
        totalEvals,
        flagged
      };
    },
  });
};