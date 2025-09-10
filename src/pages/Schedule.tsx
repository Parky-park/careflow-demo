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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Today's Schedule
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Dr. Sarah Johnson - Cardiology</h4>
                      <p className="text-sm text-muted-foreground">Room 302A</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline">
                        <Clock className="h-3 w-3 mr-1" />
                        9:00 AM - 12:00 PM
                      </Badge>
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    8 appointments scheduled
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Dr. Michael Chen - Orthopedics</h4>
                      <p className="text-sm text-muted-foreground">Room 205B</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline">
                        <Clock className="h-3 w-3 mr-1" />
                        1:00 PM - 5:00 PM
                      </Badge>
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    12 appointments scheduled
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Dr. Emily Davis - Emergency</h4>
                      <p className="text-sm text-muted-foreground">Emergency Department</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary">
                        <Clock className="h-3 w-3 mr-1" />
                        24/7 On-Call
                      </Badge>
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    Available for emergencies
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b">
                  <div>
                    <p className="font-medium">John Smith</p>
                    <p className="text-sm text-muted-foreground">Cardiology Checkup</p>
                  </div>
                  <Badge variant="outline">9:30 AM</Badge>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <div>
                    <p className="font-medium">Maria Garcia</p>
                    <p className="text-sm text-muted-foreground">Orthopedic Consultation</p>
                  </div>
                  <Badge variant="outline">10:15 AM</Badge>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <div>
                    <p className="font-medium">Robert Johnson</p>
                    <p className="text-sm text-muted-foreground">Physical Therapy</p>
                  </div>
                  <Badge variant="outline">11:00 AM</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Today's Appointments</span>
                  <span className="font-medium">24</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Available Slots</span>
                  <span className="font-medium">8</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Cancelled</span>
                  <span className="font-medium text-red-600">3</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">No Shows</span>
                  <span className="font-medium text-orange-600">1</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <ScheduleAppointmentModal open={showScheduleModal} onOpenChange={setShowScheduleModal} />
      <FilterModal open={showFilterModal} onOpenChange={setShowFilterModal} type="schedule" />
    </div>
  );
};

export default Schedule;