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
}

export function ScheduleAppointmentModal({ open, onOpenChange }: ScheduleAppointmentModalProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    patientName: "",
    patientId: "",
    appointmentType: "",
    provider: "",
    date: "",
    time: "",
    duration: "30",
    location: "",
    priority: "medium",
    notes: "",
    reminderPreference: "24hours"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Appointment Scheduled",
      description: `Appointment for ${formData.patientName} has been scheduled for ${formData.date} at ${formData.time}.`,
    });
    
    // Reset form and close modal
    setFormData({
      patientName: "",
      patientId: "",
      appointmentType: "",
      provider: "",
      date: "",
      time: "",
      duration: "30",
      location: "",
      priority: "medium",
      notes: "",
      reminderPreference: "24hours"
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
          <DialogTitle>Schedule New Appointment</DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto px-1">
          <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="patientName">Patient Name *</Label>
              <Input
                id="patientName"
                value={formData.patientName}
                onChange={(e) => handleInputChange("patientName", e.target.value)}
                placeholder="Search patient by name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="patientId">Patient ID</Label>
              <Input
                id="patientId"
                value={formData.patientId}
                onChange={(e) => handleInputChange("patientId", e.target.value)}
                placeholder="MRN-123456"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="appointmentType">Appointment Type *</Label>
              <Select value={formData.appointmentType} onValueChange={(value) => handleInputChange("appointmentType", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select appointment type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="consultation">Consultation</SelectItem>
                  <SelectItem value="follow-up">Follow-up</SelectItem>
                  <SelectItem value="surgery">Surgery</SelectItem>
                  <SelectItem value="diagnostic">Diagnostic Test</SelectItem>
                  <SelectItem value="therapy">Therapy Session</SelectItem>
                  <SelectItem value="routine-checkup">Routine Checkup</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="provider">Provider *</Label>
              <Select value={formData.provider} onValueChange={(value) => handleInputChange("provider", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select provider" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dr-wilson">Dr. Sarah Wilson</SelectItem>
                  <SelectItem value="dr-chen">Dr. Michael Chen</SelectItem>
                  <SelectItem value="dr-patel">Dr. Raj Patel</SelectItem>
                  <SelectItem value="nurse-lee">Nurse Jennifer Lee</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date *</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange("date", e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="time">Time *</Label>
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
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="45">45 minutes</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                  <SelectItem value="90">1.5 hours</SelectItem>
                  <SelectItem value="120">2 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Select value={formData.location} onValueChange={(value) => handleInputChange("location", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="room-101">Room 101</SelectItem>
                  <SelectItem value="room-205">Room 205</SelectItem>
                  <SelectItem value="room-302">Room 302</SelectItem>
                  <SelectItem value="cardiology-clinic">Cardiology Clinic</SelectItem>
                  <SelectItem value="or-1">Operating Room 1</SelectItem>
                  <SelectItem value="or-2">Operating Room 2</SelectItem>
                  <SelectItem value="conference-a">Conference Room A</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="priority">Priority Level</Label>
              <Select value={formData.priority} onValueChange={(value) => handleInputChange("priority", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low Priority</SelectItem>
                  <SelectItem value="medium">Medium Priority</SelectItem>
                  <SelectItem value="high">High Priority</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reminderPreference">Reminder Preference</Label>
            <Select value={formData.reminderPreference} onValueChange={(value) => handleInputChange("reminderPreference", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">No Reminder</SelectItem>
                <SelectItem value="1hour">1 Hour Before</SelectItem>
                <SelectItem value="24hours">24 Hours Before</SelectItem>
                <SelectItem value="48hours">48 Hours Before</SelectItem>
                <SelectItem value="1week">1 Week Before</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
              placeholder="Any additional notes or special requirements for this appointment"
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