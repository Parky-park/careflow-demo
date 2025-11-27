import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Microscope, TrendingUp, AlertTriangle, BarChart3, Filter, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDrugRules, useDrugEvaluations, useDrugMetrics } from "@/hooks/useDrugUtilization";

export default function DrugUtilization() {
  const navigate = useNavigate();
  const { data: rules, isLoading: rulesLoading } = useDrugRules();
  const { data: evaluations, isLoading: evalsLoading } = useDrugEvaluations();
  const { data: metrics } = useDrugMetrics();
  
  const utilizationMetrics = [
    { label: "Active DUE Rules", value: metrics?.activeRules.toString() || "0", icon: Microscope },
    { label: "Evaluations This Month", value: metrics?.totalEvals.toString() || "0", icon: BarChart3 },
    { label: "Flagged Prescriptions", value: metrics?.flagged.toString() || "0", icon: AlertTriangle },
    { 
      label: "Cost Savings", 
      value: metrics?.costSavings ? `$${metrics.costSavings.toLocaleString()}` : "—", 
      icon: TrendingUp 
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical": return "bg-destructive text-destructive-foreground";
      case "high": return "bg-warning text-warning-foreground";  
      case "medium": return "bg-primary text-primary-foreground";
      case "low": return "bg-success text-success-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "flagged": return "bg-destructive/10 text-destructive border-destructive/20";
      case "pending": return "bg-warning/10 text-warning border-warning/20";
      case "resolved": return "bg-success/10 text-success border-success/20";
      default: return "bg-muted text-muted-foreground border-border";
    }
  };

  if (rulesLoading || evalsLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-20 w-full" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </div>
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h1 className="text-3xl font-bold">Drug Utilization Evaluation</h1>
        <p className="text-muted-foreground">
          Comprehensive drug utilization monitoring and clinical decision support
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {utilizationMetrics.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{metric.label}</CardTitle>
                <IconComponent className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">
                  {metric.value}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* DUE Rules Engine */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Microscope className="h-5 w-5" />
              Active DUE Rules
            </CardTitle>
            <CardDescription>Clinical decision support rules and their performance</CardDescription>
          </div>
          <Button onClick={() => navigate('/drug-utilization/rules')}>
            <Filter className="h-4 w-4 mr-2" />
            Manage Rules
          </Button>
        </CardHeader>
        <CardContent>
          {rules && rules.length > 0 ? (
            <div className="space-y-4">
              {rules.map((rule: any) => (
                <div key={rule.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold">{rule.name}</h4>
                      <p className="text-sm text-muted-foreground">{rule.category}</p>
                    </div>
                    <Badge className={getPriorityColor(rule.priority)}>
                      {rule.priority}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Triggers</p>
                      <p className="text-2xl font-bold text-blue-600">{rule.trigger_count || 0}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Interventions</p>
                      <p className="text-2xl font-bold text-success">{rule.intervention_count || 0}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Effectiveness</p>
                      <p className="text-2xl font-bold text-primary">{rule.effectiveness_rate || 0}%</p>
                    </div>
                    <div className="flex items-end">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => navigate(`/drug-utilization/rules/${rule.id}`)}
                      >
                        View Details
                      </Button>
                    </div>
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
                Create Rule
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Evaluations */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Evaluations</CardTitle>
            <CardDescription>Latest drug utilization evaluation alerts</CardDescription>
          </div>
          <Button variant="outline" onClick={() => navigate('/drug-utilization/evaluations')}>View All</Button>
        </CardHeader>
        <CardContent>
          {evaluations && evaluations.length > 0 ? (
            <div className="space-y-3">
              {evaluations.map((evaluation: any) => (
                <div key={evaluation.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <Badge className={getStatusColor(evaluation.status)} variant="outline">
                      {evaluation.status}
                    </Badge>
                    <div>
                      <p className="font-medium">
                        {evaluation.patient?.first_name} {evaluation.patient?.last_name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {evaluation.prescription?.medication_name || 'Medication N/A'}
                      </p>
                      {evaluation.rule && (
                        <p className="text-xs text-muted-foreground">
                          Rule: {evaluation.rule.name}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => navigate(`/drug-utilization/evaluation/${evaluation.id}`)}
                    >
                      Review
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No evaluations found</h3>
              <p className="text-sm text-muted-foreground">
                Drug evaluations will appear here as prescriptions are processed
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Performance Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Rule Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Active Rules</span>
                <span className="font-bold text-primary">{rules?.length || 0}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Total Triggers</span>
                <span className="font-bold text-blue-600">
                  {rules?.reduce((sum: number, r: any) => sum + (r.trigger_count || 0), 0) || 0}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Total Interventions</span>
                <span className="font-bold text-success">
                  {rules?.reduce((sum: number, r: any) => sum + (r.intervention_count || 0), 0) || 0}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Evaluation Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Total Evaluations</span>
                <span className="font-bold text-primary">{evaluations?.length || 0}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Flagged</span>
                <span className="font-bold text-destructive">
                  {evaluations?.filter((e: any) => e.status === 'flagged').length || 0}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Resolved</span>
                <span className="font-bold text-success">
                  {evaluations?.filter((e: any) => e.status === 'resolved').length || 0}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}