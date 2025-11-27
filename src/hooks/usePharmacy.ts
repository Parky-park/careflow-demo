import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const usePrescriptions = () => {
  return useQuery({
    queryKey: ["prescriptions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("prescriptions")
        .select(`
          *,
          patient:patient_id(first_name, last_name),
          prescriber:prescriber_id(full_name)
        `)
        .order("created_at", { ascending: false })
        .limit(10);
      
      if (error) throw error;
      return data || [];
    },
  });
};

export const usePharmacyMetrics = () => {
  return useQuery({
    queryKey: ["pharmacy-metrics"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("prescriptions")
        .select("*");
      
      if (error) throw error;
      
      const total = data?.length || 0;
      const processed = data?.filter(p => p.ocr_processed).length || 0;
      const validated = data?.filter(p => p.status === 'validated').length || 0;
      const needsReview = data?.filter(p => p.status === 'needs_review').length || 0;
      const avgConfidence = data?.reduce((sum, p) => sum + (p.confidence_score || 0), 0) / (total || 1);
      
      return {
        total,
        processed,
        validated,
        needsReview,
        avgConfidence: avgConfidence.toFixed(1),
        ocrAccuracy: total > 0 ? ((validated / total) * 100).toFixed(1) : '0',
        autoValidated: total > 0 ? ((validated / total) * 100).toFixed(0) : '0'
      };
    },
  });
};