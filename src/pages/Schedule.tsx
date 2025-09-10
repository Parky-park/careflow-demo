import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScheduleAppointmentModal } from "@/components/modals/ScheduleAppointmentModal";
import { FilterModal } from "@/components/modals/FilterModal";
import { Calendar, Clock, Plus, Filter } from "lucide-react";
import { useState } from "react";

const Schedule = () => {
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Calendar className="h-8 w-8 text-primary" />
            Schedule Management
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage appointments and schedules
          </p>
        </div>
        <Button className="gap-2" onClick={() => setShowScheduleModal(true)}>
          <Plus className="h-4 w-4" />
          Schedule Appointment
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Today's Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Schedule content here...</p>
        </CardContent>
      </Card>
      
      <ScheduleAppointmentModal open={showScheduleModal} onOpenChange={setShowScheduleModal} />
      <FilterModal open={showFilterModal} onOpenChange={setShowFilterModal} type="schedule" />
    </div>
  );
};

export default Schedule;