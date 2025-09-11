import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Save } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

export default function DrugUtilizationRuleEdit() {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [formData, setFormData] = useState({
    name: "Duplicate Therapy Alert",
    category: "Safety",
    priority: "High",
    description: "Alerts pharmacists when a patient is prescribed multiple medications with the same therapeutic class",
    isActive: true,
    conditions: "Same therapeutic class medications\nOverlapping prescription dates\nSame prescribing provider excluded",
    actions: "Alert pharmacist\nSuggest alternative medication\nRequest prescriber consultation"
  });

  const handleSave = () => {
    console.log("Saving rule:", formData);
    navigate(`/drug-utilization/rules/${id}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 border-b pb-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(`/drug-utilization/rules/${id}`)}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Rule Details
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">Edit Rule</h1>
          <p className="text-muted-foreground">Rule ID: {id}</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Rule Configuration</CardTitle>
          <CardDescription>Modify the rule parameters and conditions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Rule Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                <SelectTrigger>
                  <SelectValue />
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
                  <SelectItem value="Critical">Critical</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="active"
                checked={formData.isActive}
                onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
              />
              <Label htmlFor="active">Rule Active</Label>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="conditions">Trigger Conditions (one per line)</Label>
            <Textarea
              id="conditions"
              value={formData.conditions}
              onChange={(e) => setFormData({ ...formData, conditions: e.target.value })}
              rows={4}
              placeholder="Enter each condition on a new line"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="actions">Actions (one per line)</Label>
            <Textarea
              id="actions"
              value={formData.actions}
              onChange={(e) => setFormData({ ...formData, actions: e.target.value })}
              rows={3}
              placeholder="Enter each action on a new line"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
            <Button variant="outline" onClick={() => navigate(`/drug-utilization/rules/${id}`)}>
              Cancel
            </Button>
            <Button variant="outline">
              Test Rule
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}