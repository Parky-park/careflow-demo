import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Home, MapPin, Phone, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AddMedicalHome = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Success",
      description: "Medical home added successfully!",
    });
    navigate('/medical-homes');
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
                <Label htmlFor="name">Facility Name</Label>
                <Input id="name" placeholder="Enter facility name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Facility Type</Label>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
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
              <Label htmlFor="address">Address</Label>
              <Input id="address" placeholder="Enter full address" required />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" type="tel" placeholder="(555) 123-4567" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="capacity">Patient Capacity</Label>
                <Input id="capacity" type="number" placeholder="1000" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="current-patients">Current Patients</Label>
                <Input id="current-patients" type="number" placeholder="750" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialties">Specialties</Label>
              <Textarea id="specialties" placeholder="List specialties offered..." />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea id="notes" placeholder="Any additional information..." />
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit">Create Medical Home</Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate('/medical-homes')}
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