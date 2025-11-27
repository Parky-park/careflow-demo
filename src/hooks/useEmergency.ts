import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useEmergencyCases = () => {
  return useQuery({
    queryKey: ['emergency-cases'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('emergency_cases')
        .select('*, patients(first_name, last_name, medical_record_number)')
        .order('arrival_time', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
    refetchInterval: 10000, // Refetch every 10 seconds for real-time updates
  });
};

export const useEmergencyMetrics = () => {
  return useQuery({
    queryKey: ['emergency-metrics'],
    queryFn: async () => {
      const { data: cases, error } = await supabase
        .from('emergency_cases')
        .select('*');
      
      if (error) throw error;

      const now = new Date();
      const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

      // Filter recent cases (last 24 hours)
      const recentCases = cases.filter(c => 
        new Date(c.arrival_time).getTime() >= oneDayAgo.getTime()
      );

      // Calculate metrics
      const activeCases = cases.filter(c => 
        c.status !== 'discharged' && c.discharge_time === null
      ).length;

      const criticalCases = cases.filter(c => 
        c.triage_level <= 2 && c.status !== 'discharged'
      ).length;

      const totalBeds = 50; // This should come from facilities table
      const occupancy = activeCases > 0 ? Math.round((activeCases / totalBeds) * 100) : 0;

      // Calculate average wait time for recent cases
      const casesWithWaitTime = recentCases.filter(c => c.wait_time_minutes !== null);
      const avgWaitTime = casesWithWaitTime.length > 0
        ? Math.round(casesWithWaitTime.reduce((sum, c) => sum + (c.wait_time_minutes || 0), 0) / casesWithWaitTime.length)
        : 0;

      // Calculate discharge rate (discharges in last hour)
      const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
      const recentDischarges = cases.filter(c => 
        c.discharge_time && new Date(c.discharge_time).getTime() >= oneHourAgo.getTime()
      ).length;

      return {
        occupancy,
        occupancyPercent: `${occupancy}%`,
        avgWaitTime,
        avgWaitTimeDisplay: `${avgWaitTime} min`,
        criticalCases,
        dischargeRate: recentDischarges,
        dischargeRateDisplay: `${recentDischarges}/hr`,
        activeCases,
        totalCases: cases.length,
      };
    },
    refetchInterval: 10000, // Refetch every 10 seconds
  });
};
