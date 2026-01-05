"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  ShieldHalf,
  CalendarClock,
  MessageSquare,
  PanelLeft,
  LineChart,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/players", label: "Players", icon: Users },
  { href: "/teams", label: "Teams", icon: ShieldHalf },
  { href: "/matches", label: "Matches", icon: CalendarClock },
  { href: "/feed", label: "Feed", icon: MessageSquare },
  { href: "/messages", label: "Messages", icon: PanelLeft },
  { href: "/manager", label: "Manager", icon: LineChart },
];

export function Sidebar() {
  const pathname = usePathname();

  const content = (
    <div className="flex h-full flex-col gap-6 p-4">
      <div className="text-lg font-bold tracking-tight">Soccer Hub</div>
      <nav className="flex flex-col gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname?.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted",
                active && "bg-muted text-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );

  return (
    <>
      <div className="hidden border-r lg:block lg:w-64">{content}</div>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="lg:hidden fixed left-4 top-4 z-50"
          >
            <PanelLeft className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64">
          {content}
        </SheetContent>
      </Sheet>
    </>
  );
}

