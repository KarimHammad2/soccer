"use client";

import Link from "next/link";
import { CalendarClock, Plus, Star, Trophy, Users } from "lucide-react";

import { MainShell } from "@/components/layout/main-shell";
import { MatchCard } from "@/components/matches/match-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAppStore } from "@/lib/store/app-store";

export default function DashboardPage() {
  const { currentUser, matches } = useAppStore();
  const upcoming = matches
    .filter((m) =>
      m.attendees.some((a) => a.playerId === currentUser?.id)
    )
    .slice(0, 3);

  return (
    <MainShell>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Welcome back</p>
          <h1 className="text-2xl font-bold">
            {currentUser?.name ?? "Player"} · {currentUser?.skillLevel}
          </h1>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/matches/create">
              <Plus className="mr-2 h-4 w-4" />
              Create match
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/teams/create">Create team</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall rating</CardTitle>
            <Star className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">
              {currentUser?.rating ?? "—"}
            </div>
            <p className="text-xs text-muted-foreground">
              {currentUser?.ratingsCount ?? 0} ratings
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Matches played</CardTitle>
            <CalendarClock className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">14</div>
            <p className="text-xs text-muted-foreground">Recent form: W D W</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Achievements</CardTitle>
            <Trophy className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {(currentUser?.achievements || []).map((a) => (
                <Badge key={a} variant="secondary">
                  {a}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">Upcoming matches</CardTitle>
            <Button variant="outline" size="sm" asChild>
              <Link href="/matches">View all</Link>
            </Button>
          </CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-2">
            {upcoming.length ? (
              upcoming.map((m) => <MatchCard key={m.id} match={m} />)
            ) : (
              <p className="text-sm text-muted-foreground">
                No matches scheduled. Create one to get started.
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Quick actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { label: "Find players", href: "/players" },
              { label: "View teams", href: "/teams" },
              { label: "Post to feed", href: "/feed" },
              { label: "Open messages", href: "/messages" },
            ].map((item) => (
              <Button
                key={item.href}
                variant="secondary"
                className="w-full justify-start"
                asChild
              >
                <Link href={item.href}>{item.label}</Link>
              </Button>
            ))}
            <div className="rounded-md border p-3">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Users className="h-4 w-4" />
                Squad tip
              </div>
              <p className="text-xs text-muted-foreground">
                Add a GK and at least 4 defenders in manager mode to balance your squad.
              </p>
              <Button asChild size="sm" className="mt-2 w-full">
                <Link href="/manager">Open manager</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainShell>
  );
}

