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

      <div className="flex gap-4 mb-6">
        <div className="flex-1">
          <Input
            placeholder="Search inventory items..."
            className="max-w-sm"
          />
        </div>
        <Button variant="outline" onClick={() => setShowFilterModal(true)}>
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Items</p>
                <p className="text-2xl font-bold">1,247</p>
              </div>
              <Package className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Low Stock</p>
                <p className="text-2xl font-bold text-red-600">23</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Value</p>
                <p className="text-2xl font-bold">$342K</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Inventory Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border rounded-lg p-4 flex items-center justify-between">
              <div>
                <h4 className="font-medium">Surgical Masks (N95)</h4>
                <p className="text-sm text-muted-foreground">SKU: MSK-N95-001</p>
                <div className="flex gap-2 mt-2">
                  <Badge variant="outline">Qty: 150</Badge>
                  <Badge variant="destructive">Low Stock</Badge>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">$2,450</p>
                <p className="text-sm text-muted-foreground">Unit: $16.33</p>
              </div>
            </div>
            <div className="border rounded-lg p-4 flex items-center justify-between">
              <div>
                <h4 className="font-medium">Disposable Syringes</h4>
                <p className="text-sm text-muted-foreground">SKU: SYR-DSP-002</p>
                <div className="flex gap-2 mt-2">
                  <Badge variant="outline">Qty: 2,500</Badge>
                  <Badge variant="secondary">In Stock</Badge>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">$1,875</p>
                <p className="text-sm text-muted-foreground">Unit: $0.75</p>
              </div>
            </div>
            <div className="border rounded-lg p-4 flex items-center justify-between">
              <div>
                <h4 className="font-medium">Blood Pressure Monitor</h4>
                <p className="text-sm text-muted-foreground">SKU: BPM-DIG-003</p>
                <div className="flex gap-2 mt-2">
                  <Badge variant="outline">Qty: 45</Badge>
                  <Badge variant="secondary">In Stock</Badge>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">$13,500</p>
                <p className="text-sm text-muted-foreground">Unit: $300.00</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <AddInventoryItemModal open={showAddItemModal} onOpenChange={setShowAddItemModal} />
      <FilterModal open={showFilterModal} onOpenChange={setShowFilterModal} type="inventory" />
    </div>
  );
};

export default Inventory;