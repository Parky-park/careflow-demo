import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, Send, Search, Shield, Clock, Paperclip, Star } from "lucide-react";

const Messages = () => {
  const conversations = [
    {
      id: "1",
      participant: "Dr. Michael Chen",
      role: "Cardiologist", 
      lastMessage: "Patient in Room 302 needs immediate cardiac consultation",
      timestamp: "3 min ago",
      unread: 2,
      priority: "high",
      encrypted: true
    },
    {
      id: "2",
      participant: "Nurse Jennifer Lee",
      role: "ICU Supervisor",
      lastMessage: "Medication order completed for patient Johnson",
      timestamp: "8 min ago", 
      unread: 0,
      priority: "medium",
      encrypted: true
    },
    {
      id: "3",
      participant: "Dr. Sarah Wilson",
      role: "Emergency Medicine",
      lastMessage: "New admission requires immediate attention",
      timestamp: "12 min ago",
      unread: 1,
      priority: "high",
      encrypted: true
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-destructive text-destructive-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'low': return 'bg-success text-success-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
          <MessageSquare className="h-8 w-8 text-primary" />
          Secure Messages
        </h1>
        <p className="text-muted-foreground mt-2">
          HIPAA-compliant secure messaging for healthcare teams
        </p>
      </div>

      {/* Messages Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Conversations List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Conversations</span>
              <Badge variant="secondary">{conversations.filter(c => c.unread > 0).length}</Badge>
            </CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input placeholder="Search conversations..." className="pl-10" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 cursor-pointer border"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>
                      {conversation.participant.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium truncate">{conversation.participant}</h3>
                        <p className="text-xs text-muted-foreground">{conversation.role}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {conversation.unread > 0 && (
                          <Badge variant="destructive" className="h-5 px-2 text-xs">
                            {conversation.unread}
                          </Badge>
                        )}
                        <Badge className={getPriorityColor(conversation.priority)}>
                          {conversation.priority}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground truncate mt-1">
                      {conversation.lastMessage}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
                      {conversation.encrypted && (
                        <Shield className="h-3 w-3 text-green-500" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Message Thread */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>MC</AvatarFallback>
                </Avatar>
                <div>
                  <h3>Dr. Michael Chen</h3>
                  <p className="text-sm text-muted-foreground">Cardiologist</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={getPriorityColor('high')}>High Priority</Badge>
                <Shield className="h-4 w-4 text-green-500" />
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 min-h-[300px]">
              {/* Sample Messages */}
              <div className="flex gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>MC</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="bg-muted/50 rounded-lg p-3">
                    <p className="text-sm">Patient in Room 302 needs immediate cardiac consultation. Elevated troponin levels and EKG changes noted.</p>
                  </div>
                  <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>3 minutes ago</span>
                    <Shield className="h-3 w-3 text-green-500" />
                  </div>
                </div>
              </div>

              <div className="flex gap-3 justify-end">
                <div className="flex-1 max-w-xs">
                  <div className="bg-primary/10 rounded-lg p-3 ml-auto">
                    <p className="text-sm">On my way to Room 302 now. Will assess and provide recommendations.</p>
                  </div>
                  <div className="flex items-center justify-end gap-2 mt-1 text-xs text-muted-foreground">
                    <span>Just now</span>
                    <Shield className="h-3 w-3 text-green-500" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Message Input */}
            <div className="flex gap-2 pt-4 border-t">
              <Button variant="outline" size="sm">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Input placeholder="Type your secure message..." className="flex-1" />
              <Button size="sm">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security Notice */}
      <Card className="border-green-200 bg-green-50">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 text-green-800">
            <Shield className="h-4 w-4" />
            <span className="text-sm font-medium">
              All messages are HIPAA-compliant and end-to-end encrypted
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Messages;