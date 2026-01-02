import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface AddInventoryItemModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddInventoryItemModal({ open, onOpenChange }: AddInventoryItemModalProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    currentStock: "",
    minThreshold: "",
    maxCapacity: "",
    location: "",
    unitCost: "",
    supplier: "",
    barcode: "",
    expirationDate: "",
    description: "",
    storageRequirements: ""
  });

  const createItemMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const { data: result, error } = await supabase
        .from("inventory_items")
        .insert({
          name: data.name,
          category: data.category,
          quantity: parseInt(data.currentStock) || 0,
          reorder_level: parseInt(data.minThreshold) || 50,
          unit_price: parseFloat(data.unitCost) || 0,
          sku: data.barcode || `SKU-${Date.now()}`,
          status: "in_stock"
        })
        .select()
        .single();
      
      if (error) throw error;
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inventory-items"] });
      queryClient.invalidateQueries({ queryKey: ["inventory-metrics"] });
      toast({
        title: "Inventory Item Added",
        description: `${formData.name} has been successfully added to the inventory system.`,
      });
      setFormData({
        name: "",
        category: "",
        currentStock: "",
        minThreshold: "",
        maxCapacity: "",
        location: "",
        unitCost: "",
        supplier: "",
        barcode: "",
        expirationDate: "",
        description: "",
        storageRequirements: ""
      });
      onOpenChange(false);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to add inventory item. Please try again.",
        variant: "destructive",
      });
      console.error("Error adding inventory item:", error);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createItemMutation.mutate(formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle>Add New Inventory Item</DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto px-1">
          <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Item Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="e.g., Ventilator Model X200"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="critical-equipment">Critical Equipment</SelectItem>
                  <SelectItem value="monitoring-equipment">Monitoring Equipment</SelectItem>
                  <SelectItem value="medications">Medications</SelectItem>
                  <SelectItem value="controlled-substances">Controlled Substances</SelectItem>
                  <SelectItem value="ppe">Personal Protective Equipment</SelectItem>
                  <SelectItem value="surgical-supplies">Surgical Supplies</SelectItem>
                  <SelectItem value="consumables">Consumables</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="currentStock">Current Stock *</Label>
              <Input
                id="currentStock"
                type="number"
                value={formData.currentStock}
                onChange={(e) => handleInputChange("currentStock", e.target.value)}
                placeholder="0"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="minThreshold">Min Threshold *</Label>
              <Input
                id="minThreshold"
                type="number"
                value={formData.minThreshold}
                onChange={(e) => handleInputChange("minThreshold", e.target.value)}
                placeholder="5"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="maxCapacity">Max Capacity *</Label>
              <Input
                id="maxCapacity"
                type="number"
                value={formData.maxCapacity}
                onChange={(e) => handleInputChange("maxCapacity", e.target.value)}
                placeholder="50"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Storage Location *</Label>
              <Select value={formData.location} onValueChange={(value) => handleInputChange("location", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="icu-storage">ICU Storage</SelectItem>
                  <SelectItem value="equipment-room-a">Equipment Room A</SelectItem>
                  <SelectItem value="equipment-room-b">Equipment Room B</SelectItem>
                  <SelectItem value="pharmacy">Pharmacy</SelectItem>
                  <SelectItem value="pharmacy-vault">Pharmacy Vault</SelectItem>
                  <SelectItem value="pharmacy-refrigerator">Pharmacy Refrigerator</SelectItem>
                  <SelectItem value="ppe-storage">PPE Storage</SelectItem>
                  <SelectItem value="surgical-storage">Surgical Storage</SelectItem>
                  <SelectItem value="central-supply">Central Supply</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="unitCost">Unit Cost ($)</Label>
              <Input
                id="unitCost"
                type="number"
                step="0.01"
                value={formData.unitCost}
                onChange={(e) => handleInputChange("unitCost", e.target.value)}
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="supplier">Supplier</Label>
              <Input
                id="supplier"
                value={formData.supplier}
                onChange={(e) => handleInputChange("supplier", e.target.value)}
                placeholder="Supplier name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="barcode">Barcode/SKU</Label>
              <Input
                id="barcode"
                value={formData.barcode}
                onChange={(e) => handleInputChange("barcode", e.target.value)}
                placeholder="123456789"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="expirationDate">Expiration Date (if applicable)</Label>
            <Input
              id="expirationDate"
              type="date"
              value={formData.expirationDate}
              onChange={(e) => handleInputChange("expirationDate", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Detailed description of the item, specifications, model numbers, etc."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="storageRequirements">Storage Requirements</Label>
            <Textarea
              id="storageRequirements"
              value={formData.storageRequirements}
              onChange={(e) => handleInputChange("storageRequirements", e.target.value)}
              placeholder="Temperature requirements, special handling instructions, etc."
              rows={2}
            />
          </div>

            <div className="flex gap-2 pt-4 flex-shrink-0">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={createItemMutation.isPending}>
                {createItemMutation.isPending ? "Adding..." : "Add Item"}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}