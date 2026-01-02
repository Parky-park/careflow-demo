import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Save, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export default function DrugUtilizationRuleNew() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    priority: "medium",
    description: "",
    isActive: true,
    conditions: "",
    actions: ""
  });

  const handleSave = async () => {
    setIsSubmitting(true);
    try {
      const { data, error } = await supabase
        .from("drug_utilization_rules")
        .insert({
          name: formData.name,
          category: formData.category,
          priority: formData.priority.toLowerCase(),
          description: `${formData.description}\n\nConditions:\n${formData.conditions}\n\nActions:\n${formData.actions}`,
          active: formData.isActive,
          trigger_count: 0,
          intervention_count: 0,
          effectiveness_rate: 0
        })
        .select()
        .single();

      if (error) throw error;

      toast.success("DUE rule created successfully");
      navigate(`/drug-utilization/rules/${data.id}`);
    } catch (error: any) {
      console.error("Error creating rule:", error);
      toast.error("Failed to create rule: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 border-b pb-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/drug-utilization/rules')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Rules
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">Create New DUE Rule</h1>
          <p className="text-muted-foreground">Define a new drug utilization evaluation rule</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Rule Configuration
          </CardTitle>
          <CardDescription>Configure the new rule parameters and conditions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Rule Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., High Dose Alert"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Safety">Safety</SelectItem>
                  <SelectItem value="Clinical">Clinical</SelectItem>
                  <SelectItem value="Economic">Economic</SelectItem>
                  <SelectItem value="Quality">Quality</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select value={formData.priority} onValueChange={(value) => setFormData({ ...formData, priority: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="active"
                checked={formData.isActive}
                onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
              />
              <Label htmlFor="active">Activate rule immediately</Label>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              placeholder="Describe what this rule checks for and when it should trigger"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="conditions">Trigger Conditions * (one per line)</Label>
            <Textarea
              id="conditions"
              value={formData.conditions}
              onChange={(e) => setFormData({ ...formData, conditions: e.target.value })}
              rows={4}
              placeholder="Daily dose exceeds 90 MME&#10;Patient has concurrent benzodiazepine prescription&#10;No pain management consultation in last 6 months"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="actions">Actions to Take * (one per line)</Label>
            <Textarea
              id="actions"
              value={formData.actions}
              onChange={(e) => setFormData({ ...formData, actions: e.target.value })}
              rows={3}
              placeholder="Alert prescribing physician&#10;Require pharmacist consultation&#10;Suggest dose reduction"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <Button 
              onClick={handleSave}
              disabled={!formData.name || !formData.category || !formData.description || !formData.conditions || !formData.actions || isSubmitting}
            >
              <Save className="h-4 w-4 mr-2" />
              {isSubmitting ? "Creating..." : "Create Rule"}
            </Button>
            <Button variant="outline" onClick={() => navigate('/drug-utilization/rules')}>
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}