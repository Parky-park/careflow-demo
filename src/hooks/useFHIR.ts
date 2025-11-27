import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useFHIRConnections = () => {
  return useQuery({
    queryKey: ["fhir-connections"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("fhir_connections")
        .select("*")
        .order("name");
      
      if (error) throw error;
      return data || [];
    },
  });
};

export const useFHIRMessages = () => {
  return useQuery({
    queryKey: ["fhir-messages"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("fhir_messages")
        .select(`
          *,
          connection:connection_id(name)
        `)
        .order("created_at", { ascending: false })
        .limit(10);
      
      if (error) throw error;
      return data || [];
    },
  });
};

export const useFHIRMetrics = () => {
  return useQuery({
    queryKey: ["fhir-metrics"],
    queryFn: async () => {
      const [connectionsRes, messagesRes] = await Promise.all([
        supabase.from("fhir_connections").select("*"),
        supabase.from("fhir_messages").select("*")
      ]);
      
      if (connectionsRes.error) throw connectionsRes.error;
      if (messagesRes.error) throw messagesRes.error;
      
      const activeConnections = connectionsRes.data?.filter(c => c.status === 'active').length || 0;
      const totalMessages = messagesRes.data?.length || 0;
      const successfulMessages = messagesRes.data?.filter(m => m.status === 'success').length || 0;
      const failedMessages = messagesRes.data?.filter(m => m.status === 'failed').length || 0;
      const successRate = totalMessages > 0 ? ((successfulMessages / totalMessages) * 100).toFixed(1) : '0';
      
      return {
        activeConnections,
        totalMessages,
        successRate,
        failedMessages
      };
    },
  });
};