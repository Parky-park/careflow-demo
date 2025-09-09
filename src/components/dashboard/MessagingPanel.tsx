import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, Clock, Shield } from "lucide-react";

interface Message {
  id: string;
  sender: string;
  role: string;
  message: string;
  timestamp: string;
  priority: 'high' | 'medium' | 'low';
  encrypted: boolean;
}

const mockMessages: Message[] = [
  {
    id: "1",
    sender: "Dr. Michael Chen",
    role: "Cardiologist",
    message: "Patient in Room 302 needs immediate cardiac consultation",
    timestamp: "3 min ago",
    priority: "high",
    encrypted: true
  },
  {
    id: "2", 
    sender: "Nurse Jennifer Lee",
    role: "ICU Supervisor",
    message: "Medication order completed for patient Johnson",
    timestamp: "8 min ago",
    priority: "medium",
    encrypted: true
  },
  {
    id: "3",
    sender: "Dr. Raj Patel",
    role: "Emergency Medicine",
    message: "Incoming trauma patient, ETA 10 minutes",
    timestamp: "12 min ago",
    priority: "high",
    encrypted: true
  }
];

export function MessagingPanel() {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-destructive text-destructive-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'low': return 'bg-success text-success-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            Secure Messages
          </div>
          <Badge variant="outline" className="flex items-center gap-1">
            <Shield className="h-3 w-3" />
            Encrypted
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockMessages.map((message) => (
          <div key={message.id} className="flex gap-3 p-3 rounded-lg border bg-card hover:bg-muted/30 transition-colors">
            <Avatar className="h-8 w-8 flex-shrink-0">
              <AvatarImage src={`https://api.dicebear.com/7.x/personas/svg?seed=${message.sender}`} />
              <AvatarFallback className="text-xs">
                {message.sender.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium truncate">{message.sender}</p>
                  <Badge variant="secondary" className="text-xs">
                    {message.role}
                  </Badge>
                </div>
                <Badge className={`text-xs ${getPriorityColor(message.priority)}`}>
                  {message.priority}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                {message.message}
              </p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {message.timestamp}
                {message.encrypted && (
                  <Shield className="h-3 w-3 text-success" />
                )}
              </div>
            </div>
          </div>
        ))}
        <Button variant="outline" className="w-full">
          View All Messages
        </Button>
      </CardContent>
    </Card>
  );
}