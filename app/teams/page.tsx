"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { MainShell } from "@/components/layout/main-shell";
import { TeamCard } from "@/components/teams/team-card";
import { SearchBar } from "@/components/common/search-bar";
import { FilterBar } from "@/components/common/filter-bar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppStore } from "@/lib/store/app-store";

const levelOptions = [
  { label: "Beginner", value: "Beginner" },
  { label: "Intermediate", value: "Intermediate" },
  { label: "Advanced", value: "Advanced" },
  { label: "Semi-Pro", value: "Semi-Pro" },
];

export default function TeamsPage() {
  const { teams } = useAppStore();
  const [search, setSearch] = useState("");
  const [level, setLevel] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const term = search.toLowerCase();
    return teams.filter((t) => {
      const matchesTerm =
        t.name.toLowerCase().includes(term) ||
        t.location.toLowerCase().includes(term);
      const matchesLevel = !level || t.level === level;
      return matchesTerm && matchesLevel;
    });
  }, [teams, search, level]);

  return (
    <MainShell>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Browse teams</p>
          <h1 className="text-2xl font-bold">Teams & Clubs</h1>
        </div>
        <Button asChild>
          <Link href="/teams/create">Create team</Link>
        </Button>
      </div>
      <Card>
        <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle>Search</CardTitle>
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search by name or location"
            className="sm:max-w-sm"
          />
        </CardHeader>
        <CardContent className="space-y-4">
          <FilterBar options={levelOptions} active={level} onChange={setLevel} />
          <div className="grid gap-4 sm:grid-cols-2">
            {filtered.map((team) => (
              <TeamCard key={team.id} team={team} />
            ))}
          </div>
        </CardContent>
      </Card>
    </MainShell>
  );
}

