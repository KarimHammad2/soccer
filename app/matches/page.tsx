"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { MainShell } from "@/components/layout/main-shell";
import { MatchCard } from "@/components/matches/match-card";
import { SearchBar } from "@/components/common/search-bar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppStore } from "@/lib/store/app-store";

export default function MatchesPage() {
  const { currentUser, matches } = useAppStore();
  const [search, setSearch] = useState("");
  const [now] = useState(() => Date.now());

  const { upcoming, past } = useMemo(() => {
    const filtered = matches.filter((m) =>
      m.title.toLowerCase().includes(search.toLowerCase())
    );
    return {
      upcoming: filtered.filter((m) => new Date(m.date).getTime() >= now),
      past: filtered.filter((m) => new Date(m.date).getTime() < now),
    };
  }, [matches, now, search]);

  const rsvpLabel = (matchId: string) =>
    matches
      .find((m) => m.id === matchId)
      ?.attendees.find((a) => a.playerId === currentUser?.id)?.status;

  return (
    <MainShell>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Schedule</p>
          <h1 className="text-2xl font-bold">Matches</h1>
        </div>
        <Link className="text-sm text-primary underline" href="/matches/create">
          Create match
        </Link>
      </div>

      <Card>
        <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle>Search</CardTitle>
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search matches"
            className="sm:max-w-sm"
          />
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="upcoming" className="space-y-4">
            <TabsList>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="past">Past</TabsTrigger>
            </TabsList>
            <TabsContent value="upcoming" className="grid gap-3 md:grid-cols-2">
              {upcoming.map((m) => (
                <MatchCard
                  key={m.id}
                  match={m}
                  rsvpLabel={rsvpLabel(m.id)}
                />
              ))}
              {upcoming.length === 0 ? (
                <p className="text-sm text-muted-foreground">No upcoming matches.</p>
              ) : null}
            </TabsContent>
            <TabsContent value="past" className="grid gap-3 md:grid-cols-2">
              {past.map((m) => (
                <MatchCard
                  key={m.id}
                  match={m}
                  rsvpLabel={rsvpLabel(m.id)}
                />
              ))}
              {past.length === 0 ? (
                <p className="text-sm text-muted-foreground">No past matches.</p>
              ) : null}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </MainShell>
  );
}

