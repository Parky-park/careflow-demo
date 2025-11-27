import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Brain, Zap, TrendingUp, Target, Lightbulb, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useInsights, useInsightMetrics } from "@/hooks/useInsights";
import { formatDistanceToNow } from "date-fns";

const AIInsights = () => {
  const navigate = useNavigate();
  const { data: insights, isLoading: insightsLoading } = useInsights('active');
  const { data: metrics, isLoading: metricsLoading } = useInsightMetrics();

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500 text-white';
      case 'high': return 'bg-orange-500 text-white';
      case 'medium': return 'bg-yellow-500 text-black';
      case 'low': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return 'text-green-600';
    if (confidence >= 0.75) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (insightsLoading || metricsLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-24 w-full" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      </div>
    );
  }

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
                <p className="text-2xl font-bold text-primary">{metrics?.insightsThisWeek || 0}</p>
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
                <p className="text-2xl font-bold text-green-600">
                  {metrics?.predictionAccuracy ? `${metrics.predictionAccuracy}%` : '—'}
                </p>
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
                <p className="text-sm font-medium">Active Insights</p>
                <p className="text-2xl font-bold text-primary">{metrics?.activePredictions || 0}</p>
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
                <p className="text-sm font-medium">Total Insights</p>
                <p className="text-2xl font-bold text-primary">{metrics?.totalInsights || 0}</p>
                <p className="text-xs text-muted-foreground">All Time</p>
              </div>
              <Brain className="h-8 w-8 text-primary" />
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
          {insights && insights.length > 0 ? (
            <div className="space-y-4">
              {insights.map((insight) => (
                <div key={insight.id} className="border rounded-lg p-4 hover:bg-accent/5 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3 flex-wrap">
                      <Badge className={getSeverityColor(insight.severity || 'medium')}>
                        {insight.severity || 'medium'} severity
                      </Badge>
                      <Badge variant="outline">{insight.category || 'General'}</Badge>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-bold ${getConfidenceColor(insight.confidence_score || 0)}`}>
                        {Math.round((insight.confidence_score || 0) * 100)}% confidence
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {insight.created_at && formatDistanceToNow(new Date(insight.created_at), { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                  
                  <h3 className="font-semibold mb-2">{insight.title}</h3>
                  <p className="text-muted-foreground text-sm mb-3">{insight.description}</p>
                  
                  {insight.patients && (
                    <p className="text-xs text-muted-foreground mb-3">
                      Patient: {insight.patients.first_name} {insight.patients.last_name}
                    </p>
                  )}
                  
                  <div className="flex gap-2">
                    <Button 
                      size="sm"
                      onClick={() => {
                        if (insight.patient_id) {
                          navigate(`/patient-chart/${insight.patient_id}`);
                        } else {
                          navigate('/patients');
                        }
                      }}
                    >
                      View Patient
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => navigate(`/insights/${insight.id}`)}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="p-4 rounded-full bg-muted/30 mb-4">
                <Brain className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-sm font-medium text-foreground mb-1">No Active Insights</p>
              <p className="text-xs text-muted-foreground max-w-xs">
                AI insights will appear here as they are generated from patient data and system analytics
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AIInsights;