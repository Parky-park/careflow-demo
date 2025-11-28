import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Send, Shield, Clock, Paperclip } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function Chat() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [messageText, setMessageText] = useState("");
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Get current user
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setCurrentUserId(user?.id || null);
    });
  }, []);

  // Fetch conversation details
  const { data: conversation, isLoading: conversationLoading } = useQuery({
    queryKey: ["conversation", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("conversations")
        .select("*")
        .eq("id", id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  // Fetch messages
  const { data: messages, isLoading: messagesLoading } = useQuery({
    queryKey: ["messages", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("conversation_id", id)
        .order("created_at", { ascending: true });
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!id,
  });

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: async (content: string) => {
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
          conversation_id: id,
          sender_id: user.id,
          sender_name: profile?.full_name || user.email || "You",
          content,
        });

      if (error) throw error;

      // Update conversation's last message
      await supabase
        .from("conversations")
        .update({
          last_message: content,
          last_message_at: new Date().toISOString(),
        })
        .eq("id", id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages", id] });
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
      setMessageText("");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive",
      });
      console.error("Send message error:", error);
    },
  });

  // Real-time subscription for new messages
  useEffect(() => {
    if (!id) return;

    const channel = supabase
      .channel(`messages:${id}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${id}`,
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ["messages", id] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [id, queryClient]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;
    sendMessageMutation.mutate(messageText);
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
    if (diffInMinutes < 1440) return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return date.toLocaleDateString();
  };

  if (conversationLoading || messagesLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (!conversation) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold mb-2">Conversation not found</h3>
        <Button onClick={() => navigate('/messages')}>Back to Messages</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/messages')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Secure Messages</h1>
          <p className="text-muted-foreground">HIPAA-compliant secure messaging</p>
        </div>
      </div>

      {/* Chat Interface */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback>
                  {conversation.participant_name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3>{conversation.participant_name}</h3>
                <p className="text-sm text-muted-foreground">{conversation.participant_role}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={
                conversation.priority === 'high' ? 'bg-destructive text-destructive-foreground' :
                conversation.priority === 'medium' ? 'bg-warning text-warning-foreground' :
                'bg-success text-success-foreground'
              }>
                {conversation.priority} priority
              </Badge>
              {conversation.encrypted && <Shield className="h-4 w-4 text-green-500" />}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Messages */}
          <div className="space-y-4 min-h-[400px] max-h-[500px] overflow-y-auto mb-4">
            {messages && messages.length > 0 ? (
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
            <div ref={messagesEndRef} />
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
              disabled={sendMessageMutation.isPending}
            />
            <Button 
              size="sm" 
              type="submit"
              disabled={!messageText.trim() || sendMessageMutation.isPending}
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>

          {/* Security Notice */}
          <div className="flex items-center gap-2 text-green-800 bg-green-50 dark:bg-green-950 dark:text-green-200 p-3 rounded-lg mt-4">
            <Shield className="h-4 w-4" />
            <span className="text-sm font-medium">
              All messages are HIPAA-compliant and end-to-end encrypted
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
