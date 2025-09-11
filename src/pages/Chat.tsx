import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, Send, Paperclip, Shield, Clock, Phone, Video, MoreVertical } from "lucide-react";

const Chat = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [messageText, setMessageText] = useState("");

  // Mock data - in a real app, this would be fetched based on the conversation ID
  const conversations = {
    "1": {
      participant: "Dr. Michael Chen",
      role: "Cardiologist",
      priority: "high",
      encrypted: true,
      messages: [
        {
          id: "1",
          sender: "Dr. Michael Chen",
          senderId: "mc",
          text: "Patient in Room 302 needs immediate cardiac consultation. Elevated troponin levels and EKG changes noted.",
          timestamp: "3 minutes ago",
          isOwn: false
        },
        {
          id: "2",
          sender: "You",
          senderId: "you",
          text: "On my way to Room 302 now. Will assess and provide recommendations.",
          timestamp: "Just now",
          isOwn: true
        }
      ]
    },
    "2": {
      participant: "Nurse Jennifer Lee",
      role: "ICU Supervisor",
      priority: "medium",
      encrypted: true,
      messages: [
        {
          id: "1",
          sender: "Nurse Jennifer Lee",
          senderId: "jl",
          text: "Medication order completed for patient Johnson. All vitals stable.",
          timestamp: "8 minutes ago",
          isOwn: false
        }
      ]
    },
    "3": {
      participant: "Dr. Sarah Wilson",
      role: "Emergency Medicine",
      priority: "high",
      encrypted: true,
      messages: [
        {
          id: "1",
          sender: "Dr. Sarah Wilson",
          senderId: "sw",
          text: "New admission requires immediate attention. Multiple trauma patient incoming.",
          timestamp: "12 minutes ago",
          isOwn: false
        }
      ]
    }
  };

  const conversation = conversations[id as keyof typeof conversations];

  if (!conversation) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-muted-foreground">Conversation not found</h2>
          <Button onClick={() => navigate('/messages')} className="mt-4">
            Back to Messages
          </Button>
        </div>
      </div>
    );
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-destructive text-destructive-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'low': return 'bg-success text-success-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // In a real app, this would send the message to the backend
      console.log("Sending message:", messageText);
      setMessageText("");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate('/messages')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback>
                {conversation.participant.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold text-foreground">{conversation.participant}</h1>
              <p className="text-muted-foreground">{conversation.role}</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge className={getPriorityColor(conversation.priority)}>
            {conversation.priority} priority
          </Badge>
          {conversation.encrypted && (
            <Shield className="h-4 w-4 text-green-500" />
          )}
          <Button variant="outline" size="sm">
            <Phone className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            <Video className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Chat Interface */}
      <Card className="h-[600px] flex flex-col">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Secure Conversation</CardTitle>
            {conversation.encrypted && (
              <div className="flex items-center gap-2 text-green-600">
                <Shield className="h-4 w-4" />
                <span className="text-sm">End-to-end encrypted</span>
              </div>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col">
          {/* Messages */}
          <ScrollArea className="flex-1 pr-4">
            <div className="space-y-4">
              {conversation.messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.isOwn ? 'justify-end' : ''}`}
                >
                  {!message.isOwn && (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{message.senderId.toUpperCase()}</AvatarFallback>
                    </Avatar>
                  )}
                  
                  <div className={`flex-1 max-w-xs ${message.isOwn ? 'ml-auto' : ''}`}>
                    <div className={`rounded-lg p-3 ${
                      message.isOwn 
                        ? 'bg-primary text-primary-foreground ml-auto' 
                        : 'bg-muted'
                    }`}>
                      <p className="text-sm">{message.text}</p>
                    </div>
                    <div className={`flex items-center gap-2 mt-1 text-xs text-muted-foreground ${
                      message.isOwn ? 'justify-end' : ''
                    }`}>
                      <Clock className="h-3 w-3" />
                      <span>{message.timestamp}</span>
                      {conversation.encrypted && (
                        <Shield className="h-3 w-3 text-green-500" />
                      )}
                    </div>
                  </div>

                  {message.isOwn && (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>YOU</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
          
          {/* Message Input */}
          <div className="flex gap-2 pt-4 border-t mt-4">
            <Button variant="outline" size="sm">
              <Paperclip className="h-4 w-4" />
            </Button>
            <Input
              placeholder="Type your secure message..."
              className="flex-1"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <Button size="sm" onClick={handleSendMessage}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Security Notice */}
      <Card className="border-green-200 bg-green-50">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 text-green-800">
            <Shield className="h-4 w-4" />
            <span className="text-sm font-medium">
              This conversation is HIPAA-compliant and end-to-end encrypted
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Chat;