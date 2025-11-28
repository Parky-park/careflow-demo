import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ScheduleAppointmentModal } from "@/components/modals/ScheduleAppointmentModal";
import { FilterModal } from "@/components/modals/FilterModal";
import { Calendar, Clock, Plus, Filter, Package } from "lucide-react";
import { useState } from "react";
import { useTodayAppointments, useAppointmentMetrics } from "@/hooks/useAppointments";

const Schedule = () => {
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const { data: appointments, isLoading } = useTodayAppointments();
  const { data: metrics } = useAppointmentMetrics();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

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
                Today's Appointments
              </CardTitle>
            </CardHeader>
            <CardContent>
              {appointments && appointments.length > 0 ? (
                <div className="space-y-4">
                  {appointments.map((appointment) => (
                    <div key={appointment.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{appointment.provider_name}</h4>
                          <p className="text-sm text-muted-foreground">{appointment.room || 'Room TBD'}</p>
                          {appointment.patient && (
                            <p className="text-sm text-muted-foreground mt-1">
                              Patient: {appointment.patient.first_name} {appointment.patient.last_name}
                            </p>
                          )}
                        </div>
                        <div className="text-right">
                          <Badge variant="outline">
                            <Clock className="h-3 w-3 mr-1" />
                            {new Date(appointment.appointment_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </Badge>
                        </div>
                      </div>
                      <div className="mt-2 text-sm text-muted-foreground">
                        {appointment.appointment_type}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No appointments today</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Schedule appointments to see them here
                  </p>
                  <Button onClick={() => setShowScheduleModal(true)}>
                    Schedule Appointment
                  </Button>
                </div>
              )}
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
                  <span className="font-medium">{metrics?.todayTotal || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Available Slots</span>
                  <span className="font-medium">{metrics?.availableSlots || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Cancelled</span>
                  <span className="font-medium text-red-600">{metrics?.cancelled || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">No Shows</span>
                  <span className="font-medium text-orange-600">{metrics?.noShows || 0}</span>
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