import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useBadgeCounts = () => {
  return useQuery({
    queryKey: ["badge-counts"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const [
        patientsRes,
        insightsRes,
        hotSpottersRes,
        pharmacyRes,
        messagesRes,
        notificationsRes,
        adtRes
      ] = await Promise.all([
        // Active patients
        supabase.from("patients").select("id", { count: "exact", head: true }).eq("status", "active"),
        // Active AI insights
        supabase.from("ai_insights").select("id", { count: "exact", head: true }).eq("status", "active"),
        // High risk patients (risk score >= 80)
        supabase.from("patients").select("id", { count: "exact", head: true }).gte("risk_score", 80),
        // Prescriptions needing review
        supabase.from("prescriptions").select("id", { count: "exact", head: true }).eq("status", "needs_review"),
        // Unread messages for conversations
        supabase.from("conversations").select("unread_count"),
        // Unread notifications
        supabase.from("notifications").select("id", { count: "exact", head: true }).eq("user_id", user.id).eq("read", false),
        // Recent ADT events (last 24 hours)
        supabase.from("adt_events").select("id", { count: "exact", head: true }).gte("created_at", new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
      ]);

      // Calculate total unread messages
      const totalUnreadMessages = messagesRes.data?.reduce((sum, conv) => sum + (conv.unread_count || 0), 0) || 0;

      return {
        patients: patientsRes.count || 0,
        insights: insightsRes.count || 0,
        hotSpotters: hotSpottersRes.count || 0,
        pharmacy: pharmacyRes.count || 0,
        messages: totalUnreadMessages,
        notifications: notificationsRes.count || 0,
        realtimeFeed: adtRes.count || 0,
      };
    },
    refetchInterval: 30000, // Refetch every 30 seconds
  });
};
