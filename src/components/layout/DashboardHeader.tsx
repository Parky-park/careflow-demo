import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Bell, Search, Settings, MessageCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export function DashboardHeader() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      
      // Determine which page to navigate to based on search terms
      if (query.includes('patient') || query.includes('john') || query.includes('jane') || query.includes('smith')) {
        navigate(`/patients?search=${encodeURIComponent(searchQuery)}`);
      } else if (query.includes('provider') || query.includes('doctor') || query.includes('dr.') || query.includes('nurse')) {
        navigate(`/teams?search=${encodeURIComponent(searchQuery)}`);
      } else if (query.includes('message') || query.includes('chat') || query.includes('communication')) {
        navigate(`/messages?search=${encodeURIComponent(searchQuery)}`);
      } else if (query.includes('inventory') || query.includes('equipment') || query.includes('medication') || query.includes('supply')) {
        navigate(`/inventory?search=${encodeURIComponent(searchQuery)}`);
      } else if (query.includes('schedule') || query.includes('appointment') || query.includes('calendar')) {
        navigate(`/schedule?search=${encodeURIComponent(searchQuery)}`);
      } else if (query.includes('analytics') || query.includes('report') || query.includes('metric')) {
        navigate(`/analytics?search=${encodeURIComponent(searchQuery)}`);
      } else {
        // Default to patients page for general searches
        navigate(`/patients?search=${encodeURIComponent(searchQuery)}`);
      }
      
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-40">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-accent">
              <div className="w-6 h-6 bg-white/90 rounded flex items-center justify-center">
                <span className="text-xs font-bold text-primary">CF</span>
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">CareFlow Dashboard</h1>
              <p className="text-sm text-muted-foreground">Healthcare Management System</p>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2">
                <Search className="h-4 w-4" />
                Search
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Search CareFlow</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSearch} className="space-y-4">
                <Input
                  placeholder="Search patients, providers, or records..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                  autoFocus
                />
                <div className="flex gap-2 justify-end">
                  <Button type="button" variant="outline" onClick={() => setSearchOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={!searchQuery.trim()}>
                    Search
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="relative" asChild>
              <Link to="/messages">
                <MessageCircle className="h-4 w-4" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs bg-accent">
                  3
                </Badge>
              </Link>
            </Button>

            <Button 
              variant="ghost" 
              size="sm" 
              className="relative" 
              onClick={() => console.log("Notifications clicked")}
            >
              <Bell className="h-4 w-4" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs bg-destructive">
                5
              </Badge>
            </Button>

            <Button variant="ghost" size="sm" asChild>
              <Link to="/settings">
                <Settings className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="flex items-center gap-3 pl-4 border-l">
            <div className="text-right">
              <p className="text-sm font-medium">Dr. Sarah Wilson</p>
              <p className="text-xs text-muted-foreground">Primary Care Provider</p>
            </div>
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://api.dicebear.com/7.x/personas/svg?seed=DrSarahWilson" />
              <AvatarFallback>SW</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
}