import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useInsights = (status?: string) => {
  return useQuery({
    queryKey: ['ai-insights', status],
    queryFn: async () => {
      let query = supabase
        .from('ai_insights')
        .select('*, patients(first_name, last_name)')
        .order('created_at', { ascending: false });

      if (status) {
        query = query.eq('status', status);
      }

      const { data, error } = await query;
      
      if (error) throw error;
      return data || [];
    },
    refetchInterval: 30000, // Refetch every 30 seconds
  });
};

export const useInsight = (id: string) => {
  return useQuery({
    queryKey: ['ai-insight', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ai_insights')
        .select('*, patients(first_name, last_name, date_of_birth, medical_record_number)')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data;
    },
  });
};

export const useInsightMetrics = () => {
  return useQuery({
    queryKey: ['insight-metrics'],
    queryFn: async () => {
      const { data: insights, error } = await supabase
        .from('ai_insights')
        .select('confidence_score, created_at, status');
      
      if (error) throw error;

      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

      const thisWeek = insights.filter(i => new Date(i.created_at!) >= weekAgo).length;
      const activeInsights = insights.filter(i => i.status === 'active').length;
      
      const avgAccuracy = insights.length > 0
        ? (insights.reduce((sum, i) => sum + (i.confidence_score || 0), 0) / insights.length) * 100
        : 0;

      return {
        insightsThisWeek: thisWeek,
        predictionAccuracy: Math.round(avgAccuracy * 10) / 10,
        activePredictions: activeInsights,
        totalInsights: insights.length,
      };
    },
    refetchInterval: 30000,
  });
};
