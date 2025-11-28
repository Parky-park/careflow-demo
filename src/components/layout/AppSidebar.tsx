import { Badge } from "@/components/ui/badge";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";
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
  MessageCircle,
  Radio,
} from "lucide-react";
import { useBadgeCounts } from "@/hooks/useBadgeCounts";

interface NavItem {
  label: string;
  icon: React.ReactNode;
  href: string;
  badgeKey?: "patients" | "insights" | "hotSpotters" | "pharmacy" | "messages" | "notifications" | "realtimeFeed";
}

export function AppSidebar() {
  const location = useLocation();
  const { data: badgeCounts } = useBadgeCounts();
  
  const isActive = (href: string) => location.pathname === href;

  const mainNavItems: NavItem[] = [
    {
      label: "Dashboard",
      icon: <LayoutDashboard className="h-4 w-4" />,
      href: "/dashboard",
    },
    {
      label: "Patients",
      icon: <Users className="h-4 w-4" />,
      href: "/patients",
      badgeKey: "patients"
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
      badgeKey: "insights"
    },
    {
      label: "Emergency Department",
      icon: <Activity className="h-4 w-4" />,
      href: "/emergency"
    },
  ];

  const careManagementItems: NavItem[] = [
    {
      label: "Hot-Spotter Teams",
      icon: <UserRoundCheck className="h-4 w-4" />,
      href: "/hot-spotters",
      badgeKey: "hotSpotters"
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
      badgeKey: "pharmacy"
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
  ];

  const systemItems: NavItem[] = [
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
      label: "Messages",
      icon: <MessageCircle className="h-4 w-4" />,
      href: "/messages",
      badgeKey: "messages"
    },
    {
      label: "Notifications",
      icon: <Bell className="h-4 w-4" />,
      href: "/notifications",
      badgeKey: "notifications"
    },
    {
      label: "Realtime Feed",
      icon: <Radio className="h-4 w-4" />,
      href: "/realtime-feed",
      badgeKey: "realtimeFeed"
    },
    {
      label: "Settings",
      icon: <Settings className="h-4 w-4" />,
      href: "/settings"
    }
  ];
  
  return (
    <Sidebar className="border-r bg-card/30 backdrop-blur-sm">
      <SidebarContent className="gap-4 p-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Main Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={isActive(item.href)}
                    className="h-10 px-3"
                  >
                    <Link to={item.href} className="flex items-center gap-3">
                      {item.icon}
                      <span className="flex-1 text-left">{item.label}</span>
                      {item.badgeKey && badgeCounts && badgeCounts[item.badgeKey] > 0 && (
                        <Badge 
                          variant={isActive(item.href) ? "secondary" : "outline"} 
                          className="h-5 px-1.5 text-xs"
                        >
                          {badgeCounts[item.badgeKey]}
                        </Badge>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Care Management
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {careManagementItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={isActive(item.href)}
                    className="h-10 px-3"
                  >
                    <Link to={item.href} className="flex items-center gap-3">
                      {item.icon}
                      <span className="flex-1 text-left">{item.label}</span>
                      {item.badgeKey && badgeCounts && badgeCounts[item.badgeKey] > 0 && (
                        <Badge 
                          variant={isActive(item.href) ? "secondary" : "outline"} 
                          className="h-5 px-1.5 text-xs"
                        >
                          {badgeCounts[item.badgeKey]}
                        </Badge>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            System
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {systemItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={isActive(item.href)}
                    className="h-10 px-3"
                  >
                    <Link to={item.href} className="flex items-center gap-3">
                      {item.icon}
                      <span className="flex-1 text-left">{item.label}</span>
                      {item.badgeKey && badgeCounts && badgeCounts[item.badgeKey] > 0 && (
                        <Badge 
                          variant={isActive(item.href) ? "secondary" : "outline"} 
                          className="h-5 px-1.5 text-xs"
                        >
                          {badgeCounts[item.badgeKey]}
                        </Badge>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}