import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { NavigationSidebar } from "@/components/dashboard/NavigationSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertsPanel } from "@/components/modals/AlertsPanel";
import { Activity, Clock, MapPin, Users, AlertTriangle, ArrowRight, Pause, Play } from "lucide-react";
import { useState } from "react";

const RealtimeFeed = () => {
  const [feedPaused, setFeedPaused] = useState(false);
  const [showAlertsPanel, setShowAlertsPanel] = useState(false);
  
  const adtEvents = [
    {
      id: "1",
      type: "admission",
      patient: "John Smith",
      patientId: "MRN-12345",
      location: "Emergency Department", 
      timestamp: "Just now",
      urgency: "high",
      details: "Chest pain, stable vitals"
    },
    {
      id: "2", 
      type: "transfer",
      patient: "Maria Garcia", 
      patientId: "MRN-12346",
      location: "ICU → Ward 3A",
      timestamp: "2 min ago",
      urgency: "medium",
      details: "Post-surgical monitoring, stable"
    },
    {
      id: "3",
      type: "discharge",
      patient: "Robert Wilson",
      patientId: "MRN-12347", 
      location: "Ward 2B",
      timestamp: "5 min ago",
      urgency: "low",
      details: "Recovery complete, follow-up scheduled"
    },
    {
      id: "4",
      type: "admission",
      patient: "Lisa Anderson", 
      patientId: "MRN-12348",
      location: "Emergency Department",
      timestamp: "8 min ago",
      urgency: "high", 
      details: "Motor vehicle accident, trauma protocol"
    },
    {
      id: "5",
      type: "transfer",
      patient: "David Chang",
      patientId: "MRN-12349",
      location: "Ward 1A → ICU",
      timestamp: "12 min ago",
      urgency: "high",
      details: "Deteriorating condition, requires intensive care"
    }
  ];

  const systemAlerts = [
    {
      id: "1",
      type: "capacity",
      message: "ICU at 85% capacity - 3 beds remaining",
      timestamp: "5 min ago",
      severity: "warning"
    },
    {
      id: "2", 
      type: "equipment",
      message: "Ventilator maintenance required in Ward 2B",
      timestamp: "15 min ago", 
      severity: "medium"
    },
    {
      id: "3",
      type: "staffing",
      message: "Additional nurse required in Emergency Department",
      timestamp: "23 min ago",
      severity: "high"
    }
  ];

  const getEventColor = (type: string) => {
    switch (type) {
      case 'admission': return 'bg-primary text-primary-foreground';
      case 'transfer': return 'bg-warning text-warning-foreground';
      case 'discharge': return 'bg-success text-success-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'border-l-destructive bg-destructive/5';
      case 'medium': return 'border-l-warning bg-warning/5';
      case 'low': return 'border-l-success bg-success/5';
      default: return 'border-l-muted';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-destructive text-destructive-foreground';
      case 'warning': return 'bg-warning text-warning-foreground';
      case 'medium': return 'bg-accent text-accent-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-background via-background to-muted/20 flex flex-col">
      <DashboardHeader />
      
      <div className="flex flex-1 overflow-hidden">
        <NavigationSidebar />
        
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
                  <Activity className="h-8 w-8 text-primary animate-pulse" />
                  Real-time ADT Feed
                </h1>
                <p className="text-muted-foreground mt-2">
                  Live admission, discharge, and transfer monitoring
                </p>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-2"
                  onClick={() => setFeedPaused(!feedPaused)}
                >
                  {feedPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
                  {feedPaused ? "Resume Feed" : "Pause Feed"}
                </Button>
                <Button size="sm" className="gap-2" onClick={() => setShowAlertsPanel(true)}>
                  <AlertTriangle className="h-4 w-4" />
                  Alerts (3)
                </Button>
              </div>
            </div>

            {/* Feed Status */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="border-l-4 border-l-success">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Feed Status</p>
                      <p className={`text-lg font-bold ${feedPaused ? 'text-warning' : 'text-success'}`}>
                        {feedPaused ? "Paused" : "Live"}
                      </p>
                    </div>
                    <div className={`h-3 w-3 rounded-full ${feedPaused ? 'bg-warning' : 'bg-success animate-pulse'}`} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Today's Events</p>
                      <p className="text-lg font-bold">247</p>
                    </div>
                    <Activity className="h-5 w-5 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Active Patients</p>
                      <p className="text-lg font-bold">1,432</p>
                    </div>
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Avg Processing Time</p>
                      <p className="text-lg font-bold">2.3min</p>
                    </div>
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Live ADT Events */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-5 w-5 text-primary animate-pulse" />
                      Live ADT Events
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {adtEvents.map((event) => (
                        <div key={event.id} className={`flex items-start gap-3 p-4 rounded-lg border-l-4 ${getUrgencyColor(event.urgency)}`}>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge className={getEventColor(event.type)}>
                                {event.type}
                              </Badge>
                              <span className="font-medium">{event.patient}</span>
                              <Badge variant="outline" className="text-xs">
                                {event.patientId}
                              </Badge>
                            </div>
                            
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                              <MapPin className="h-3 w-3" />
                              {event.type === 'transfer' ? (
                                <span className="flex items-center gap-1">
                                  {event.location}
                                </span>
                              ) : (
                                <span>{event.location}</span>
                              )}
                            </div>
                            
                            <p className="text-sm text-muted-foreground">{event.details}</p>
                          </div>
                          
                          <div className="flex flex-col items-end gap-2">
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              {event.timestamp}
                            </div>
                            <Button variant="ghost" size="sm">
                              <ArrowRight className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* System Alerts */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-warning" />
                    System Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {systemAlerts.map((alert) => (
                      <div key={alert.id} className="p-3 rounded-lg border bg-card">
                        <div className="flex items-center justify-between mb-2">
                          <Badge className={getSeverityColor(alert.severity)}>
                            {alert.severity}
                          </Badge>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {alert.timestamp}
                          </div>
                        </div>
                        <p className="text-sm">{alert.message}</p>
                        <Button variant="outline" size="sm" className="w-full mt-2">
                          View Details
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
      
      <AlertsPanel 
        open={showAlertsPanel} 
        onOpenChange={setShowAlertsPanel} 
      />
    </div>
  );
};

export default RealtimeFeed;