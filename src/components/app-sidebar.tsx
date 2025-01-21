import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import HeroBrand from "./hero-brand";

// This is sample data.
type NavItem = { title: string; url: string; isActive?: boolean };
type NavGroup = { title: string; url?: string; items: NavItem[] };

const data: { versions: string[]; navMain: NavGroup[] } = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "Quick Links",
      url: "#",
      items: [
        {
          title: "Students",
          url: "#",
        },
        {
          title: "Courses",
          url: "#",
        },
        {
          title: "Fees",
          url: "#",
        },
      ],
    },
    {
      title: "Financials",
      url: "#",
      items: [
        {
          title: "Fees Structure",
          url: "#",
        },
        {
          title: "Fee Reports",
          url: "#",
        },
      ],
    },
    {
      title: "Courses",
      url: "#",
      items: [
        {
          title: "Courses",
          url: "#",
        },
        {
          title: "Batches",
          url: "#",
        },
        {
          title: "Time Table",
          url: "#",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <HeroBrand />
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <>
            <Separator />
            <SidebarGroup key={item.title}>
              <SidebarGroupLabel className="tracking-wide font-semibold">
                {item.title.toUpperCase()}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {item.items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild isActive={item.isActive}>
                        <a href={item.url}>{item.title}</a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
