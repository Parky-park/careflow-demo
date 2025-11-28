import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { AddInventoryItemModal } from "@/components/modals/AddInventoryItemModal";
import { FilterModal } from "@/components/modals/FilterModal";
import { Package, AlertTriangle, TrendingUp, Search, Plus, Filter } from "lucide-react";
import { useState } from "react";
import { useInventoryItems, useInventoryMetrics } from "@/hooks/useInventory";

const Inventory = () => {
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const { data: items, isLoading } = useInventoryItems();
  const { data: metrics } = useInventoryMetrics();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-20 w-full" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </div>
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  const getStatusBadge = (item: any) => {
    if (item.quantity <= item.reorder_level) {
      return <Badge variant="destructive">Low Stock</Badge>;
    }
    return <Badge variant="secondary">In Stock</Badge>;
  };

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
                <p className="text-2xl font-bold">{metrics?.totalItems || 0}</p>
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
                <p className="text-2xl font-bold text-red-600">{metrics?.lowStockItems || 0}</p>
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
                <p className="text-2xl font-bold">
                  {metrics?.totalValue ? `$${(metrics.totalValue / 1000).toFixed(0)}K` : "—"}
                </p>
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
          {items && items.length > 0 ? (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="border rounded-lg p-4 flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">SKU: {item.sku}</p>
                    <div className="flex gap-2 mt-2">
                      <Badge variant="outline">Qty: {item.quantity}</Badge>
                      {getStatusBadge(item)}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${(item.quantity * Number(item.unit_price)).toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground">Unit: ${Number(item.unit_price).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No inventory items found</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Add your first inventory item to get started
              </p>
              <Button onClick={() => setShowAddItemModal(true)}>
                Add Item
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      
      <AddInventoryItemModal open={showAddItemModal} onOpenChange={setShowAddItemModal} />
      <FilterModal open={showFilterModal} onOpenChange={setShowFilterModal} type="inventory" />
    </div>
  );
};

export default Inventory;