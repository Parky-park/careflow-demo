import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Shield, AlertTriangle, CheckCircle } from "lucide-react";

const DrugUtilizationRules = () => {
  const navigate = useNavigate();

  const rules = [
    {
      id: "1",
      name: "High-Risk Opioid Combinations",
      description: "Alerts when opioids are prescribed with benzodiazepines or other CNS depressants",
      status: "Active",
      priority: "High",
      triggerCount: 23,
      lastTriggered: "2 hours ago"
    },
    {
      id: "2", 
      name: "Duplicate Therapy Detection",
      description: "Identifies when patients are prescribed multiple drugs from the same therapeutic class",
      status: "Active",
      priority: "Medium",
      triggerCount: 15,
      lastTriggered: "4 hours ago"
    },
    {
      id: "3",
      name: "Dosage Limit Verification",
      description: "Checks if prescribed dosages exceed recommended maximum daily limits",
      status: "Active",
      priority: "High",
      triggerCount: 8,
      lastTriggered: "1 hour ago"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-500 text-white';
      case 'Medium': return 'bg-yellow-500 text-black';
      case 'Low': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/drug-utilization')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Drug Utilization
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Shield className="h-8 w-8 text-primary" />
            Drug Utilization Rules
          </h1>
          <p className="text-muted-foreground mt-2">Manage automated drug safety and utilization rules</p>
        </div>
      </div>

      {/* Rules List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Active Rules</CardTitle>
            <Button onClick={() => navigate('/drug-utilization/rules/new')}>
              Add New Rule
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {rules.map((rule) => (
              <div key={rule.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Badge className={getPriorityColor(rule.priority)}>
                      {rule.priority} Priority
                    </Badge>
                    <Badge className={getStatusColor(rule.status)}>
                      {rule.status}
                    </Badge>
                  </div>
                  <div className="text-right text-sm text-muted-foreground">
                    <p>Triggered {rule.triggerCount} times</p>
                    <p>Last: {rule.lastTriggered}</p>
                  </div>
                </div>
                
                <h3 className="font-semibold mb-2">{rule.name}</h3>
                <p className="text-muted-foreground text-sm mb-3">{rule.description}</p>
                
                <div className="flex gap-2">
                  <Button 
                    size="sm"
                    onClick={() => navigate(`/drug-utilization/rules/${rule.id}`)}
                  >
                    View Details
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => navigate(`/drug-utilization/rules/${rule.id}/edit`)}
                  >
                    Edit Rule
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DrugUtilizationRules;