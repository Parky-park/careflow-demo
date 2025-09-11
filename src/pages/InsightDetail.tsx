import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, ArrowLeft, TrendingUp, AlertTriangle, Users } from "lucide-react";

const InsightDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock insight data - in real app this would come from API
  const insight = {
    id: id,
    type: "Risk Prediction",
    title: "High Readmission Risk Identified",
    description: "Sarah Johnson (67y) shows 87% probability of 30-day readmission based on medication adherence patterns and recent vitals.",
    confidence: 87,
    priority: "high",
    timestamp: "2 hours ago",
    details: "Based on analysis of patient medication adherence (45% over past 30 days), recent vitals showing irregular patterns, and historical readmission data from similar patient profiles.",
    recommendations: [
      "Schedule follow-up appointment within 48 hours",
      "Implement medication reminder system",
      "Assign care coordinator for daily check-ins"
    ]
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500 text-white';
      case 'medium': return 'bg-yellow-500 text-black';
      case 'low': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

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
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Badge className={getPriorityColor(insight.priority)}>
                {insight.priority} priority
              </Badge>
              <Badge variant="outline">{insight.type}</Badge>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-green-600">
                {insight.confidence}% confidence
              </p>
              <p className="text-xs text-muted-foreground">{insight.timestamp}</p>
            </div>
          </div>
          <CardTitle className="text-xl mt-4">{insight.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-muted-foreground">{insight.description}</p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Detailed Analysis</h3>
            <p className="text-muted-foreground">{insight.details}</p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Recommendations</h3>
            <ul className="space-y-2">
              {insight.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                  <span className="text-muted-foreground">{rec}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex gap-3 pt-4">
            <Button onClick={() => navigate('/patients')}>
              <Users className="h-4 w-4 mr-2" />
              View Patient
            </Button>
            <Button variant="outline" onClick={() => navigate('/schedule')}>
              Schedule Follow-up
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InsightDetail;