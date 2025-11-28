import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useInventoryItems = () => {
  return useQuery({
    queryKey: ["inventory-items"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("inventory_items")
        .select("*")
        .order("name");
      
      if (error) throw error;
      return data || [];
    },
  });
};

export const useInventoryMetrics = () => {
  return useQuery({
    queryKey: ["inventory-metrics"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("inventory_items")
        .select("*");
      
      if (error) throw error;
      
      const items = data || [];
      const totalItems = items.length;
      const lowStockItems = items.filter(item => item.quantity <= item.reorder_level).length;
      const totalValue = items.reduce((sum, item) => sum + (item.quantity * Number(item.unit_price)), 0);
      
      return {
        totalItems,
        lowStockItems,
        totalValue,
      };
    },
  });
};
