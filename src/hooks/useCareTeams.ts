import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useCareTeams = () => {
  return useQuery({
    queryKey: ["care-teams"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("care_teams")
        .select(`
          *,
          lead:lead_id(full_name),
          team_members(
            staff:staff_id(*)
          )
        `)
        .order("name");
      
      if (error) throw error;
      return data || [];
    },
  });
};

export const useStaffMembers = () => {
  return useQuery({
    queryKey: ["staff-members"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("staff")
        .select("*")
        .order("full_name");
      
      if (error) throw error;
      return data || [];
    },
  });
};