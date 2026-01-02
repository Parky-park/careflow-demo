import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Shield, Package } from "lucide-react";
import { useDrugRules } from "@/hooks/useDrugUtilization";

const DrugUtilizationRules = () => {
  const navigate = useNavigate();
  const { data: rules, isLoading } = useDrugRules();

  const getPriorityColor = (priority: string) => {
    switch (priority?.toLowerCase()) {
      case 'critical': return 'bg-destructive text-destructive-foreground';
      case 'high': return 'bg-warning text-warning-foreground';
      case 'medium': return 'bg-primary text-primary-foreground';
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
          {rules && rules.length > 0 ? (
            <div className="space-y-4">
              {rules.map((rule: any) => (
                <div key={rule.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Badge className={getPriorityColor(rule.priority)}>
                        {rule.priority} Priority
                      </Badge>
                      <Badge className="bg-success/10 text-success border-success/20" variant="outline">
                        Active
                      </Badge>
                    </div>
                    <div className="text-right text-sm text-muted-foreground">
                      <p>Triggered {rule.trigger_count || 0} times</p>
                      <p>Effectiveness: {rule.effectiveness_rate || 0}%</p>
                    </div>
                  </div>
                  
                  <h3 className="font-semibold mb-2">{rule.name}</h3>
                  <p className="text-muted-foreground text-sm mb-1">{rule.category}</p>
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
          ) : (
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No DUE rules found</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Create drug utilization evaluation rules to get started
              </p>
              <Button onClick={() => navigate('/drug-utilization/rules/new')}>
                Add New Rule
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DrugUtilizationRules;