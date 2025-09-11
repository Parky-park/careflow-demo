import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Brain, Zap, TrendingUp, AlertTriangle, Users, Target, Clock, Lightbulb } from "lucide-react";

const AIInsights = () => {
  const insights = [
    {
      id: 1,
      type: "Risk Prediction",
      title: "High Readmission Risk Identified",
      description: "Sarah Johnson (67y) shows 87% probability of 30-day readmission based on medication adherence patterns and recent vitals.",
      confidence: 87,
      priority: "high",
      actionable: true,
      timestamp: "2 hours ago"
    },
    {
      id: 2,
      type: "Resource Optimization",
      title: "ICU Capacity Alert",
      description: "Predicted 92% ICU utilization by tomorrow evening. Consider early discharge planning for 3 stable patients.",
      confidence: 94,
      priority: "medium",
      actionable: true,
      timestamp: "4 hours ago"
    },
    {
      id: 3,
      type: "Patient Matching",
      title: "Optimal Provider Assignment",
      description: "15 unattached patients matched to providers based on expertise, capacity, and geographic proximity.",
      confidence: 91,
      priority: "low",
      actionable: false,
      timestamp: "6 hours ago"
    }
  ];

  const recommendations = [
    {
      category: "Care Coordination",
      title: "Implement Diabetes Care Pathway",
      description: "37% improvement in HbA1c control observed when structured pathway is followed",
      impact: "High",
      effort: "Medium"
    },
    {
      category: "Resource Management",
      title: "Optimize OR Scheduling",
      description: "AI analysis suggests 15% efficiency gain with adjusted scheduling patterns",
      impact: "Medium",
      effort: "Low"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500 text-white';
      case 'medium': return 'bg-yellow-500 text-black';
      case 'low': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600';
    if (confidence >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
          <Brain className="h-8 w-8 text-primary" />
          AI Insights Dashboard
        </h1>
        <p className="text-muted-foreground mt-2">
          AI-powered healthcare insights and predictive analytics
        </p>
      </div>

      {/* AI Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Insights Generated</p>
                <p className="text-2xl font-bold text-primary">247</p>
                <p className="text-xs text-muted-foreground">This Week</p>
              </div>
              <Lightbulb className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Prediction Accuracy</p>
                <p className="text-2xl font-bold text-green-600">94.2%</p>
                <p className="text-xs text-muted-foreground">Average</p>
              </div>
              <Target className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Active Predictions</p>
                <p className="text-2xl font-bold text-primary">1,247</p>
                <p className="text-xs text-muted-foreground">Live Assessments</p>
              </div>
              <Zap className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Cost Savings</p>
                <p className="text-2xl font-bold text-green-600">$2.3M</p>
                <p className="text-xs text-muted-foreground">This Month</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Recent AI Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {insights.map((insight) => (
              <div key={insight.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Badge className={getPriorityColor(insight.priority)}>
                      {insight.priority} priority
                    </Badge>
                    <Badge variant="outline">{insight.type}</Badge>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-bold ${getConfidenceColor(insight.confidence)}`}>
                      {insight.confidence}% confidence
                    </p>
                    <p className="text-xs text-muted-foreground">{insight.timestamp}</p>
                  </div>
                </div>
                
                <h3 className="font-semibold mb-2">{insight.title}</h3>
                <p className="text-muted-foreground text-sm mb-3">{insight.description}</p>
                
                {insight.actionable && (
                  <div className="flex gap-2">
                    <Button 
                      size="sm"
                      onClick={() => {
                        // Take action based on insight type
                        if (insight.type === "Risk Prediction") {
                          window.location.href = `/patients?filter=high-risk`;
                        } else if (insight.type === "Resource Optimization") {
                          window.location.href = `/emergency`;
                        } else {
                          window.location.href = `/patients`;
                        }
                      }}
                    >
                      Take Action
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => {
                        // Navigate to detailed insight view
                        window.location.href = `/insights/${insight.id}`;
                      }}
                    >
                      View Details
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            AI Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recommendations.map((rec, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <Badge variant="outline" className="mb-2">{rec.category}</Badge>
                    <h3 className="font-semibold">{rec.title}</h3>
                  </div>
                  <div className="flex gap-2">
                    <Badge className={getImpactColor(rec.impact)}>{rec.impact} Impact</Badge>
                    <Badge variant="secondary">{rec.effort} Effort</Badge>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm mb-3">{rec.description}</p>
                <Button 
                  size="sm"
                  onClick={() => {
                    // Implement recommendation
                    alert(`Implementing: ${rec.title}`);
                  }}
                >
                  Implement
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIInsights;