"use client";

import { notFound, useParams } from "next/navigation";

import { MainShell } from "@/components/layout/main-shell";
import { PlayerProfileHeader } from "@/components/players/player-profile-header";
import { PlayerStatsSummary } from "@/components/players/player-stats-summary";
import { PlayerAchievements } from "@/components/players/player-achievements";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useAppStore } from "@/lib/store/app-store";
import { players } from "@/lib/data/players";
import { ratings } from "@/lib/data/ratings";
import { achievements as achievementData } from "@/lib/data/achievements";

export default function PlayerProfilePage() {
  const params = useParams<{ playerId: string }>();
  const player = players.find((p) => p.id === params.playerId);
  const { currentUser } = useAppStore();

  if (!player) return notFound();

  const playerRatings = ratings.filter((r) => r.ratedPlayerId === player.id);
  const avgRating =
    playerRatings.reduce((sum, r) => sum + r.score, 0) /
    (playerRatings.length || 1);

  const stats = [
    { label: "Average rating", value: avgRating.toFixed(1) },
    { label: "Ratings count", value: playerRatings.length },
    { label: "Primary foot", value: player.preferredFoot },
    { label: "Skill", value: player.skillLevel },
    { label: "Location", value: player.location },
    { label: "Positions", value: player.positions.join(" / ") },
  ];

  return (
    <MainShell>
      <PlayerProfileHeader player={player} />
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="stats">Stats</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <PlayerStatsSummary stats={stats} />
          <Card>
            <CardContent className="p-4 text-sm text-muted-foreground">
              {player.bio}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="stats">
          <Card>
            <CardContent className="space-y-2 p-4 text-sm">
              <div className="flex items-center justify-between">
                <span>Goals (mock)</span>
                <Badge variant="secondary">5</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Assists (mock)</span>
                <Badge variant="secondary">7</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Clean sheets</span>
                <Badge variant="secondary">3</Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="achievements">
          <PlayerAchievements
            achievements={achievementData.filter((a) =>
              (player.achievements || []).includes(a.id)
            )}
          />
        </TabsContent>
        <TabsContent value="media">
          <Card>
            <CardContent className="grid gap-3 sm:grid-cols-3 p-4">
              {["Highlight 1", "Highlight 2", "Highlight 3"].map((item) => (
                <div
                  key={item}
                  className="flex h-24 items-center justify-center rounded-md bg-muted text-sm text-muted-foreground"
                >
                  {item}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      {currentUser?.id === player.id ? (
        <a
          href={`/players/${player.id}/edit`}
          className="text-sm text-primary underline"
        >
          Edit profile
        </a>
      ) : null}
    </MainShell>
  );
}

