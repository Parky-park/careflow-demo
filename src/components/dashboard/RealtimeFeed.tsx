import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, ArrowRight, Clock, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface ADTEvent {
  id: string;
  type: 'admission' | 'discharge' | 'transfer';
  patient: string;
  location: string;
  timestamp: string;
  urgency: 'high' | 'medium' | 'low';
}

const mockEvents: ADTEvent[] = [
  {
    id: "1",
    type: "admission",
    patient: "John Smith",
    location: "Emergency Department",
    timestamp: "2 min ago",
    urgency: "high"
  },
  {
    id: "2",
    type: "transfer", 
    patient: "Maria Garcia",
    location: "ICU → Ward 3A",
    timestamp: "5 min ago",
    urgency: "medium"
  },
  {
    id: "3",
    type: "discharge",
    patient: "Robert Wilson",
    location: "Ward 2B",
    timestamp: "12 min ago",
    urgency: "low"
  },
  {
    id: "4",
    type: "admission",
    patient: "Lisa Anderson",
    location: "Emergency Department",
    timestamp: "18 min ago", 
    urgency: "high"
  }
];

export function RealtimeFeed() {
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
      case 'high': return 'border-l-destructive';
      case 'medium': return 'border-l-warning';
      case 'low': return 'border-l-success';
      default: return 'border-l-muted';
    }
  };

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary animate-pulse" />
          Real-time ADT Feed
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {mockEvents.map((event) => (
            <div key={event.id} className={cn(
              "flex items-center justify-between p-3 rounded-lg border-l-4 bg-card",
              getUrgencyColor(event.urgency)
            )}>
              <div className="flex items-center gap-3">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <Badge className={cn("text-xs", getEventColor(event.type))}>
                      {event.type}
                    </Badge>
                    <span className="font-medium text-sm">{event.patient}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {event.type === 'transfer' ? (
                      <span className="flex items-center gap-1">
                        {event.location}
                      </span>
                    ) : (
                      <span>{event.location}</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {event.timestamp}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}