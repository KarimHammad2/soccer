"use client";

import { notFound, useParams } from "next/navigation";

import { MainShell } from "@/components/layout/main-shell";
import { MatchRSVPList } from "@/components/matches/match-rsvp-list";
import { MatchRatingPanel } from "@/components/matches/match-rating-panel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDateTime } from "@/lib/utils/formatting";
import { useAppStore } from "@/lib/store/app-store";

export default function MatchDetailPage() {
  const params = useParams<{ matchId: string }>();
  const { matches, currentUser, setRSVP } = useAppStore();
  const match = matches.find((m) => m.id === params.matchId);

  if (!match) return notFound();

  const currentRSVP = match.attendees.find((a) => a.playerId === currentUser?.id);

  const updateStatus = (status: "Going" | "Maybe" | "Not Going") => {
    if (!currentUser) return;
    setRSVP(match.id, currentUser.id, status);
  };

  return (
    <MainShell>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">
            {match.location} • {formatDateTime(match.date)}
          </p>
          <h1 className="text-2xl font-bold">{match.title}</h1>
          <div className="mt-2 flex items-center gap-2">
            <Badge variant="secondary">{match.type}</Badge>
            <Badge variant="outline">{match.skillLevel}</Badge>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant={currentRSVP?.status === "Going" ? "default" : "outline"}
            onClick={() => updateStatus("Going")}
          >
            Going
          </Button>
          <Button
            variant={currentRSVP?.status === "Maybe" ? "default" : "outline"}
            onClick={() => updateStatus("Maybe")}
          >
            Maybe
          </Button>
          <Button
            variant={currentRSVP?.status === "Not Going" ? "default" : "outline"}
            onClick={() => updateStatus("Not Going")}
          >
            Not Going
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>RSVPs</CardTitle>
        </CardHeader>
        <CardContent>
          <MatchRSVPList attendees={match.attendees} />
        </CardContent>
      </Card>

      <MatchRatingPanel match={match} />
    </MainShell>
  );
}

