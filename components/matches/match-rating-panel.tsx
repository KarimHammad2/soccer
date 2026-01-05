"use client";

import { useState } from "react";
import { Star } from "lucide-react";

import { players } from "@/lib/data/players";
import { Match } from "@/lib/types";
import { useAppStore } from "@/lib/store/app-store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function MatchRatingPanel({ match }: { match: Match }) {
  const { currentUser, addRating } = useAppStore();
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);
  const [score, setScore] = useState<number>(0);

  if (!currentUser) return null;

  const participants = match.attendees
    .map((a) => players.find((p) => p.id === a.playerId))
    .filter(Boolean);

  const submit = () => {
    if (!selectedPlayer || !score) return;
    addRating({
      matchId: match.id,
      ratedPlayerId: selectedPlayer,
      raterId: currentUser.id,
      score,
      tags: [],
    });
    setScore(0);
    setSelectedPlayer(null);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Rate participants</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {participants.map((p) => (
            <Badge
              key={p!.id}
              variant={selectedPlayer === p!.id ? "default" : "secondary"}
              className="cursor-pointer"
              onClick={() => setSelectedPlayer(p!.id)}
            >
              {p!.name}
            </Badge>
          ))}
        </div>
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((v) => (
            <button
              key={v}
              className="text-yellow-500"
              onClick={() => setScore(v)}
              aria-label={`Rate ${v}`}
            >
              <Star
                className={`h-6 w-6 ${
                  score >= v ? "fill-yellow-400" : "stroke-current"
                }`}
              />
            </button>
          ))}
        </div>
        <Button onClick={submit} disabled={!selectedPlayer || !score}>
          Submit rating
        </Button>
      </CardContent>
    </Card>
  );
}

