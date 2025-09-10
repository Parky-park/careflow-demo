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
      category: "Medication Management", 
      title: "Electronic Prescription Validation",
      description: "Reduce medication errors by 23% with AI-powered prescription checking",
      impact: "High",
      effort: "Low"
    },
    {
      category: "Workflow Optimization",
      title: "Nurse Scheduling Algorithm",
      description: "Optimize shifts to reduce overtime costs by 15% while maintaining care quality",
      impact: "Medium",
      effort: "High"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-destructive text-destructive-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'low': return 'bg-success text-success-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High': return 'text-destructive';
      case 'Medium': return 'text-warning';
      case 'Low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-background via-background to-muted/20 flex flex-col">
      <DashboardHeader />
      
      <div className="flex flex-1 overflow-hidden">
        <NavigationSidebar />
        
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="space-y-6">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
                <Brain className="h-8 w-8 text-accent animate-pulse" />
                AI-Driven Insights
              </h1>
              <p className="text-muted-foreground mt-2">
                Machine learning powered healthcare analytics and predictive intelligence
              </p>
            </div>

            {/* AI Model Status */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border-l-4 border-l-success">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Risk Prediction Model</p>
                      <p className="text-2xl font-bold text-success">94.2%</p>
                      <p className="text-xs text-muted-foreground">Accuracy Rate</p>
                    </div>
                    <Target className="h-8 w-8 text-success" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-primary">
                <CardContent className="p-4">
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

              <Card className="border-l-4 border-l-accent">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Model Last Updated</p>
                      <p className="text-2xl font-bold text-accent">2h</p>
                      <p className="text-xs text-muted-foreground">Ago</p>
                    </div>
                    <Clock className="h-8 w-8 text-accent" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Active Insights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-primary" />
                  Active AI Insights ({insights.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {insights.map((insight) => (
                  <div key={insight.id} className="p-4 rounded-lg border bg-card hover:bg-muted/30 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-primary/10">
                          <Brain className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline" className="text-xs">
                              {insight.type}
                            </Badge>
                            <Badge className={getPriorityColor(insight.priority)}>
                              {insight.priority} priority
                            </Badge>
                          </div>
                          <h3 className="font-medium">{insight.title}</h3>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-accent">{insight.confidence}%</p>
                        <p className="text-xs text-muted-foreground">Confidence</p>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3 ml-11">
                      {insight.description}
                    </p>
                    
                    <div className="flex items-center justify-between ml-11">
                      <span className="text-xs text-muted-foreground">{insight.timestamp}</span>
                      {insight.actionable && (
                        <Button size="sm" variant="outline">
                          Take Action
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* AI Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-accent" />
                  AI Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recommendations.map((rec, index) => (
                  <div key={index} className="p-4 rounded-lg border bg-card hover:bg-muted/30 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <Badge variant="secondary" className="mb-2">{rec.category}</Badge>
                        <h3 className="font-medium mb-1">{rec.title}</h3>
                        <p className="text-sm text-muted-foreground">{rec.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-4">
                        <div className="text-sm">
                          <span className="text-muted-foreground">Impact: </span>
                          <span className={`font-medium ${getImpactColor(rec.impact)}`}>
                            {rec.impact}
                          </span>
                        </div>
                        <div className="text-sm">
                          <span className="text-muted-foreground">Effort: </span>
                          <span className="font-medium">{rec.effort}</span>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        Learn More
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AIInsights;