"use client";

import { useMemo, useState } from "react";

import { MainShell } from "@/components/layout/main-shell";
import { PlayerCard } from "@/components/players/player-card";
import { SearchBar } from "@/components/common/search-bar";
import { FilterBar } from "@/components/common/filter-bar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppStore } from "@/lib/store/app-store";
import { Position } from "@/lib/types";

const positionOptions = [
  { label: "GK", value: "GK" },
  { label: "DEF", value: "DEF" },
  { label: "MID", value: "MID" },
  { label: "FWD", value: "FWD" },
];

export default function PlayersPage() {
  const { players } = useAppStore();
  const [search, setSearch] = useState("");
  const [position, setPosition] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const term = search.toLowerCase();
    return players.filter((p) => {
      const matchesTerm =
        p.name.toLowerCase().includes(term) ||
        p.location.toLowerCase().includes(term);
      const matchesPos = !position || p.positions.includes(position as Position);
      return matchesTerm && matchesPos;
    });
  }, [players, position, search]);

  return (
    <MainShell>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Browse players</p>
          <h1 className="text-2xl font-bold">Players</h1>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle>Search</CardTitle>
          <SearchBar
            placeholder="Search by name or location"
            value={search}
            onChange={setSearch}
            className="sm:max-w-sm"
          />
        </CardHeader>
        <CardContent className="space-y-4">
          <FilterBar
            options={positionOptions}
            active={position}
            onChange={setPosition}
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((player) => (
              <PlayerCard key={player.id} player={player} />
            ))}
          </div>
        </CardContent>
      </Card>
    </MainShell>
  );
}

