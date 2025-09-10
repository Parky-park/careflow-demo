import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { NavigationSidebar } from "@/components/dashboard/NavigationSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FilterModal } from "@/components/modals/FilterModal";
import { ScheduleAppointmentModal } from "@/components/modals/ScheduleAppointmentModal";
import { Calendar, Clock, Users, Plus, Filter, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Schedule = () => {
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const { toast } = useToast();

  const todaySchedule = [
    {
      id: "1",
      time: "08:00",
      duration: "30 min",
      type: "Patient Consultation",
      patient: "Sarah Johnson, 67",
      location: "Room 302",
      provider: "Dr. Sarah Wilson",
      priority: "high",
      status: "confirmed"
    },
    {
      id: "2", 
      time: "08:30",
      duration: "45 min",
      type: "Surgery",
      patient: "Michael Chen, 45",
      location: "OR 2",
      provider: "Dr. Michael Chen",
      priority: "high", 
      status: "in-progress"
    },
    {
      id: "3",
      time: "09:15",
      duration: "20 min",
      type: "Follow-up",
      patient: "Emma Rodriguez, 72",
      location: "Cardiology Clinic",
      provider: "Dr. Sarah Wilson",
      priority: "medium",
      status: "confirmed"
    },
    {
      id: "4",
      time: "10:00",
      duration: "60 min", 
      type: "Team Meeting",
      patient: "Cardiology Department",
      location: "Conference Room A",
      provider: "All Staff",
      priority: "medium",
      status: "scheduled"
    },
    {
      id: "5",
      time: "11:30",
      duration: "30 min",
      type: "Consultation",
      patient: "James Wilson, 34",
      location: "Room 205",
      provider: "Dr. Raj Patel", 
      priority: "low",
      status: "pending"
    }
  ];

  const staffSchedule = [
    {
      id: "1",
      name: "Dr. Sarah Wilson",
      role: "Cardiologist",
      shift: "08:00 - 18:00",
      availability: "busy",
      patients: 8,
      nextFree: "14:00"
    },
    {
      id: "2",
      name: "Nurse Jennifer Lee", 
      role: "Charge Nurse",
      shift: "06:00 - 18:00",
      availability: "available",
      patients: 6,
      nextFree: "Now"
    },
    {
      id: "3",
      name: "Dr. Michael Chen",
      role: "Cardiac Surgeon", 
      shift: "07:00 - 17:00",
      availability: "surgery",
      patients: 3,
      nextFree: "15:30"
    },
    {
      id: "4",
      name: "Dr. Raj Patel",
      role: "Resident",
      shift: "08:00 - 20:00",
      availability: "available",
      patients: 5,
      nextFree: "Now"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-success text-success-foreground';
      case 'in-progress': return 'bg-primary text-primary-foreground';
      case 'pending': return 'bg-warning text-warning-foreground';
      case 'cancelled': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-destructive';
      case 'medium': return 'border-l-warning';
      case 'low': return 'border-l-success';
      default: return 'border-l-muted';
    }
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available': return 'bg-success text-success-foreground';
      case 'busy': return 'bg-warning text-warning-foreground';
      case 'surgery': return 'bg-destructive text-destructive-foreground';
      case 'break': return 'bg-accent text-accent-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const filterOptions = [
    {
      id: 'appointmentType',
      label: 'Appointment Type',
      type: 'multiselect' as const,
      options: ['Patient Consultation', 'Surgery', 'Follow-up', 'Team Meeting', 'Consultation']
    },
    {
      id: 'status',
      label: 'Status',
      type: 'multiselect' as const,
      options: ['Confirmed', 'In-progress', 'Pending', 'Cancelled', 'Scheduled']
    },
    {
      id: 'priority',
      label: 'Priority',
      type: 'select' as const,
      options: ['High', 'Medium', 'Low']
    },
    {
      id: 'provider',
      label: 'Provider',
      type: 'select' as const,
      options: ['Dr. Sarah Wilson', 'Dr. Michael Chen', 'Dr. Raj Patel', 'All Staff']
    }
  ];

  const handleApplyFilters = (filters: Record<string, any>) => {
    toast({
      title: "Schedule Filters Applied",
      description: `Applied ${Object.keys(filters).length} filter(s) to schedule view.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex flex-col">
      <DashboardHeader />
      
      <div className="flex flex-1 overflow-hidden">
        <NavigationSidebar />
        
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
                  <Calendar className="h-8 w-8 text-primary" />
                  Schedule Management
                </h1>
                <p className="text-muted-foreground mt-2">
                  Coordinate patient appointments and staff schedules
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="gap-2" onClick={() => setShowFilterModal(true)}>
                  <Filter className="h-4 w-4" />
                  Filter View
                </Button>
                <Button className="gap-2" onClick={() => setShowScheduleModal(true)}>
                  <Plus className="h-4 w-4" />
                  Schedule Appointment
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Today's Appointments</p>
                      <p className="text-2xl font-bold">23</p>
                    </div>
                    <Calendar className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Available Staff</p>
                      <p className="text-2xl font-bold">12</p>
                    </div>
                    <Users className="h-8 w-8 text-success" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Pending Approvals</p>
                      <p className="text-2xl font-bold">5</p>
                    </div>
                    <Clock className="h-8 w-8 text-warning" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Utilization Rate</p>
                      <p className="text-2xl font-bold">87%</p>
                    </div>
                    <Clock className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Today's Schedule */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    Today's Schedule - January 9, 2024
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {todaySchedule.map((appointment) => (
                      <div key={appointment.id} className={`p-4 rounded-lg border-l-4 bg-card ${getPriorityColor(appointment.priority)}`}>
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <div className="text-center">
                              <p className="font-bold text-lg">{appointment.time}</p>
                              <p className="text-xs text-muted-foreground">{appointment.duration}</p>
                            </div>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <Badge variant="outline">{appointment.type}</Badge>
                                <Badge className={getStatusColor(appointment.status)}>
                                  {appointment.status}
                                </Badge>
                              </div>
                              <p className="font-medium">{appointment.patient}</p>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  {appointment.location}
                                </span>
                                <span>Provider: {appointment.provider}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm">
                              <Phone className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Staff Availability */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Staff Availability
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {staffSchedule.map((staff) => (
                      <div key={staff.id} className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-muted/30 transition-colors">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={`https://api.dicebear.com/7.x/personas/svg?seed=${staff.name}`} />
                            <AvatarFallback>
                              {staff.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-medium">{staff.name}</p>
                              <Badge className={getAvailabilityColor(staff.availability)}>
                                {staff.availability}
                              </Badge>
                            </div>
                            
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span>{staff.role}</span>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {staff.shift}
                              </span>
                            </div>
                            
                            <div className="text-sm text-muted-foreground">
                              Patients: {staff.patients} • Next free: {staff.nextFree}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Schedule
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Phone className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>

      <FilterModal
        open={showFilterModal}
        onOpenChange={setShowFilterModal}
        title="Filter Schedule View"
        description="Apply filters to customize your schedule display."
        filters={filterOptions}
        onApplyFilters={handleApplyFilters}
      />

      <ScheduleAppointmentModal 
        open={showScheduleModal} 
        onOpenChange={setShowScheduleModal} 
      />
    </div>
  );
};

export default Schedule;