"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Goal } from "lucide-react";

import { cn } from "@/lib/utils";
import { useAppStore } from "@/lib/store/app-store";
import { getDemoUsers } from "@/lib/utils/fakeAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export function TopNav() {
  const pathname = usePathname();
  const { currentUser, setCurrentUser } = useAppStore();
  const demoUsers = getDemoUsers();

  return (
    <header className="sticky top-0 z-30 border-b bg-background/90 backdrop-blur">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
            <Goal className="h-5 w-5 text-primary" />
            <span>Soccer Hub</span>
          </Link>
          <div className="hidden items-center gap-2 text-sm text-muted-foreground md:flex">
            {[
              { href: "/matches/create", label: "Create Match" },
              { href: "/teams/create", label: "Create Team" },
              {
                href: currentUser ? `/players/${currentUser.id}/edit` : "/players",
                label: "Update Profile",
              },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-md px-2 py-1 hover:bg-muted",
                  pathname === link.href && "bg-muted"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" asChild>
            <Link href="/feed">Post Update</Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 px-2">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={currentUser?.avatar} />
                  <AvatarFallback>{currentUser?.name?.[0] ?? "U"}</AvatarFallback>
                </Avatar>
                <div className="hidden text-left text-sm sm:block">
                  <div className="font-medium">{currentUser?.name ?? "Select user"}</div>
                  <div className="text-xs text-muted-foreground">
                    {currentUser?.positions?.join(" / ")}
                  </div>
                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Switch user</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {demoUsers.map((user) => (
                <DropdownMenuItem
                  key={user.id}
                  onSelect={() => setCurrentUser(user.id)}
                  className="flex items-center gap-2"
                >
                  <Avatar className="h-7 w-7">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-sm font-medium">{user.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {user.positions.join(" / ")} • {user.location}
                    </div>
                  </div>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/login">Go to login</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

