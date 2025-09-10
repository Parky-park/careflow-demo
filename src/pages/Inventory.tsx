import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { NavigationSidebar } from "@/components/dashboard/NavigationSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Package, AlertTriangle, TrendingUp, Search, Plus, Filter } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const { toast } = useToast();
  const inventoryItems = [
    {
      id: "1",
      name: "Ventilators", 
      category: "Critical Equipment",
      currentStock: 12,
      minThreshold: 8,
      maxCapacity: 20,
      location: "ICU Storage",
      status: "adequate",
      lastUpdated: "2 hours ago",
      predictedDemand: "+15% next week"
    },
    {
      id: "2",
      name: "Cardiac Monitors",
      category: "Monitoring Equipment", 
      currentStock: 3,
      minThreshold: 5,
      maxCapacity: 15,
      location: "Equipment Room A",
      status: "low",
      lastUpdated: "1 hour ago",
      predictedDemand: "+8% next week"
    },
    {
      id: "3",
      name: "Morphine 10mg/ml",
      category: "Controlled Substances",
      currentStock: 47,
      minThreshold: 20,
      maxCapacity: 100,
      location: "Pharmacy Vault",
      status: "adequate", 
      lastUpdated: "30 min ago",
      predictedDemand: "+5% next week"
    },
    {
      id: "4",
      name: "Insulin (Rapid-Acting)",
      category: "Medications",
      currentStock: 8,
      minThreshold: 15,
      maxCapacity: 50,
      location: "Pharmacy Refrigerator",
      status: "critical",
      lastUpdated: "15 min ago",
      predictedDemand: "+12% next week"
    },
    {
      id: "5",
      name: "Surgical Masks N95",
      category: "PPE",
      currentStock: 2847,
      minThreshold: 1000,
      maxCapacity: 5000,
      location: "PPE Storage",
      status: "adequate",
      lastUpdated: "4 hours ago",
      predictedDemand: "+3% next week"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'bg-destructive text-destructive-foreground';
      case 'low': return 'bg-warning text-warning-foreground';
      case 'adequate': return 'bg-success text-success-foreground';
      case 'overstocked': return 'bg-accent text-accent-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStockPercentage = (current: number, max: number) => {
    return Math.min((current / max) * 100, 100);
  };

  const getStockColor = (current: number, min: number, max: number) => {
    const percentage = (current / max) * 100;
    const minPercentage = (min / max) * 100;
    
    if (current < min) return 'bg-destructive';
    if (percentage < minPercentage + 10) return 'bg-warning';
    return 'bg-success';
  };

  return (
    <div className="h-screen bg-gradient-to-br from-background via-background to-muted/20 flex flex-col">
      <DashboardHeader />
      
      <div className="flex flex-1 overflow-hidden">
        <NavigationSidebar />
        
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
                  <Package className="h-8 w-8 text-primary" />
                  Inventory Management
                </h1>
                <p className="text-muted-foreground mt-2">
                  AI-powered inventory tracking and predictive analytics
                </p>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="gap-2"
                  onClick={() => {
                    toast({
                      title: "Filters",
                      description: "Opening advanced filter options..."
                    });
                  }}
                >
                  <Filter className="h-4 w-4" />
                  Filters
                </Button>
                <Button 
                  className="gap-2"
                  onClick={() => {
                    toast({
                      title: "Add New Item",
                      description: "Opening inventory item creation form..."
                    });
                  }}
                >
                  <Plus className="h-4 w-4" />
                  Add Item
                </Button>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="border-l-4 border-l-destructive">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Critical Items</p>
                      <p className="text-2xl font-bold text-destructive">3</p>
                    </div>
                    <AlertTriangle className="h-8 w-8 text-destructive" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-warning">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Low Stock</p>
                      <p className="text-2xl font-bold text-warning">7</p>
                    </div>
                    <Package className="h-8 w-8 text-warning" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-success">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Items</p>
                      <p className="text-2xl font-bold text-success">247</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-success" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-primary">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Value</p>
                      <p className="text-2xl font-bold text-primary">$2.4M</p>
                    </div>
                    <Package className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Search and Filters */}
            <Card>
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search inventory by name, category, or location..."
                      className="pl-10"
                    />
                  </div>
                  <Button variant="outline">
                    Category: All
                  </Button>
                  <Button variant="outline">
                    Status: All
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Inventory List */}
            <Card>
              <CardHeader>
                <CardTitle>Inventory Items ({inventoryItems.length} total)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {inventoryItems.map((item) => (
                    <div key={item.id} className="p-4 rounded-lg border bg-card hover:bg-muted/30 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-medium text-lg">{item.name}</h3>
                            <Badge variant="secondary">{item.category}</Badge>
                            <Badge className={getStatusColor(item.status)}>
                              {item.status}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground">Current Stock</p>
                              <p className="font-medium">{item.currentStock}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Min Threshold</p>
                              <p className="font-medium">{item.minThreshold}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Max Capacity</p>
                              <p className="font-medium">{item.maxCapacity}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Location</p>
                              <p className="font-medium">{item.location}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Reorder
                          </Button>
                          <Button variant="outline" size="sm">
                            Details
                          </Button>
                        </div>
                      </div>
                      
                      {/* Stock Level Visualization */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Stock Level</span>
                          <span className="font-medium">
                            {getStockPercentage(item.currentStock, item.maxCapacity).toFixed(1)}%
                          </span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all ${getStockColor(item.currentStock, item.minThreshold, item.maxCapacity)}`}
                            style={{ width: `${getStockPercentage(item.currentStock, item.maxCapacity)}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Min: {item.minThreshold}</span>
                          <span>Max: {item.maxCapacity}</span>
                        </div>
                      </div>
                      
                      {/* AI Predictions */}
                      <div className="mt-3 p-3 bg-muted/30 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-accent" />
                            <span className="text-sm font-medium">AI Prediction:</span>
                            <span className="text-sm text-muted-foreground">{item.predictedDemand}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            Updated {item.lastUpdated}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Inventory;