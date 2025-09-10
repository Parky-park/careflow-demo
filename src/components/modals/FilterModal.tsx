import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";

interface FilterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: "patients" | "inventory" | "schedule";
}

export function FilterModal({ open, onOpenChange, type }: FilterModalProps) {
  const { toast } = useToast();
  const [filters, setFilters] = useState({
    status: "all",
    riskLevel: "all",
    provider: "all",
    location: "all",
    dateRange: "all",
    ageRange: [0, 100],
    category: "all",
    availability: "all",
    priority: "all",
    showOnlyActive: true,
    showUnattached: false
  });

  const getFilterOptions = () => {
    switch (type) {
      case "patients":
        return {
          title: "Filter Patients",
          options: [
            { key: "status", label: "Status", values: ["active", "inactive", "unattached"] },
            { key: "riskLevel", label: "Risk Level", values: ["low", "medium", "high"] },
            { key: "provider", label: "Provider", values: ["Dr. Wilson", "Dr. Chen", "Dr. Patel", "Unassigned"] }
          ]
        };
      case "inventory":
        return {
          title: "Filter Inventory",
          options: [
            { key: "category", label: "Category", values: ["Critical Equipment", "Medications", "PPE", "Monitoring Equipment"] },
            { key: "status", label: "Stock Status", values: ["adequate", "low", "critical", "overstocked"] },
            { key: "location", label: "Location", values: ["ICU Storage", "Pharmacy", "Equipment Room A"] }
          ]
        };
      case "schedule":
        return {
          title: "Filter Schedule",
          options: [
            { key: "status", label: "Status", values: ["confirmed", "pending", "cancelled", "in-progress"] },
            { key: "priority", label: "Priority", values: ["high", "medium", "low"] },
            { key: "provider", label: "Provider", values: ["Dr. Wilson", "Dr. Chen", "Dr. Patel", "All Staff"] }
          ]
        };
      default:
        return { title: "Filter", options: [] };
    }
  };

  const filterConfig = getFilterOptions();

  const handleApplyFilters = () => {
    toast({
      title: "Filters Applied",
      description: `${filterConfig.title.toLowerCase()} have been updated based on your selections.`,
    });
    onOpenChange(false);
  };

  const handleClearFilters = () => {
    setFilters({
      status: "all",
      riskLevel: "all",
      provider: "all",
      location: "all",
      dateRange: "all",
      ageRange: [0, 100],
      category: "all",
      availability: "all",
      priority: "all",
      showOnlyActive: true,
      showUnattached: false
    });
    toast({
      title: "Filters Cleared",
      description: "All filters have been reset to default values.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{filterConfig.title}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {filterConfig.options.map((option) => (
            <div key={option.key} className="space-y-2">
              <Label>{option.label}</Label>
              <Select 
                value={filters[option.key as keyof typeof filters] as string} 
                onValueChange={(value) => setFilters(prev => ({ ...prev, [option.key]: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder={`Select ${option.label.toLowerCase()}`} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All {option.label}</SelectItem>
                  {option.values.map((value) => (
                    <SelectItem key={value} value={value}>
                      {value.charAt(0).toUpperCase() + value.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}

          {type === "patients" && (
            <>
              <div className="space-y-3">
                <Label>Age Range: {filters.ageRange[0]} - {filters.ageRange[1]} years</Label>
                <Slider
                  value={filters.ageRange}
                  onValueChange={(value) => setFilters(prev => ({ ...prev, ageRange: value }))}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="showActive">Show only active patients</Label>
                  <Switch
                    id="showActive"
                    checked={filters.showOnlyActive}
                    onCheckedChange={(checked) => setFilters(prev => ({ ...prev, showOnlyActive: checked }))}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="showUnattached">Include unattached patients</Label>
                  <Switch
                    id="showUnattached"
                    checked={filters.showUnattached}
                    onCheckedChange={(checked) => setFilters(prev => ({ ...prev, showUnattached: checked }))}
                  />
                </div>
              </div>
            </>
          )}

          <div className="space-y-2">
            <Label>Date Range</Label>
            <Select 
              value={filters.dateRange} 
              onValueChange={(value) => setFilters(prev => ({ ...prev, dateRange: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select date range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={handleClearFilters}>
              Clear All
            </Button>
            <Button onClick={handleApplyFilters}>
              Apply Filters
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}