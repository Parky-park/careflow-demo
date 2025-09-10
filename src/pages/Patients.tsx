import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { NavigationSidebar } from "@/components/dashboard/NavigationSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Users, Search, Filter, Plus, AlertTriangle, Heart, Clock, X } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";

const mockPatients = [
  {
    id: "1",
    name: "Sarah Johnson",
    age: 67,
    mrn: "MRN-001234",
    riskLevel: "high",
    lastVisit: "2024-01-08",
    conditions: ["Diabetes", "Hypertension", "COPD"],
    provider: "Dr. Wilson",
    status: "active"
  },
  {
    id: "2",
    name: "Michael Chen", 
    age: 45,
    mrn: "MRN-001235",
    riskLevel: "medium",
    lastVisit: "2024-01-07",
    conditions: ["Asthma"],
    provider: "Dr. Patel",
    status: "active"
  },
  {
    id: "3",
    name: "Emma Rodriguez",
    age: 72,
    mrn: "MRN-001236", 
    riskLevel: "high",
    lastVisit: "2024-01-06",
    conditions: ["Heart Disease", "Diabetes"],
    provider: "Dr. Chen",
    status: "active"
  },
  {
    id: "4",
    name: "James Wilson",
    age: 34,
    mrn: "MRN-001237",
    riskLevel: "low", 
    lastVisit: "2024-01-05",
    conditions: ["Annual Checkup"],
    provider: "Unassigned",
    status: "unattached"
  }
];

const Patients = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [localSearch, setLocalSearch] = useState("");
  
  // Get search query from URL params
  const urlSearch = searchParams.get("search") || "";
  
  // Use URL search if present, otherwise use local search
  const activeSearch = urlSearch || localSearch;
  
  // Initialize local search with URL search on mount
  useEffect(() => {
    if (urlSearch) {
      setLocalSearch(urlSearch);
    }
  }, [urlSearch]);

  // Filter patients based on search query
  const filteredPatients = useMemo(() => {
    if (!activeSearch.trim()) return mockPatients;
    
    const query = activeSearch.toLowerCase();
    return mockPatients.filter(patient => 
      patient.name.toLowerCase().includes(query) ||
      patient.mrn.toLowerCase().includes(query) ||
      patient.conditions.some(condition => condition.toLowerCase().includes(query)) ||
      patient.provider.toLowerCase().includes(query) ||
      patient.status.toLowerCase().includes(query)
    );
  }, [activeSearch]);

  const handleLocalSearch = (value: string) => {
    setLocalSearch(value);
    // Clear URL search params when using local search
    if (urlSearch) {
      setSearchParams({});
    }
  };

  const clearSearch = () => {
    setLocalSearch("");
    setSearchParams({});
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high': return 'bg-destructive text-destructive-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'low': return 'bg-success text-success-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success text-success-foreground';
      case 'unattached': return 'bg-warning text-warning-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <DashboardHeader />
      
      <div className="flex">
        <NavigationSidebar />
        
        <main className="flex-1 p-6">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
                  <Users className="h-8 w-8 text-primary" />
                  Patient Management
                </h1>
                <p className="text-muted-foreground mt-2">
                  Comprehensive patient tracking and care coordination
                </p>
              </div>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Patient
              </Button>
            </div>

            {/* Search and Filters */}
            <Card>
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search patients by name, MRN, or condition..."
                      className="pl-10"
                      value={localSearch}
                      onChange={(e) => handleLocalSearch(e.target.value)}
                    />
                    {activeSearch && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                        onClick={clearSearch}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" />
                    Filters
                  </Button>
                </div>
                
                {activeSearch && (
                  <div className="mt-4 flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      Search results for:
                    </span>
                    <Badge variant="secondary" className="gap-2">
                      "{activeSearch}"
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0 hover:bg-transparent"
                        onClick={clearSearch}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                    {urlSearch && (
                      <span className="text-xs text-muted-foreground">
                        (from search)
                      </span>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Patient List */}
            <Card>
              <CardHeader>
                <CardTitle>
                  Patient Registry ({filteredPatients.length} 
                  {activeSearch ? ` of ${mockPatients.length}` : ''} patients)
                  {activeSearch && filteredPatients.length === 0 && (
                    <span className="text-muted-foreground font-normal ml-2">
                      - No results found
                    </span>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {filteredPatients.length === 0 ? (
                  <div className="text-center py-8">
                    <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No patients found</h3>
                    <p className="text-muted-foreground">
                      {activeSearch ? 
                        `No patients match "${activeSearch}". Try adjusting your search terms.` :
                        "No patients in the registry yet."
                      }
                    </p>
                    {activeSearch && (
                      <Button variant="outline" onClick={clearSearch} className="mt-4">
                        Clear search
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredPatients.map((patient) => (
                    <div key={patient.id} className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-muted/30 transition-colors">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={`https://api.dicebear.com/7.x/personas/svg?seed=${patient.name}`} />
                          <AvatarFallback>
                            {patient.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <h3 className="font-medium text-lg">{patient.name}</h3>
                            <Badge variant="secondary">{patient.age}y</Badge>
                            <Badge variant="outline">{patient.mrn}</Badge>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <Badge className={getRiskColor(patient.riskLevel)}>
                              {patient.riskLevel === 'high' && <AlertTriangle className="h-3 w-3 mr-1" />}
                              {patient.riskLevel === 'medium' && <Clock className="h-3 w-3 mr-1" />}
                              {patient.riskLevel === 'low' && <Heart className="h-3 w-3 mr-1" />}
                              {patient.riskLevel} risk
                            </Badge>
                            <Badge className={getStatusColor(patient.status)}>
                              {patient.status}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>Conditions: {patient.conditions.join(', ')}</span>
                            <span>•</span>
                            <span>Provider: {patient.provider}</span>
                            <span>•</span>
                            <span>Last visit: {patient.lastVisit}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          View Chart
                        </Button>
                        <Button variant="outline" size="sm">
                          Schedule
                        </Button>
                      </div>
                    </div>
                   ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Patients;