import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Brain, ArrowLeft, Users, Calendar } from "lucide-react";
import { useInsight } from "@/hooks/useInsights";
import { formatDistanceToNow, format } from "date-fns";

const InsightDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: insight, isLoading } = useInsight(id!);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500 text-white';
      case 'high': return 'bg-orange-500 text-white';
      case 'medium': return 'bg-yellow-500 text-black';
      case 'low': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (!insight) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/insights')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Insights
          </Button>
        </div>
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">Insight not found</p>
          </CardContent>
        </Card>
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
          onClick={() => navigate('/insights')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Insights
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Brain className="h-8 w-8 text-primary" />
            Insight Details
          </h1>
          <p className="text-muted-foreground mt-2">Detailed AI insight analysis</p>
        </div>
      </div>

      {/* Insight Detail */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3 flex-wrap">
              <Badge className={getSeverityColor(insight.severity || 'medium')}>
                {insight.severity || 'medium'} severity
              </Badge>
              <Badge variant="outline">{insight.category || 'General'}</Badge>
              {insight.status === 'resolved' && (
                <Badge variant="secondary">Resolved</Badge>
              )}
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-green-600">
                {Math.round((insight.confidence_score || 0) * 100)}% confidence
              </p>
              <p className="text-xs text-muted-foreground">
                {insight.created_at && formatDistanceToNow(new Date(insight.created_at), { addSuffix: true })}
              </p>
            </div>
          </div>
          <CardTitle className="text-xl mt-4">{insight.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Brain className="h-4 w-4" />
              Description
            </h3>
            <p className="text-muted-foreground">{insight.description}</p>
          </div>
          
          {insight.patients && (
            <div className="p-4 rounded-lg bg-muted/30">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Users className="h-4 w-4" />
                Patient Information
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Name</p>
                  <p className="font-medium">
                    {insight.patients.first_name} {insight.patients.last_name}
                  </p>
                </div>
                {insight.patients.date_of_birth && (
                  <div>
                    <p className="text-muted-foreground">Date of Birth</p>
                    <p className="font-medium">
                      {format(new Date(insight.patients.date_of_birth), 'MMM dd, yyyy')}
                    </p>
                  </div>
                )}
                {insight.patients.medical_record_number && (
                  <div>
                    <p className="text-muted-foreground">MRN</p>
                    <p className="font-medium">{insight.patients.medical_record_number}</p>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {insight.recommended_actions && insight.recommended_actions.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Recommended Actions</h3>
              <ul className="space-y-2">
                {insight.recommended_actions.map((action, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">{action}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {insight.resolved_at && (
            <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/10">
              <p className="text-sm text-green-700 dark:text-green-400">
                Resolved on {format(new Date(insight.resolved_at), 'MMM dd, yyyy HH:mm')}
              </p>
            </div>
          )}
          
          <div className="flex gap-3 pt-4 flex-wrap">
            {insight.patient_id && (
              <Button onClick={() => navigate(`/patient-chart/${insight.patient_id}`)}>
                <Users className="h-4 w-4 mr-2" />
                View Patient Chart
              </Button>
            )}
            <Button variant="outline" onClick={() => navigate('/schedule')}>
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Follow-up
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InsightDetail;