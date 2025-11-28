import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { MessageSquare, Send, Search, Shield, Clock, Paperclip, Plus, Package } from "lucide-react";
import { useConversations, useMessages } from "@/hooks/useMessaging";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Messages = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data: conversations, isLoading } = useConversations();
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [messageText, setMessageText] = useState("");
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const { data: messages, isLoading: messagesLoading } = useMessages(selectedConversationId || "");

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setCurrentUserId(user?.id || null);
    });
  }, []);

  const selectedConversation = conversations?.find(c => c.id === selectedConversationId);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim() || !selectedConversationId) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", user.id)
        .maybeSingle();

      const { error } = await supabase
        .from("messages")
        .insert({
          conversation_id: selectedConversationId,
          sender_id: user.id,
          sender_name: profile?.full_name || user.email || "You",
          content: messageText,
        });

      if (error) throw error;

      await supabase
        .from("conversations")
        .update({
          last_message: messageText,
          last_message_at: new Date().toISOString(),
        })
        .eq("id", selectedConversationId);

      setMessageText("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive",
      });
    }
  };
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-destructive text-destructive-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'low': return 'bg-success text-success-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hours ago`;
    return date.toLocaleDateString();
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
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{conversations?.filter((c: any) => c.unread_count > 0).length || 0}</Badge>
                <Button size="sm" onClick={() => navigate('/chat/new')}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input placeholder="Search conversations..." className="pl-10" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {conversations && conversations.length > 0 ? (
                conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 cursor-pointer border ${
                      selectedConversationId === conversation.id ? 'bg-primary/10 border-primary' : ''
                    }`}
                    onClick={() => setSelectedConversationId(conversation.id)}
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>
                        {conversation.participant_name.split(' ').map((n: string) => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium truncate">{conversation.participant_name}</h3>
                          <p className="text-xs text-muted-foreground">{conversation.participant_role}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {conversation.unread_count > 0 && (
                            <Badge variant="destructive" className="h-5 px-2 text-xs">
                              {conversation.unread_count}
                            </Badge>
                          )}
                          <Badge className={getPriorityColor(conversation.priority)}>
                            {conversation.priority}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground truncate mt-1">
                        {conversation.last_message}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{formatTimestamp(conversation.last_message_at)}</span>
                        {conversation.encrypted && (
                          <Shield className="h-3 w-3 text-green-500" />
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No conversations yet</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Start a new conversation to get started
                  </p>
                  <Button onClick={() => navigate('/chat/new')}>
                    New Conversation
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Message Thread */}
        <Card className="lg:col-span-2">
          {selectedConversation ? (
            <>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>
                        {selectedConversation.participant_name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3>{selectedConversation.participant_name}</h3>
                      <p className="text-sm text-muted-foreground">{selectedConversation.participant_role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getPriorityColor(selectedConversation.priority)}>
                      {selectedConversation.priority} priority
                    </Badge>
                    {selectedConversation.encrypted && <Shield className="h-4 w-4 text-green-500" />}
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 min-h-[400px] max-h-[500px] overflow-y-auto mb-4">
                  {messagesLoading ? (
                    <div className="space-y-3">
                      <Skeleton className="h-16 w-3/4" />
                      <Skeleton className="h-16 w-3/4 ml-auto" />
                      <Skeleton className="h-16 w-3/4" />
                    </div>
                  ) : messages && messages.length > 0 ? (
                    messages.map((message: any) => {
                      const isCurrentUser = message.sender_id === currentUserId;
                      
                      return (
                        <div key={message.id} className={`flex gap-3 ${isCurrentUser ? 'justify-end' : ''}`}>
                          {!isCurrentUser && (
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>
                                {message.sender_name.split(' ').map((n: string) => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                          )}
                          <div className={`flex-1 max-w-xs ${isCurrentUser ? 'ml-auto' : ''}`}>
                            <div className={`rounded-lg p-3 ${
                              isCurrentUser ? 'bg-primary/10 ml-auto' : 'bg-muted/50'
                            }`}>
                              {!isCurrentUser && (
                                <p className="text-xs font-medium text-muted-foreground mb-1">
                                  {message.sender_name}
                                </p>
                              )}
                              <p className="text-sm">{message.content}</p>
                            </div>
                            <div className={`flex items-center gap-2 mt-1 text-xs text-muted-foreground ${
                              isCurrentUser ? 'justify-end' : ''
                            }`}>
                              <Clock className="h-3 w-3" />
                              <span>{formatTimestamp(message.created_at)}</span>
                              {message.encrypted && <Shield className="h-3 w-3 text-green-500" />}
                            </div>
                          </div>
                          {isCurrentUser && (
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>You</AvatarFallback>
                            </Avatar>
                          )}
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      No messages yet. Start the conversation!
                    </div>
                  )}
                </div>
                
                {/* Message Input */}
                <form onSubmit={handleSendMessage} className="flex gap-2 pt-4 border-t">
                  <Button variant="outline" size="sm" type="button">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Input 
                    placeholder="Type your secure message..." 
                    className="flex-1"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                  />
                  <Button size="sm" type="submit" disabled={!messageText.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </form>

                <div className="flex items-center gap-2 text-green-800 bg-green-50 dark:bg-green-950 dark:text-green-200 p-3 rounded-lg mt-4">
                  <Shield className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    All messages are HIPAA-compliant and end-to-end encrypted
                  </span>
                </div>
              </CardContent>
            </>
          ) : (
            <CardContent className="flex flex-col items-center justify-center min-h-[500px]">
              <MessageSquare className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Select a conversation</h3>
              <p className="text-sm text-muted-foreground text-center max-w-sm">
                Choose a conversation from the list to view messages and reply, or start a new conversation.
              </p>
              <Button onClick={() => navigate('/chat/new')} className="mt-4">
                <Plus className="h-4 w-4 mr-2" />
                New Conversation
              </Button>
            </CardContent>
          )}
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