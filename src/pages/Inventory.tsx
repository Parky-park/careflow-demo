import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AddInventoryItemModal } from "@/components/modals/AddInventoryItemModal";
import { FilterModal } from "@/components/modals/FilterModal";
import { Package, AlertTriangle, TrendingUp, Search, Plus, Filter } from "lucide-react";
import { useState } from "react";

const Inventory = () => {
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Package className="h-8 w-8 text-primary" />
            Inventory Management
          </h1>
          <p className="text-muted-foreground mt-2">
            Track medical supplies and equipment
          </p>
        </div>
        <Button className="gap-2" onClick={() => setShowAddItemModal(true)}>
          <Plus className="h-4 w-4" />
          Add Item
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Inventory Status</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Inventory management content here...</p>
        </CardContent>
      </Card>
      
      <AddInventoryItemModal open={showAddItemModal} onOpenChange={setShowAddItemModal} />
      <FilterModal open={showFilterModal} onOpenChange={setShowFilterModal} type="inventory" />
    </div>
  );
};

export default Inventory;