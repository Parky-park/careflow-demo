import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { NavigationSidebar } from "@/components/dashboard/NavigationSidebar";
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
      participant: "Cardiology Team",
      role: "Group Chat",
      lastMessage: "Weekly team meeting scheduled for tomorrow at 2 PM",
      timestamp: "1 hour ago",
      unread: 5,
      priority: "low",
      encrypted: true
    },
    {
      id: "4",
      participant: "Dr. Raj Patel",
      role: "Emergency Medicine",
      lastMessage: "Thanks for the quick response on the trauma case",
      timestamp: "2 hours ago",
      unread: 0,
      priority: "low",
      encrypted: true
    }
  ];

  const activeMessages = [
    {
      id: "1",
      sender: "Dr. Michael Chen",
      message: "Patient in Room 302 needs immediate cardiac consultation. Elevated troponins and EKG changes.",
      timestamp: "3 min ago",
      isOwn: false,
      attachments: ["ecg_report.pdf"]
    },
    {
      id: "2",
      sender: "You",
      message: "On my way to Room 302. ETA 5 minutes. Please prep the patient for echo.",
      timestamp: "2 min ago", 
      isOwn: true,
      attachments: []
    },
    {
      id: "3",
      sender: "Dr. Michael Chen",
      message: "Perfect. Echo tech is already on standby. Patient is stable but concerned about chest pain.",
      timestamp: "1 min ago",
      isOwn: false,
      attachments: []
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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <DashboardHeader />
      
      <div className="flex">
        <NavigationSidebar />
        
        <main className="flex-1 p-6">
          <div className="space-y-6">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
                <MessageSquare className="h-8 w-8 text-primary" />
                Secure Messages
              </h1>
              <p className="text-muted-foreground mt-2">
                HIPAA-compliant healthcare communication platform
              </p>
            </div>

            {/* Messaging Interface */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
              
              {/* Conversations List */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5" />
                      Conversations
                    </span>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Shield className="h-3 w-3" />
                      Encrypted
                    </Badge>
                  </CardTitle>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search messages..." className="pl-10" />
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="space-y-1">
                    {conversations.map((conversation) => (
                      <div key={conversation.id} className="p-3 hover:bg-muted/50 cursor-pointer border-b last:border-b-0">
                        <div className="flex items-start gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={`https://api.dicebear.com/7.x/personas/svg?seed=${conversation.participant}`} />
                            <AvatarFallback>
                              {conversation.participant.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <div className="flex items-center gap-2">
                                <p className="font-medium text-sm truncate">{conversation.participant}</p>
                                {conversation.encrypted && (
                                  <Shield className="h-3 w-3 text-success" />
                                )}
                              </div>
                              {conversation.unread > 0 && (
                                <Badge className="bg-primary text-primary-foreground h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center">
                                  {conversation.unread}
                                </Badge>
                              )}
                            </div>
                            
                            <Badge variant="outline" className="text-xs mb-2">
                              {conversation.role}
                            </Badge>
                            
                            <p className="text-xs text-muted-foreground line-clamp-2 mb-1">
                              {conversation.lastMessage}
                            </p>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                {conversation.timestamp}
                              </div>
                              <Badge className={`text-xs ${getPriorityColor(conversation.priority)}`}>
                                {conversation.priority}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Active Conversation */}
              <Card className="lg:col-span-2 flex flex-col">
                <CardHeader className="border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="https://api.dicebear.com/7.x/personas/svg?seed=Dr.MichaelChen" />
                        <AvatarFallback>MC</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">Dr. Michael Chen</p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Shield className="h-3 w-3 text-success" />
                          Cardiologist • End-to-end encrypted
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Star className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        Priority
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                {/* Messages */}
                <CardContent className="flex-1 p-4 space-y-4 overflow-y-auto">
                  {activeMessages.map((message) => (
                    <div key={message.id} className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[70%] ${message.isOwn ? 'bg-primary text-primary-foreground' : 'bg-muted'} rounded-lg p-3`}>
                        {!message.isOwn && (
                          <p className="text-xs font-medium mb-1">{message.sender}</p>
                        )}
                        <p className="text-sm">{message.message}</p>
                        
                        {message.attachments.length > 0 && (
                          <div className="mt-2 pt-2 border-t border-current/20">
                            {message.attachments.map((attachment, index) => (
                              <div key={index} className="flex items-center gap-2 text-xs">
                                <Paperclip className="h-3 w-3" />
                                {attachment}
                              </div>
                            ))}
                          </div>
                        )}
                        
                        <p className={`text-xs mt-2 ${message.isOwn ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
                
                {/* Message Input */}
                <div className="border-t p-4">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Input placeholder="Type a secure message..." className="flex-1" />
                    <Button size="sm" className="gap-2">
                      <Send className="h-4 w-4" />
                      Send
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                    <Shield className="h-3 w-3" />
                    All messages are encrypted and HIPAA compliant
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Messages;