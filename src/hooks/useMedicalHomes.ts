import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useMedicalHomesMetrics = () => {
  return useQuery({
    queryKey: ["medical-homes-metrics"],
    queryFn: async () => {
      const [facilitiesRes, attachmentsRes] = await Promise.all([
        supabase.from("facilities").select("*").eq("facility_type", "medical_home"),
        supabase.from("patient_facility_attachments").select("*")
      ]);

      if (facilitiesRes.error) throw facilitiesRes.error;
      if (attachmentsRes.error) throw attachmentsRes.error;

      const activeHomes = facilitiesRes.data?.length || 0;
      const totalAttachments = attachmentsRes.data?.length || 0;
      
      // Calculate average attachment time from completed attachments
      const completedAttachments = attachmentsRes.data?.filter(a => a.attachment_days !== null) || [];
      const avgAttachmentDays = completedAttachments.length > 0
        ? Math.round(completedAttachments.reduce((sum, a) => sum + (a.attachment_days || 0), 0) / completedAttachments.length)
        : null;

      return {
        activeHomes,
        totalAttachments,
        avgAttachmentDays,
      };
    },
  });
};
