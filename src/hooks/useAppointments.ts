import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useAppointments = () => {
  return useQuery({
    queryKey: ["appointments"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("appointments")
        .select("*, patient:patient_id(first_name, last_name)")
        .order("appointment_date");
      
      if (error) throw error;
      return data || [];
    },
  });
};

export const useTodayAppointments = () => {
  return useQuery({
    queryKey: ["today-appointments"],
    queryFn: async () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      const { data, error } = await supabase
        .from("appointments")
        .select("*, patient:patient_id(first_name, last_name)")
        .gte("appointment_date", today.toISOString())
        .lt("appointment_date", tomorrow.toISOString())
        .order("appointment_date");
      
      if (error) throw error;
      return data || [];
    },
  });
};

export const useAppointmentMetrics = () => {
  return useQuery({
    queryKey: ["appointment-metrics"],
    queryFn: async () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      const [appointmentsRes, staffRes] = await Promise.all([
        supabase
          .from("appointments")
          .select("*")
          .gte("appointment_date", today.toISOString())
          .lt("appointment_date", tomorrow.toISOString()),
        supabase
          .from("staff")
          .select("id")
          .eq("status", "active")
      ]);
      
      if (appointmentsRes.error) throw appointmentsRes.error;
      if (staffRes.error) throw staffRes.error;
      
      const appointments = appointmentsRes.data || [];
      const activeStaff = staffRes.data?.length || 0;
      
      const todayTotal = appointments.length;
      const cancelled = appointments.filter(a => a.status === 'cancelled').length;
      const noShows = appointments.filter(a => a.status === 'no_show').length;
      const completed = appointments.filter(a => a.status === 'completed').length;
      
      // Calculate available slots: assume 8 hours per provider, 30-min slots = 16 slots per provider
      const totalDailySlots = activeStaff * 16;
      const availableSlots = Math.max(0, totalDailySlots - todayTotal);
      
      return {
        todayTotal,
        availableSlots,
        cancelled,
        noShows,
        completed,
      };
    },
  });
};
