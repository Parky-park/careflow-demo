import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface ScheduleAppointmentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  patientId?: string;
}

export function ScheduleAppointmentModal({ open, onOpenChange, patientId }: ScheduleAppointmentModalProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    patientId: patientId || "",
    appointmentType: "",
    provider: "",
    date: "",
    time: "",
    duration: "30",
    reason: "",
    priority: "medium",
    notes: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Appointment Scheduled",
      description: `Appointment has been scheduled for ${formData.date} at ${formData.time}.`,
    });
    
    setFormData({
      patientId: "",
      appointmentType: "",
      provider: "",
      date: "",
      time: "",
      duration: "30",
      reason: "",
      priority: "medium",
      notes: ""
    });
    onOpenChange(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle>Schedule Appointment</DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto px-1">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="patientId">Patient ID</Label>
                <Input
                  id="patientId"
                  value={formData.patientId}
                  onChange={(e) => handleInputChange("patientId", e.target.value)}
                  placeholder="Enter patient ID or search"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="appointmentType">Appointment Type</Label>
                <Select value={formData.appointmentType} onValueChange={(value) => handleInputChange("appointmentType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select appointment type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="consultation">Consultation</SelectItem>
                    <SelectItem value="follow-up">Follow-up</SelectItem>
                    <SelectItem value="procedure">Procedure</SelectItem>
                    <SelectItem value="emergency">Emergency</SelectItem>
                    <SelectItem value="routine">Routine Check-up</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="provider">Provider</Label>
                <Select value={formData.provider} onValueChange={(value) => handleInputChange("provider", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select provider" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dr-wilson">Dr. Wilson</SelectItem>
                    <SelectItem value="dr-patel">Dr. Patel</SelectItem>
                    <SelectItem value="dr-chen">Dr. Chen</SelectItem>
                    <SelectItem value="dr-johnson">Dr. Johnson</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select value={formData.priority} onValueChange={(value) => handleInputChange("priority", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange("date", e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => handleInputChange("time", e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Select value={formData.duration} onValueChange={(value) => handleInputChange("duration", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="45">45 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                    <SelectItem value="90">1.5 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reason">Reason for Visit</Label>
              <Textarea
                id="reason"
                value={formData.reason}
                onChange={(e) => handleInputChange("reason", e.target.value)}
                placeholder="Brief description of the reason for the appointment"
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                placeholder="Any additional notes or special instructions"
                rows={3}
              />
            </div>

            <div className="flex gap-2 pt-4 flex-shrink-0">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">
                Schedule Appointment
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}