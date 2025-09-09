import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Search, Settings, MessageCircle } from "lucide-react";

export function DashboardHeader() {
  return (
    <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-40">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-accent">
              <div className="w-6 h-6 bg-white/90 rounded flex items-center justify-center">
                <span className="text-xs font-bold text-primary">CF</span>
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">CareFlow Dashboard</h1>
              <p className="text-sm text-muted-foreground">Healthcare Management System</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="gap-2">
            <Search className="h-4 w-4" />
            Search
          </Button>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="relative">
              <MessageCircle className="h-4 w-4" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs bg-accent">
                3
              </Badge>
            </Button>

            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs bg-destructive">
                5
              </Badge>
            </Button>

            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
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