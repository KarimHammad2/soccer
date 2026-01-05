"use client";

import { useMemo, useState } from "react";
import { X } from "lucide-react";

import { players } from "@/lib/data/players";
import { Position } from "@/lib/types";
import { useAppStore } from "@/lib/store/app-store";
import { SearchBar } from "@/components/common/search-bar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function SquadBuilder() {
  const { currentUser, squadByUser, setSquadSlot, resetSquad } = useAppStore();
  const [search, setSearch] = useState("");
  const squad = currentUser ? squadByUser[currentUser.id] ?? [] : [];
  const filtered = useMemo(() => {
    const term = search.toLowerCase();
    return players.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.positions.some((pos) => pos.toLowerCase().includes(term))
    );
  }, [search]);

  if (!currentUser) return null;

  const addToSlot = (slotId: string, playerId: string) => {
    setSquadSlot(currentUser.id, slotId, playerId);
  };

  const removeFromSlot = (slotId: string) => setSquadSlot(currentUser.id, slotId, undefined);

  const averageRating =
    squad.reduce((sum, slot) => {
      const p = players.find((pl) => pl.id === slot.playerId);
      return sum + (p?.rating || 0);
    }, 0) /
    (squad.filter((s) => s.playerId).length || 1);

  const counts = squad.reduce<Record<Position, number>>(
    (acc, slot) => {
      const pos = slot.position;
      acc[pos] = acc[pos] + (slot.playerId ? 1 : 0);
      return acc;
    },
    { GK: 0, DEF: 0, MID: 0, FWD: 0 }
  );

  return (
    <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
      <Card>
        <CardHeader>
          <CardTitle>Squad</CardTitle>
          <div className="text-sm text-muted-foreground">
            Avg rating: {averageRating.toFixed(1)} • GK {counts.GK} • DEF{" "}
            {counts.DEF} • MID {counts.MID} • FWD {counts.FWD}
          </div>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2">
          {squad.map((slot) => {
            const player = players.find((p) => p.id === slot.playerId);
            return (
              <div
                key={slot.id}
                className="flex items-center justify-between rounded-md border bg-card p-3"
              >
                <div>
                  <div className="text-xs uppercase text-muted-foreground">
                    {slot.label}
                  </div>
                  {player ? (
                    <>
                      <div className="font-medium">{player.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {player.positions.join(" / ")}
                      </div>
                    </>
                  ) : (
                    <div className="text-sm text-muted-foreground">
                      Empty slot
                    </div>
                  )}
                </div>
                {player ? (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFromSlot(slot.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                ) : null}
              </div>
            );
          })}
          <Button
            variant="outline"
            className="col-span-full"
            onClick={() => resetSquad(currentUser.id)}
          >
            Reset squad
          </Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Add players</CardTitle>
          <SearchBar value={search} onChange={setSearch} placeholder="Search players" />
        </CardHeader>
        <CardContent className="space-y-2">
          {filtered.map((p) => (
            <div
              key={p.id}
              className="flex items-center justify-between rounded-md border p-2"
            >
              <div>
                <div className="font-medium">{p.name}</div>
                <div className="text-xs text-muted-foreground">
                  {p.positions.join(" / ")} • {p.skillLevel}
                </div>
              </div>
              <div className="flex gap-1">
                {squad.map((slot) =>
                  slot.position === p.positions[0] ? (
                    <Button
                      key={slot.id}
                      size="sm"
                      variant="secondary"
                      onClick={() => addToSlot(slot.id, p.id)}
                    >
                      {slot.label}
                    </Button>
                  ) : null
                )}
              </div>
            </div>
          ))}
          {filtered.length === 0 ? (
            <div className="text-sm text-muted-foreground">No players found.</div>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}

