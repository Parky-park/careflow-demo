import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, Activity, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function AnalyticsChart() {
  const navigate = useNavigate();
  
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
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-accent" />
            AI-Driven Insights
          </CardTitle>
          <button 
            onClick={() => navigate('/insights')}
            className="text-sm text-primary hover:underline"
          >
            View All
          </button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 md:space-y-4 px-4 md:px-6">
        {insights.map((insight, index) => (
          <div 
            key={index} 
            className="flex items-start gap-2 md:gap-3 p-3 md:p-4 rounded-lg border bg-card hover:bg-muted/30 transition-colors cursor-pointer"
            onClick={() => navigate('/insights')}
          >
            <div className="p-1.5 md:p-2 rounded-full bg-primary/10 text-primary flex-shrink-0">
              {insight.icon}
            </div>
            <div className="flex-1 space-y-1 md:space-y-2 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h4 className="font-medium text-xs md:text-sm truncate">{insight.title}</h4>
                <Badge variant="secondary" className="text-xs flex-shrink-0">
                  {insight.confidence}%
                </Badge>
              </div>
              <p className="text-xs md:text-sm text-muted-foreground line-clamp-2">
                {insight.description}
              </p>
              <div className="flex items-center gap-2">
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                    style={{ width: `${insight.confidence}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground min-w-fit hidden md:inline">
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