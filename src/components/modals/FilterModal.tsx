import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

interface FilterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: "patients" | "messages" | "analytics" | "inventory" | "schedule";
}

export function FilterModal({ open, onOpenChange, type }: FilterModalProps) {
  const { toast } = useToast();
  const [filters, setFilters] = useState({
    riskLevel: "",
    status: "",
    provider: "",
    conditions: [] as string[],
    dateRange: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Filters Applied",
      description: `${type} have been filtered based on your criteria.`,
    });
    
    onOpenChange(false);
  };

  const handleConditionChange = (condition: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      conditions: checked 
        ? [...prev.conditions, condition]
        : prev.conditions.filter(c => c !== condition)
    }));
  };

  const resetFilters = () => {
    setFilters({
      riskLevel: "",
      status: "",
      provider: "",
      conditions: [],
      dateRange: "",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Filter {type === "patients" ? "Patients" : type}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {type === "patients" && (
            <>
              <div className="space-y-2">
                <Label>Risk Level</Label>
                <Select value={filters.riskLevel} onValueChange={(value) => setFilters(prev => ({ ...prev, riskLevel: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select risk level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Risk Levels</SelectItem>
                    <SelectItem value="high">High Risk</SelectItem>
                    <SelectItem value="medium">Medium Risk</SelectItem>
                    <SelectItem value="low">Low Risk</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={filters.status} onValueChange={(value) => setFilters(prev => ({ ...prev, status: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Provider</Label>
                <Select value={filters.provider} onValueChange={(value) => setFilters(prev => ({ ...prev, provider: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select provider" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Providers</SelectItem>
                    <SelectItem value="dr-wilson">Dr. Wilson</SelectItem>
                    <SelectItem value="dr-patel">Dr. Patel</SelectItem>
                    <SelectItem value="dr-chen">Dr. Chen</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Medical Conditions</Label>
                <div className="space-y-2">
                  {["Diabetes", "Hypertension", "COPD", "Heart Disease", "Asthma"].map((condition) => (
                    <div key={condition} className="flex items-center space-x-2">
                      <Checkbox
                        id={condition}
                        checked={filters.conditions.includes(condition)}
                        onCheckedChange={(checked) => handleConditionChange(condition, checked as boolean)}
                      />
                      <Label htmlFor={condition} className="text-sm">{condition}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          <div className="space-y-2">
            <Label>Date Range</Label>
            <Select value={filters.dateRange} onValueChange={(value) => setFilters(prev => ({ ...prev, dateRange: value }))}>
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
            <Button type="button" variant="outline" onClick={resetFilters}>
              Reset
            </Button>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Apply Filters
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}