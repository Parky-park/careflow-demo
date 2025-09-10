import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface FilterOption {
  id: string;
  label: string;
  type: 'select' | 'multiselect';
  options: string[];
}

interface FilterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  filters: FilterOption[];
  onApplyFilters: (filters: Record<string, any>) => void;
}

export function FilterModal({ 
  open, 
  onOpenChange, 
  title, 
  description, 
  filters, 
  onApplyFilters 
}: FilterModalProps) {
  const [selectedFilters, setSelectedFilters] = useState<Record<string, any>>({});

  const handleSelectChange = (filterId: string, value: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterId]: value
    }));
  };

  const handleMultiSelectChange = (filterId: string, value: string, checked: boolean) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterId]: checked 
        ? [...(prev[filterId] || []), value]
        : (prev[filterId] || []).filter((v: string) => v !== value)
    }));
  };

  const removeFilter = (filterId: string, value?: string) => {
    setSelectedFilters(prev => {
      const newFilters = { ...prev };
      if (value && Array.isArray(newFilters[filterId])) {
        newFilters[filterId] = newFilters[filterId].filter((v: string) => v !== value);
        if (newFilters[filterId].length === 0) {
          delete newFilters[filterId];
        }
      } else {
        delete newFilters[filterId];
      }
      return newFilters;
    });
  };

  const clearAllFilters = () => {
    setSelectedFilters({});
  };

  const applyFilters = () => {
    onApplyFilters(selectedFilters);
    onOpenChange(false);
  };

  const activeFilterCount = Object.keys(selectedFilters).length;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Active Filters */}
          {activeFilterCount > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Active Filters ({activeFilterCount})</Label>
                <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                  Clear All
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {Object.entries(selectedFilters).map(([filterId, value]) => {
                  const filter = filters.find(f => f.id === filterId);
                  if (!filter) return null;
                  
                  if (Array.isArray(value)) {
                    return value.map(v => (
                      <Badge key={`${filterId}-${v}`} variant="secondary" className="gap-1">
                        {filter.label}: {v}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-3 w-3 p-0"
                          onClick={() => removeFilter(filterId, v)}
                        >
                          <X className="h-2 w-2" />
                        </Button>
                      </Badge>
                    ));
                  }
                  
                  return (
                    <Badge key={filterId} variant="secondary" className="gap-1">
                      {filter.label}: {value}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-3 w-3 p-0"
                        onClick={() => removeFilter(filterId)}
                      >
                        <X className="h-2 w-2" />
                      </Button>
                    </Badge>
                  );
                })}
              </div>
            </div>
          )}

          {/* Filter Options */}
          <div className="space-y-4">
            {filters.map((filter) => (
              <div key={filter.id} className="space-y-2">
                <Label>{filter.label}</Label>
                {filter.type === 'select' ? (
                  <Select
                    value={selectedFilters[filter.id] || ""}
                    onValueChange={(value) => handleSelectChange(filter.id, value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={`Select ${filter.label.toLowerCase()}`} />
                    </SelectTrigger>
                    <SelectContent>
                      {filter.options.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="space-y-2">
                    {filter.options.map((option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <Checkbox
                          id={`${filter.id}-${option}`}
                          checked={(selectedFilters[filter.id] || []).includes(option)}
                          onCheckedChange={(checked) => 
                            handleMultiSelectChange(filter.id, option, checked as boolean)
                          }
                        />
                        <Label htmlFor={`${filter.id}-${option}`} className="text-sm">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button onClick={applyFilters}>
              Apply Filters ({activeFilterCount})
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}