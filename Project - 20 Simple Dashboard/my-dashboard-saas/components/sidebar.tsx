"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LineChart, CalendarDays, BarChart4 } from "lucide-react"; // Import icons
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"; // For tooltips
import { cn } from "@/lib/utils"; // Assuming you have this utility

export function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Overview", href: "/", icon: Home, targetSegment: null }, // Overview or Dashboard home
    { name: "Daily Data", href: "/daily-data", icon: CalendarDays, targetSegment: "daily-data" },
    { name: "Monthly Data", href: "/monthly-data", icon: BarChart4, targetSegment: "monthly-data" },
    { name: "Annual Data", href: "/annual-data", icon: LineChart, targetSegment: "annual-data" },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link
          href="#"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <span className="sr-only">DashUI</span>
          {/* You could put a small logo or initial here */}
          D
        </Link>
        <TooltipProvider>
          {navItems.map((item) => (
            <Tooltip key={item.name}>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8",
                    pathname === item.href && "bg-accent text-accent-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="sr-only">{item.name}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">
                {item.name}
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </nav>
      {/* You can add a user profile/settings section here */}
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        {/* Example: settings link */}
        {/* <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
        </TooltipProvider> */}
      </nav>
    </aside>
  );
}