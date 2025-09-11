import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { AddPatientModal } from "@/components/modals/AddPatientModal";
import { FilterModal } from "@/components/modals/FilterModal";
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
  }
];

const Patients = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [localSearch, setLocalSearch] = useState("");
  const [showAddPatientModal, setShowAddPatientModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);

  const activeSearch = searchParams.get("search") || localSearch;

  const handleLocalSearch = (value: string) => {
    setLocalSearch(value);
    if (searchParams.get("search")) {
      setSearchParams({});
    }
  };

  const clearSearch = () => {
    setLocalSearch("");
    setSearchParams({});
  };

  const filteredPatients = useMemo(() => {
    if (!activeSearch) return mockPatients;
    
    const query = activeSearch.toLowerCase();
    return mockPatients.filter(patient =>
      patient.name.toLowerCase().includes(query) ||
      patient.mrn.toLowerCase().includes(query) ||
      patient.conditions.some(condition => condition.toLowerCase().includes(query)) ||
      patient.provider.toLowerCase().includes(query) ||
      patient.status.toLowerCase().includes(query)
    );
  }, [activeSearch]);

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
      case 'active': return 'border-green-500 text-green-700';
      case 'inactive': return 'border-gray-500 text-gray-700';
      default: return 'border-gray-500 text-gray-700';
    }
  };

  return (
    <div className="space-y-4 md:space-y-6 p-4 md:p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground flex items-center gap-2 md:gap-3">
            <Users className="h-6 w-6 md:h-8 md:w-8 text-primary flex-shrink-0" />
            <span className="truncate">Patient Registry</span>
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Manage patient records, demographics, and care coordination
          </p>
        </div>
        <Button className="gap-2 w-full md:w-auto" onClick={() => setShowAddPatientModal(true)}>
          <Plus className="h-4 w-4" />
          <span className="sm:inline">Add Patient</span>
        </Button>
      </div>

      <Card>
        <CardContent className="p-4 md:p-6">
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search patients..."
                value={localSearch}
                onChange={(e) => handleLocalSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="gap-2 w-full sm:w-auto" onClick={() => setShowFilterModal(true)}>
              <Filter className="h-4 w-4" />
              <span>Filters</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="px-4 md:px-6">
          <CardTitle className="text-lg md:text-xl">Patients ({filteredPatients.length})</CardTitle>
        </CardHeader>
        <CardContent className="px-4 md:px-6">
          <div className="space-y-3 md:space-y-4">
            {filteredPatients.map((patient) => (
              <div key={patient.id} className="flex flex-col lg:flex-row lg:items-center gap-4 p-4 md:p-5 border rounded-lg bg-card hover:bg-muted/50 transition-colors">
                <div className="flex items-start md:items-center gap-4 min-w-0 flex-1">
                  <Avatar className="h-12 w-12 md:h-14 md:w-14 flex-shrink-0">
                    <AvatarFallback className="text-sm md:text-base">{patient.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1 space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="font-semibold text-base md:text-lg leading-tight">{patient.name}</h3>
                        <p className="text-sm md:text-base text-muted-foreground mt-1">
                          {patient.age} years • {patient.mrn}
                        </p>
                      </div>
                      <Badge className={`${getRiskColor(patient.riskLevel)} flex-shrink-0 self-start`} variant="secondary">
                        {patient.riskLevel} risk
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {patient.conditions.map((condition, index) => (
                        <Badge key={index} variant="outline" className="text-xs md:text-sm">
                          {condition}
                        </Badge>
                      ))}
                    </div>
                    <div className="text-sm text-muted-foreground pt-1">
                      <span>Provider: {patient.provider}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 lg:flex-shrink-0 lg:flex-col xl:flex-row">
                  <Button variant="outline" size="sm" className="flex-1 lg:flex-none lg:min-w-[100px]">
                    View Chart
                  </Button>
                  <Button size="sm" className="flex-1 lg:flex-none lg:min-w-[100px]">
                    Schedule
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <AddPatientModal open={showAddPatientModal} onOpenChange={setShowAddPatientModal} />
      <FilterModal open={showFilterModal} onOpenChange={setShowFilterModal} type="patients" />
    </div>
  );
};

export default Patients;