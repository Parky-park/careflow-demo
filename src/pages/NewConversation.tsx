import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, MessageSquare } from "lucide-react";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function NewConversation() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [participantName, setParticipantName] = useState("");
  const [participantRole, setParticipantRole] = useState("");
  const [priority, setPriority] = useState("medium");
  const [initialMessage, setInitialMessage] = useState("");

  // Fetch staff members for selection
  const { data: staffMembers } = useQuery({
    queryKey: ["staff-members"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("staff")
        .select("id, full_name, role")
        .eq("status", "active")
        .order("full_name");
      
      if (error) throw error;
      return data || [];
    },
  });

  const createConversationMutation = useMutation({
    mutationFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", user.id)
        .single();

      // Create conversation
      const { data: conversation, error: convError } = await supabase
        .from("conversations")
        .insert({
          participant_id: user.id,
          participant_name: participantName,
          participant_role: participantRole,
          last_message: initialMessage,
          priority,
        })
        .select()
        .single();

      if (convError) throw convError;

      // Create initial message
      if (initialMessage.trim()) {
        const { error: msgError } = await supabase
          .from("messages")
          .insert({
            conversation_id: conversation.id,
            sender_id: user.id,
            sender_name: profile?.full_name || user.email || "You",
            content: initialMessage,
          });

        if (msgError) throw msgError;
      }

      return conversation;
    },
    onSuccess: (conversation) => {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
      toast({
        title: "Success",
        description: "Conversation started successfully",
      });
      navigate(`/chat/${conversation.id}`);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to start conversation",
        variant: "destructive",
      });
      console.error("Create conversation error:", error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!participantName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a participant name",
        variant: "destructive",
      });
      return;
    }
    createConversationMutation.mutate();
  };

  const handleStaffSelect = (staffId: string) => {
    const staff = staffMembers?.find(s => s.id === staffId);
    if (staff) {
      setParticipantName(staff.full_name);
      setParticipantRole(staff.role);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/messages')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <MessageSquare className="h-8 w-8 text-primary" />
            New Conversation
          </h1>
          <p className="text-muted-foreground">Start a secure HIPAA-compliant conversation</p>
        </div>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>Start New Conversation</CardTitle>
          <CardDescription>
            Send secure messages to healthcare team members
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Staff Selection */}
            {staffMembers && staffMembers.length > 0 && (
              <div className="space-y-2">
                <Label htmlFor="staff">Select Staff Member (Optional)</Label>
                <Select onValueChange={handleStaffSelect}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose from staff directory" />
                  </SelectTrigger>
                  <SelectContent>
                    {staffMembers.map((staff) => (
                      <SelectItem key={staff.id} value={staff.id}>
                        {staff.full_name} - {staff.role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Participant Name */}
            <div className="space-y-2">
              <Label htmlFor="participant">Participant Name *</Label>
              <Input
                id="participant"
                placeholder="Enter participant name"
                value={participantName}
                onChange={(e) => setParticipantName(e.target.value)}
                required
              />
            </div>

            {/* Participant Role */}
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Input
                id="role"
                placeholder="e.g., Cardiologist, Nurse, etc."
                value={participantRole}
                onChange={(e) => setParticipantRole(e.target.value)}
              />
            </div>

            {/* Priority */}
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Initial Message */}
            <div className="space-y-2">
              <Label htmlFor="message">Initial Message</Label>
              <Textarea
                id="message"
                placeholder="Type your first message..."
                value={initialMessage}
                onChange={(e) => setInitialMessage(e.target.value)}
                rows={4}
              />
            </div>

            {/* Actions */}
            <div className="flex gap-2 justify-end">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate('/messages')}
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                disabled={createConversationMutation.isPending}
              >
                {createConversationMutation.isPending ? "Starting..." : "Start Conversation"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
