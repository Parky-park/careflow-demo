import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell, Search, Settings, MessageCircle, LogOut, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useBadgeCounts } from "@/hooks/useBadgeCounts";

export function DashboardHeader() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { data: badgeCounts } = useBadgeCounts();

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
      <div className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4">
        <div className="flex items-center gap-2 md:gap-4">
          <SidebarTrigger className="md:hidden" />
          <Link to="/dashboard" className="flex items-center gap-2 md:gap-3 hover:opacity-80 transition-opacity">
            <div className="p-1.5 md:p-2 rounded-lg bg-gradient-to-br from-primary to-accent">
              <div className="w-5 h-5 md:w-6 md:h-6 bg-white/90 rounded flex items-center justify-center">
                <span className="text-xs font-bold text-primary">CF</span>
              </div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg md:text-xl font-bold text-foreground">CareFlow Dashboard</h1>
              <p className="text-xs md:text-sm text-muted-foreground">Healthcare Management System</p>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2">
                <Search className="h-4 w-4" />
                <span className="hidden sm:inline">Search</span>
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
                {badgeCounts && badgeCounts.messages > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs bg-accent flex items-center justify-center">
                    {badgeCounts.messages}
                  </Badge>
                )}
              </Link>
            </Button>

            <Button 
              variant="ghost" 
              size="sm" 
              className="relative" 
              asChild
            >
              <Link to="/notifications">
                <Bell className="h-4 w-4" />
                {badgeCounts && badgeCounts.notifications > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs bg-destructive flex items-center justify-center">
                    {badgeCounts.notifications}
                  </Badge>
                )}
              </Link>
            </Button>

            <Button variant="ghost" size="sm" asChild>
              <Link to="/settings">
                <Settings className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="flex items-center gap-2 md:gap-3 pl-2 md:pl-4 border-l">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 md:gap-3 hover:opacity-80 transition-opacity">
                  <div className="text-right hidden md:block">
                    <p className="text-sm font-medium">
                      {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'}
                    </p>
                    <p className="text-xs text-muted-foreground">Healthcare Provider</p>
                  </div>
                  <Avatar className="h-7 w-7 md:h-8 md:w-8">
                    <AvatarImage src={`https://api.dicebear.com/7.x/personas/svg?seed=${user?.id}`} />
                    <AvatarFallback>
                      {(user?.user_metadata?.full_name || user?.email || 'U')[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/settings')}>
                  <User className="mr-2 h-4 w-4" />
                  Profile Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut} className="text-destructive focus:text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}