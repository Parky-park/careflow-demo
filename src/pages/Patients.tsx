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
      case 'high': return 'bg-red-500 text-white';
      case 'medium': return 'bg-yellow-500 text-black';
      case 'low': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
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
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground flex items-center gap-2 md:gap-3">
            <Users className="h-6 w-6 md:h-8 md:w-8 text-primary" />
            Patient Registry
          </h1>
          <p className="text-sm md:text-base text-muted-foreground mt-1 md:mt-2">
            Manage patient records, demographics, and care coordination
          </p>
        </div>
        <Button className="gap-2 self-start sm:self-auto" onClick={() => setShowAddPatientModal(true)}>
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Add Patient</span>
          <span className="sm:hidden">Add</span>
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
            <Button variant="outline" className="gap-2 flex-shrink-0" onClick={() => setShowFilterModal(true)}>
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">Filters</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Patients ({filteredPatients.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <div className="space-y-3 md:space-y-4">
            {filteredPatients.map((patient) => (
              <div key={patient.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 md:p-4 border rounded-lg gap-3 sm:gap-4">
                <div className="flex items-center gap-3 md:gap-4 min-w-0 flex-1">
                  <Avatar className="h-10 w-10 md:h-12 md:w-12 flex-shrink-0">
                    <AvatarFallback className="text-sm">{patient.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                      <h3 className="font-semibold text-sm md:text-base truncate">{patient.name}</h3>
                      <Badge className={`${getRiskColor(patient.riskLevel)} text-xs flex-shrink-0 self-start sm:self-auto`}>
                        {patient.riskLevel} risk
                      </Badge>
                    </div>
                    <p className="text-xs md:text-sm text-muted-foreground mt-1">
                      {patient.age} years • {patient.mrn}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-1 sm:hidden">
                      {patient.conditions.slice(0, 2).map((condition, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {condition}
                        </Badge>
                      ))}
                      {patient.conditions.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{patient.conditions.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="hidden sm:flex flex-wrap gap-1 max-w-48">
                    {patient.conditions.map((condition, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {condition}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0 self-end sm:self-auto">
                  <Button variant="outline" size="sm" className="text-xs">
                    <span className="hidden sm:inline">View Chart</span>
                    <span className="sm:hidden">View</span>
                  </Button>
                  <Button size="sm" className="text-xs">Schedule</Button>
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