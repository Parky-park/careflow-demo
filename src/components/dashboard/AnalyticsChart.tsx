import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Activity, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

export function AnalyticsChart() {
  const navigate = useNavigate();
  
  const { data: insights, isLoading } = useQuery({
    queryKey: ['dashboard-insights'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ai_insights')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(3);
      
      if (error) throw error;
      return data || [];
    },
  });

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
      case 'high':
        return <TrendingUp className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const getConfidenceScore = (score: number) => {
    return Math.round(score * 100);
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>AI-Driven Insights</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </CardContent>
      </Card>
    );
  }

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
        {insights && insights.length > 0 ? (
          insights.map((insight) => {
            const confidenceScore = getConfidenceScore(insight.confidence_score);
            
            return (
              <div 
                key={insight.id} 
                className="flex items-start gap-2 md:gap-3 p-3 md:p-4 rounded-lg border bg-card hover:bg-muted/30 transition-colors cursor-pointer"
                onClick={() => navigate(`/insights/${insight.id}`)}
              >
                <div className="p-1.5 md:p-2 rounded-full bg-primary/10 text-primary flex-shrink-0">
                  {getSeverityIcon(insight.severity)}
                </div>
                <div className="flex-1 space-y-1 md:space-y-2 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-medium text-xs md:text-sm truncate">{insight.title}</h4>
                    <Badge variant="secondary" className="text-xs flex-shrink-0">
                      {confidenceScore}%
                    </Badge>
                  </div>
                  <p className="text-xs md:text-sm text-muted-foreground line-clamp-2">
                    {insight.description}
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                        style={{ width: `${confidenceScore}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground min-w-fit hidden md:inline">
                      {confidenceScore}%
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <p className="text-sm">No active insights at this time</p>
            <button 
              onClick={() => navigate('/insights')}
              className="mt-4 text-sm text-primary hover:underline"
            >
              View All Insights
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}