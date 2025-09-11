import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit, BarChart3, AlertTriangle, CheckCircle } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

export default function DrugUtilizationRuleDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock data for the rule
  const rule = {
    id: id || "DUE001",
    name: "Duplicate Therapy Alert",
    category: "Safety",
    description: "Alerts pharmacists when a patient is prescribed multiple medications with the same therapeutic class",
    triggers: 45,
    interventions: 38,
    effectiveness: 84,
    priority: "High",
    status: "Active",
    lastModified: "2024-01-15",
    conditions: [
      "Same therapeutic class medications",
      "Overlapping prescription dates",
      "Same prescribing provider excluded"
    ],
    actions: [
      "Alert pharmacist",
      "Suggest alternative medication",
      "Request prescriber consultation"
    ]
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical": return "bg-red-500 text-white";
      case "High": return "bg-orange-500 text-white";
      case "Medium": return "bg-yellow-500 text-black";
      case "Low": return "bg-green-500 text-white";
      default: return "bg-gray-500 text-white";
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
          <h1 className="text-3xl font-bold">{rule.name}</h1>
          <p className="text-muted-foreground">Rule ID: {rule.id}</p>
        </div>
        <div className="flex gap-2">
          <Badge className={getPriorityColor(rule.priority)}>
            {rule.priority}
          </Badge>
          <Badge variant="outline">
            {rule.status}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Rule Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Performance Metrics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Total Triggers</p>
              <p className="text-2xl font-bold text-blue-600">{rule.triggers}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Interventions</p>
              <p className="text-2xl font-bold text-green-600">{rule.interventions}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Effectiveness</p>
              <p className="text-2xl font-bold text-primary">{rule.effectiveness}%</p>
            </div>
          </CardContent>
        </Card>

        {/* Rule Details */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Rule Configuration</CardTitle>
            <CardDescription>
              Category: {rule.category} • Last modified: {rule.lastModified}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Description</h4>
              <p className="text-muted-foreground">{rule.description}</p>
            </div>

            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Trigger Conditions
              </h4>
              <ul className="space-y-1">
                {rule.conditions.map((condition, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    {condition}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Actions Taken</h4>
              <ul className="space-y-1">
                {rule.actions.map((action, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-blue-500" />
                    {action}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Rule Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Button onClick={() => navigate(`/drug-utilization/rules/${rule.id}/edit`)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Rule
            </Button>
            <Button variant="outline">
              View Audit Log
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