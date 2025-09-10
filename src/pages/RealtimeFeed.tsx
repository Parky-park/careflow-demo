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
      details: "Post-surgical transfer"
    },
    {
      id: "3",
      type: "discharge",
      patient: "Robert Johnson",
      patientId: "MRN-12347", 
      location: "Ward 2B",
      timestamp: "5 min ago",
      urgency: "low",
      details: "Recovery complete"
    },
    {
      id: "4",
      type: "admission",
      patient: "Sarah Davis",
      patientId: "MRN-12348",
      location: "ICU",
      timestamp: "12 min ago", 
      urgency: "high",
      details: "Respiratory distress"
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'admission': return 'bg-green-500 text-white';
      case 'discharge': return 'bg-blue-500 text-white';
      case 'transfer': return 'bg-orange-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-destructive text-destructive-foreground';
      case 'warning': return 'bg-warning text-warning-foreground';
      case 'medium': return 'bg-accent text-accent-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Activity className="h-8 w-8 text-primary animate-pulse" />
            Real-time ADT Feed
          </h1>
          <p className="text-muted-foreground mt-2">
            Live patient admission, discharge, and transfer updates from hospital systems
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setFeedPaused(!feedPaused)}
            className="gap-2"
          >
            {feedPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
            {feedPaused ? 'Resume' : 'Pause'} Feed
          </Button>
          <Button 
            variant="outline"
            onClick={() => setShowAlertsPanel(true)}
          >
            <AlertTriangle className="h-4 w-4 mr-2" />
            View Alerts
          </Button>
        </div>
      </div>

      {/* Feed Status */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${feedPaused ? 'bg-red-500' : 'bg-green-500 animate-pulse'}`}></div>
              <span className="font-medium">
                ADT Feed Status: {feedPaused ? 'Paused' : 'Live'}
              </span>
            </div>
            <div className="text-sm text-muted-foreground">
              Last update: {feedPaused ? 'Paused' : 'Just now'}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Live Events */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Live ADT Events</span>
            <Badge variant="secondary">{adtEvents.length} events today</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {adtEvents.map((event) => (
              <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/20 transition-colors">
                <div className="flex items-center gap-4">
                  <Badge className={getTypeColor(event.type)}>
                    {event.type.toUpperCase()}
                  </Badge>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{event.patient}</h3>
                      <span className="text-sm text-muted-foreground">({event.patientId})</span>
                      <Badge className={getUrgencyColor(event.urgency)} variant="outline">
                        {event.urgency}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{event.timestamp}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{event.details}</p>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  <ArrowRight className="h-3 w-3 mr-1" />
                  View Details
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Today's Admissions</p>
                <p className="text-2xl font-bold text-green-600">47</p>
                <p className="text-xs text-muted-foreground">+12% from yesterday</p>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Today's Discharges</p>
                <p className="text-2xl font-bold text-blue-600">52</p>
                <p className="text-xs text-muted-foreground">+8% from yesterday</p>
              </div>
              <ArrowRight className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Active Transfers</p>
                <p className="text-2xl font-bold text-orange-600">8</p>
                <p className="text-xs text-muted-foreground">3 in progress</p>
              </div>
              <Activity className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Current Census</p>
                <p className="text-2xl font-bold text-primary">234</p>
                <p className="text-xs text-muted-foreground">78% occupancy</p>
              </div>
              <MapPin className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      <AlertsPanel 
        open={showAlertsPanel} 
        onOpenChange={setShowAlertsPanel} 
      />
    </div>
  );
};

export default RealtimeFeed;