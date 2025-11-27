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
      
      // Calculate average attachment time dynamically
      const attachments = attachmentsRes.data || [];
      let totalDays = 0;
      let count = 0;
      
      attachments.forEach(attachment => {
        const startDate = new Date(attachment.attached_at);
        const endDate = attachment.detached_at 
          ? new Date(attachment.detached_at) 
          : new Date();
        
        const days = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
        totalDays += days;
        count++;
      });
      
      const avgAttachmentDays = count > 0 ? Math.round(totalDays / count) : null;

      return {
        activeHomes,
        totalAttachments,
        avgAttachmentDays,
      };
    },
  });
};
