import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pill, Scan, FileText, CheckCircle, AlertTriangle, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PharmacyAI() {
  const navigate = useNavigate();
  const aiMetrics = [
    { label: "Prescriptions Processed", value: "1,247", icon: FileText },
    { label: "OCR Accuracy", value: "98.5%", icon: Scan },
    { label: "Auto-Validated", value: "89%", icon: CheckCircle },
    { label: "Flagged for Review", value: "23", icon: AlertTriangle },
  ];

  const recentProcessing = [
    {
      id: "RX001",
      patient: "John Smith",
      medication: "Metformin 500mg",
      frequency: "Twice daily",
      status: "Validated",
      confidence: 98,
      processedTime: "2 min ago"
    },
    {
      id: "RX002", 
      patient: "Sarah Johnson",
      medication: "Lisinopril 10mg",
      frequency: "Once daily",
      status: "Needs Review",
      confidence: 73,
      processedTime: "5 min ago"
    },
    {
      id: "RX003",
      patient: "Mike Davis",
      medication: "Atorvastatin 20mg", 
      frequency: "Once daily at bedtime",
      status: "Validated",
      confidence: 95,
      processedTime: "8 min ago"
    },
  ];

  const drugValidation = [
    { drug: "Metformin", interactions: 0, contraindications: 0, status: "Safe" },
    { drug: "Warfarin", interactions: 3, contraindications: 1, status: "Caution" },
    { drug: "Amoxicillin", interactions: 1, contraindications: 0, status: "Safe" },
    { drug: "Hydrochlorothiazide", interactions: 2, contraindications: 0, status: "Monitor" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Validated": return "bg-green-100 text-green-800 border-green-200";
      case "Needs Review": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Error": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getSafetyColor = (status: string) => {
    switch (status) {
      case "Safe": return "bg-green-500 text-white";
      case "Monitor": return "bg-yellow-500 text-black";
      case "Caution": return "bg-red-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 95) return "text-green-600";
    if (confidence >= 85) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h1 className="text-3xl font-bold">Pharmacy AI</h1>
        <p className="text-muted-foreground">
          AI-driven prescription processing with OCR technology and drug validation
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {aiMetrics.map((metric, index) => {
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

      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Prescription Upload
          </CardTitle>
          <CardDescription>Upload prescription images for AI processing</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <Scan className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-lg font-medium mb-2">Drop prescription images here</p>
            <p className="text-muted-foreground mb-4">or click to browse files</p>
            <Button onClick={() => document.getElementById('file-upload')?.click()}>
              <Upload className="h-4 w-4 mr-2" />
              Upload Prescriptions
            </Button>
            <input 
              id="file-upload" 
              type="file" 
              className="hidden" 
              multiple 
              accept="image/*,.pdf"
              onChange={(e) => {
                const files = e.target.files;
                if (files && files.length > 0) {
                  alert(`${files.length} file(s) selected for processing`);
                }
              }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Recent Processing */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Recent Processing
            </CardTitle>
            <CardDescription>Latest AI-processed prescriptions</CardDescription>
          </div>
          <Button variant="outline" onClick={() => navigate('/pharmacy-ai/processing')}>View All</Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentProcessing.map((rx) => (
              <div key={rx.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold">{rx.patient}</h4>
                    <p className="text-sm text-muted-foreground">{rx.id} • {rx.processedTime}</p>
                  </div>
                  <Badge className={getStatusColor(rx.status)} variant="outline">
                    {rx.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Medication</p>
                    <p className="font-medium">{rx.medication}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Frequency</p>
                    <p className="font-medium">{rx.frequency}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">AI Confidence</p>
                    <p className={`font-bold ${getConfidenceColor(rx.confidence)}`}>
                      {rx.confidence}%
                    </p>
                  </div>
                </div>

                <div className="flex justify-end gap-2 mt-4">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => {
                      navigate(`/pharmacy-ai/prescription/${rx.id}`);
                    }}
                  >
                    View Details
                  </Button>
                  {rx.status === "Needs Review" && (
                    <Button 
                      size="sm"
                      onClick={() => {
                        navigate(`/pharmacy-ai/review/${rx.id}`);
                      }}
                    >
                      Review
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Drug Validation Database */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Pill className="h-5 w-5" />
            Drug Validation Database
          </CardTitle>
          <CardDescription>Real-time drug interaction and contraindication checking</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {drugValidation.map((drug, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <Badge className={getSafetyColor(drug.status)}>
                    {drug.status}
                  </Badge>
                  <div>
                    <p className="font-medium">{drug.drug}</p>
                    <p className="text-sm text-muted-foreground">
                      {drug.interactions} interactions • {drug.contraindications} contraindications
                    </p>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => {
                    navigate(`/pharmacy-ai/drugs/${drug.drug.toLowerCase()}`);
                  }}
                >
                  View Details
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Performance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>OCR Accuracy Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Handwritten Prescriptions</span>
                <span className="font-bold text-blue-600">94.2%</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Printed Prescriptions</span>
                <span className="font-bold text-green-600">99.8%</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Overall Accuracy</span>
                <span className="font-bold text-green-600">98.5%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Processing Efficiency</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Average Processing Time</span>
                <span className="font-bold">2.3 seconds</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Auto-Validation Rate</span>
                <span className="font-bold text-green-600">89%</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Error Reduction</span>
                <span className="font-bold text-green-600">76%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}