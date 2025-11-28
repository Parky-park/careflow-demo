import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Clock } from "lucide-react";
import { useState } from "react";
import { useUpdatePreferences } from "@/hooks/useUserSettings";

interface TimezoneModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentTimezone: string;
}

export function TimezoneModal({ open, onOpenChange, currentTimezone }: TimezoneModalProps) {
  const updatePreferences = useUpdatePreferences();
  const [selectedTimezone, setSelectedTimezone] = useState(currentTimezone);

  const timezones = [
    { value: "UTC-8", label: "Pacific Time (UTC-8)" },
    { value: "UTC-7", label: "Mountain Time (UTC-7)" },
    { value: "UTC-6", label: "Central Time (UTC-6)" },
    { value: "UTC-5", label: "Eastern Time (UTC-5)" },
    { value: "UTC-4", label: "Atlantic Time (UTC-4)" },
    { value: "UTC-3:30", label: "Newfoundland Time (UTC-3:30)" },
    { value: "UTC", label: "UTC (UTC±0)" },
    { value: "UTC+1", label: "Central European Time (UTC+1)" },
    { value: "UTC+2", label: "Eastern European Time (UTC+2)" },
    { value: "UTC+5:30", label: "India Standard Time (UTC+5:30)" },
    { value: "UTC+8", label: "China Standard Time (UTC+8)" },
    { value: "UTC+9", label: "Japan Standard Time (UTC+9)" },
    { value: "UTC+10", label: "Australian Eastern Time (UTC+10)" },
  ];

  const handleSave = () => {
    updatePreferences.mutate(
      { timezone: selectedTimezone },
      {
        onSuccess: () => {
          onOpenChange(false);
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Select Timezone
          </DialogTitle>
          <DialogDescription>
            Choose your timezone for accurate time displays
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto px-1">
          <RadioGroup value={selectedTimezone} onValueChange={setSelectedTimezone}>
            <div className="space-y-3">
              {timezones.map((timezone) => (
                <div key={timezone.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={timezone.value} id={timezone.value} />
                  <Label htmlFor={timezone.value} className="flex-1 cursor-pointer">
                    {timezone.label}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t flex-shrink-0">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={updatePreferences.isPending}>
            {updatePreferences.isPending ? "Saving..." : "Save"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
