import { Activity, Users, Brain, Stethoscope, Pill, Database, ShoppingCart, Calendar, Settings, Bell, Home, UserRoundCheck, Building2, Microscope } from "lucide-react"
import { NavLink } from "react-router-dom"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const items = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Patients", url: "/patients", icon: Users },
  { title: "Emergency Department", url: "/emergency", icon: Activity },
  { title: "Hot-Spotter Teams", url: "/hot-spotters", icon: UserRoundCheck },
  { title: "Medical Homes", url: "/medical-homes", icon: Building2 },
  { title: "AI Insights", url: "/insights", icon: Brain },
  { title: "Pharmacy AI", url: "/pharmacy-ai", icon: Pill },
  { title: "Drug Utilization", url: "/drug-utilization", icon: Microscope },
  { title: "FHIR Integration", url: "/fhir", icon: Database },
  { title: "Care Teams", url: "/teams", icon: Stethoscope },
  { title: "Inventory", url: "/inventory", icon: ShoppingCart },
  { title: "Schedule", url: "/schedule", icon: Calendar },
  { title: "Analytics", url: "/analytics", icon: Activity },
  { title: "Notifications", url: "/notifications", icon: Bell },
  { title: "Settings", url: "/settings", icon: Settings },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>CareFlow Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url}
                      className={({ isActive }) => 
                        isActive 
                          ? "flex items-center gap-2 bg-primary text-primary-foreground" 
                          : "flex items-center gap-2 hover:bg-accent hover:text-accent-foreground"
                      }
                      end={item.url === "/"}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}