import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, Activity, Zap } from "lucide-react";

export function AnalyticsChart() {
  const insights = [
    {
      title: "Patient Risk Prediction",
      description: "12 patients identified at high risk for readmission",
      confidence: 94,
      trend: "up",
      icon: <TrendingUp className="h-4 w-4" />
    },
    {
      title: "Resource Allocation", 
      description: "ICU capacity optimized for next 48 hours",
      confidence: 87,
      trend: "stable",
      icon: <Activity className="h-4 w-4" />
    },
    {
      title: "Patient Matching",
      description: "15 unattached patients matched to providers",
      confidence: 91,
      trend: "up", 
      icon: <Users className="h-4 w-4" />
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-accent" />
          AI-Driven Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {insights.map((insight, index) => (
          <div key={index} className="flex items-start gap-3 p-4 rounded-lg border bg-card hover:bg-muted/30 transition-colors">
            <div className="p-2 rounded-full bg-primary/10 text-primary">
              {insight.icon}
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-sm">{insight.title}</h4>
                <Badge variant="secondary" className="text-xs">
                  {insight.confidence}% confidence
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {insight.description}
              </p>
              <div className="flex items-center gap-2">
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                    style={{ width: `${insight.confidence}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground min-w-fit">
                  {insight.confidence}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}