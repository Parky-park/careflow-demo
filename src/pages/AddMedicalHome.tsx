import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Home } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";

const AddMedicalHome = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);

    try {
      const { error } = await supabase.from("facilities").insert({
        name: formData.get("name") as string,
        facility_type: "medical_home",
        location: formData.get("address") as string || null,
        capacity: parseInt(formData.get("capacity") as string) || 1,
        current_occupancy: parseInt(formData.get("currentPatients") as string) || 0,
        status: "available",
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Medical home added successfully!",
      });

      queryClient.invalidateQueries({ queryKey: ["medical-homes"] });
      navigate('/medical-homes');
    } catch (error: any) {
      console.error("Error adding medical home:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to add medical home. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/medical-homes')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Medical Homes
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Home className="h-8 w-8 text-primary" />
            Add Medical Home
          </h1>
          <p className="text-muted-foreground mt-2">Create a new medical home facility</p>
        </div>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>Medical Home Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Facility Name *</Label>
                <Input id="name" name="name" placeholder="Enter facility name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Specialty Type</Label>
                <Select name="specialtyType">
                  <SelectTrigger>
                    <SelectValue placeholder="Select specialty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="primary-care">Primary Care</SelectItem>
                    <SelectItem value="specialty">Specialty Clinic</SelectItem>
                    <SelectItem value="urgent-care">Urgent Care</SelectItem>
                    <SelectItem value="community-health">Community Health Center</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address *</Label>
              <Input id="address" name="address" placeholder="Enter full address" required />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" name="phone" type="tel" placeholder="(555) 123-4567" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="capacity">Patient Capacity *</Label>
                <Input id="capacity" name="capacity" type="number" placeholder="1000" required min="1" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currentPatients">Current Patients</Label>
                <Input id="currentPatients" name="currentPatients" type="number" placeholder="0" min="0" defaultValue="0" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea id="notes" name="notes" placeholder="Any additional information..." />
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Medical Home"}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate('/medical-homes')}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddMedicalHome;
