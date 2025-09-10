import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  Activity, 
  Calendar,
  BarChart3,
  Package,
  Settings,
  HeartHandshake,
  Brain,
  UserRoundCheck,
  Building2,
  Pill,
  Microscope,
  Database,
  Bell,
  AlertTriangle
} from "lucide-react";

interface NavItem {
  label: string;
  icon: React.ReactNode;
  href: string;
  badge?: number;
  active?: boolean;
}

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    icon: <LayoutDashboard className="h-4 w-4" />,
    href: "/",
    active: true
  },
  {
    label: "Patients",
    icon: <Users className="h-4 w-4" />,
    href: "/patients",
    badge: 23
  },
  {
    label: "Analytics",
    icon: <BarChart3 className="h-4 w-4" />,
    href: "/analytics"
  },
  {
    label: "AI Insights",
    icon: <Brain className="h-4 w-4" />,
    href: "/insights",
    badge: 5
  },
  {
    label: "Emergency Department",
    icon: <Activity className="h-4 w-4" />,
    href: "/emergency"
  },
  {
    label: "Hot-Spotter Teams",
    icon: <UserRoundCheck className="h-4 w-4" />,
    href: "/hot-spotters",
    badge: 3
  },
  {
    label: "Medical Homes",
    icon: <Building2 className="h-4 w-4" />,
    href: "/medical-homes"
  },
  {
    label: "Care Teams",
    icon: <HeartHandshake className="h-4 w-4" />,
    href: "/teams"
  },
  {
    label: "Pharmacy AI",
    icon: <Pill className="h-4 w-4" />,
    href: "/pharmacy-ai",
    badge: 2
  },
  {
    label: "Drug Utilization",
    icon: <Microscope className="h-4 w-4" />,
    href: "/drug-utilization"
  },
  {
    label: "FHIR Integration",
    icon: <Database className="h-4 w-4" />,
    href: "/fhir"
  },
  {
    label: "Inventory",
    icon: <Package className="h-4 w-4" />,
    href: "/inventory"
  },
  {
    label: "Schedule",
    icon: <Calendar className="h-4 w-4" />,
    href: "/schedule"
  },
  {
    label: "Notifications",
    icon: <Bell className="h-4 w-4" />,
    href: "/notifications",
    badge: 8
  },
  {
    label: "Settings",
    icon: <Settings className="h-4 w-4" />,
    href: "/settings"
  }
];

export function NavigationSidebar() {
  const location = useLocation();
  
  const isActive = (href: string) => location.pathname === href;
  
  return (
    <nav className="w-64 border-r bg-card/30 backdrop-blur-sm flex flex-col h-full">
      <div className="p-6 space-y-6 overflow-y-auto flex-1">
        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Main Navigation
          </h3>
          <div className="space-y-1">
            {navItems.slice(0, 5).map((item) => (
              <Button
                key={item.href}
                variant={isActive(item.href) ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3 h-10",
                  isActive(item.href)
                    ? "bg-primary text-primary-foreground shadow-sm" 
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
                asChild
              >
                <Link to={item.href}>
                  {item.icon}
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge && (
                    <Badge 
                      variant={isActive(item.href) ? "secondary" : "outline"} 
                      className="h-5 px-1.5 text-xs"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Care Management
          </h3>
          <div className="space-y-1">
            {navItems.slice(5, 11).map((item) => (
              <Button
                key={item.href}
                variant={isActive(item.href) ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3 h-10",
                  isActive(item.href)
                    ? "bg-primary text-primary-foreground shadow-sm" 
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
                asChild
              >
                <Link to={item.href}>
                  {item.icon}
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge && (
                    <Badge 
                      variant={isActive(item.href) ? "secondary" : "outline"} 
                      className="h-5 px-1.5 text-xs"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            System
          </h3>
          <div className="space-y-1">
            {navItems.slice(11).map((item) => (
              <Button
                key={item.href}
                variant={isActive(item.href) ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3 h-10",
                  isActive(item.href)
                    ? "bg-primary text-primary-foreground shadow-sm" 
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
                asChild
              >
                <Link to={item.href}>
                  {item.icon}
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge && (
                    <Badge 
                      variant={isActive(item.href) ? "secondary" : "outline"} 
                      className="h-5 px-1.5 text-xs"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}