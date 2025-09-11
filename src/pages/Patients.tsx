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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Users className="h-8 w-8 text-primary" />
            Patient Registry
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage patient records, demographics, and care coordination
          </p>
        </div>
        <Button className="gap-2" onClick={() => setShowAddPatientModal(true)}>
          <Plus className="h-4 w-4" />
          Add Patient
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search patients..."
                value={localSearch}
                onChange={(e) => handleLocalSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="gap-2" onClick={() => setShowFilterModal(true)}>
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Patients ({filteredPatients.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredPatients.map((patient) => (
              <div key={patient.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback>{patient.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{patient.name}</h3>
                    <p className="text-sm text-muted-foreground">{patient.age} years • {patient.mrn}</p>
                  </div>
                  <Badge className={getRiskColor(patient.riskLevel)}>{patient.riskLevel} risk</Badge>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">View Chart</Button>
                  <Button size="sm">Schedule</Button>
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