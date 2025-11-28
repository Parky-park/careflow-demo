import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useADTEvents = () => {
  return useQuery({
    queryKey: ["adt-events"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("adt_events")
        .select("*, patient:patient_id(first_name, last_name, medical_record_number)")
        .order("created_at", { ascending: false })
        .limit(20);
      
      if (error) throw error;
      return data || [];
    },
  });
};

export const useADTMetrics = () => {
  return useQuery({
    queryKey: ["adt-metrics"],
    queryFn: async () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const { data, error } = await supabase
        .from("adt_events")
        .select("*")
        .gte("created_at", today.toISOString());
      
      if (error) throw error;
      
      const events = data || [];
      const admissions = events.filter(e => e.event_type === 'admission').length;
      const discharges = events.filter(e => e.event_type === 'discharge').length;
      const transfers = events.filter(e => e.event_type === 'transfer').length;
      const activeCases = admissions - discharges;
      
      return {
        admissions,
        discharges,
        transfers,
        currentCensus: Math.max(0, activeCases + 200), // Base census + today's net change
      };
    },
  });
};
