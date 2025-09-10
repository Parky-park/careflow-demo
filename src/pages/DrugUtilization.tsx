import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Microscope, TrendingUp, AlertTriangle, BarChart3, Filter } from "lucide-react";

export default function DrugUtilization() {
  const utilizationMetrics = [
    { label: "Active DUE Rules", value: "47", icon: Microscope },
    { label: "Evaluations This Month", value: "2,834", icon: BarChart3 },
    { label: "Flagged Prescriptions", value: "156", icon: AlertTriangle },
    { label: "Cost Savings", value: "$89,240", icon: TrendingUp },
  ];

  const dueRules = [
    {
      id: "DUE001",
      name: "Duplicate Therapy Alert",
      category: "Safety",
      triggers: 45,
      interventions: 38,
      effectiveness: 84,
      priority: "High"
    },
    {
      id: "DUE002",
      name: "High Dose Opioid Warning",
      category: "Safety", 
      triggers: 23,
      interventions: 21,
      effectiveness: 91,
      priority: "Critical"
    },
    {
      id: "DUE003",
      name: "Drug-Drug Interaction",
      category: "Clinical",
      triggers: 67,
      interventions: 45,
      effectiveness: 67,
      priority: "High"
    },
    {
      id: "DUE004",
      name: "Cost-Effective Alternative",
      category: "Economic",
      triggers: 89,
      interventions: 56,
      effectiveness: 63,
      priority: "Medium"
    },
  ];

  const recentEvaluations = [
    {
      patient: "John Smith",
      medication: "Oxycodone 10mg",
      rule: "High Dose Opioid Warning",
      status: "Intervention Required",
      prescriber: "Dr. Johnson",
      date: "2024-01-16"
    },
    {
      patient: "Mary Wilson",
      medication: "Atorvastatin 40mg",
      rule: "Duplicate Therapy Alert",
      status: "Under Review",
      prescriber: "Dr. Chen",
      date: "2024-01-16"
    },
    {
      patient: "Robert Davis",
      medication: "Warfarin 5mg",
      rule: "Drug-Drug Interaction",
      status: "Resolved",
      prescriber: "Dr. Patel",
      date: "2024-01-15"
    },
  ];

  const drugCategories = [
    { category: "Cardiovascular", prescriptions: 1247, cost: "$145,890", trend: "+5.2%" },
    { category: "Diabetes", prescriptions: 892, cost: "$98,450", trend: "-2.1%" },
    { category: "Pain Management", prescriptions: 567, cost: "$67,230", trend: "+12.8%" },
    { category: "Antibiotics", prescriptions: 445, cost: "$23,180", trend: "-8.4%" },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical": return "bg-red-500 text-white";
      case "High": return "bg-orange-500 text-white";  
      case "Medium": return "bg-yellow-500 text-black";
      case "Low": return "bg-green-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Intervention Required": return "bg-red-100 text-red-800 border-red-200";
      case "Under Review": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Resolved": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getTrendColor = (trend: string) => {
    if (trend.startsWith('+')) return "text-red-600";
    if (trend.startsWith('-')) return "text-green-600";
    return "text-gray-600";
  };

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
          <Button>
            <Filter className="h-4 w-4 mr-2" />
            Manage Rules
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {dueRules.map((rule) => (
              <div key={rule.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold">{rule.name}</h4>
                    <p className="text-sm text-muted-foreground">{rule.id} • {rule.category}</p>
                  </div>
                  <Badge className={getPriorityColor(rule.priority)}>
                    {rule.priority}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Triggers</p>
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
                  <div className="flex items-end">
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Evaluations */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Evaluations</CardTitle>
            <CardDescription>Latest drug utilization evaluation alerts</CardDescription>
          </div>
          <Button variant="outline">View All</Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentEvaluations.map((evaluation, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <Badge className={getStatusColor(evaluation.status)} variant="outline">
                    {evaluation.status}
                  </Badge>
                  <div>
                    <p className="font-medium">{evaluation.patient}</p>
                    <p className="text-sm text-muted-foreground">
                      {evaluation.medication} • {evaluation.rule}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {evaluation.prescriber} • {evaluation.date}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    Review
                  </Button>
                  {evaluation.status === "Intervention Required" && (
                    <Button size="sm">
                      Intervene
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Drug Category Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Drug Category Analysis
          </CardTitle>
          <CardDescription>Utilization patterns by therapeutic category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {drugCategories.map((category, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-semibold">{category.category}</h4>
                  <p className="text-sm text-muted-foreground">
                    {category.prescriptions.toLocaleString()} prescriptions
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">{category.cost}</p>
                  <p className={`text-sm font-medium ${getTrendColor(category.trend)}`}>
                    {category.trend}
                  </p>
                </div>
              </div>
            ))}
          </div>
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
                <span>Average Response Time</span>
                <span className="font-bold text-green-600">1.2 seconds</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Clinical Acceptance Rate</span>
                <span className="font-bold text-blue-600">76%</span>
              </div>
              <div className="flex justify-between items-center">
                <span>False Positive Rate</span>
                <span className="font-bold text-orange-600">8.5%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cost Impact</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Monthly Savings</span>
                <span className="font-bold text-green-600">$89,240</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Adverse Events Prevented</span>
                <span className="font-bold text-blue-600">34</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Generic Substitutions</span>
                <span className="font-bold text-green-600">156</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}