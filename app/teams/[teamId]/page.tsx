"use client";

import { notFound, useParams } from "next/navigation";
import Link from "next/link";

import { MainShell } from "@/components/layout/main-shell";
import { TeamRoster } from "@/components/teams/team-roster";
import { TeamMatchesList } from "@/components/teams/team-matches-list";
import { FeedPostCard } from "@/components/feed/feed-post";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/lib/store/app-store";

export default function TeamDetailPage() {
  const params = useParams<{ teamId: string }>();
  const { teams, matches, feed } = useAppStore();
  const team = teams.find((t) => t.id === params.teamId);

  if (!team) return notFound();

  const teamMatches = matches.filter(
    (m) =>
      m.teamAId === team.id ||
      m.teamBId === team.id ||
      team.upcomingMatchIds?.includes(m.id)
  );
  const teamFeed = feed.filter((f) => (team.feedPostIds || []).includes(f.id));

  return (
    <MainShell>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{team.location}</p>
          <h1 className="text-2xl font-bold">{team.name}</h1>
          <div className="mt-2 flex items-center gap-2">
            <Badge variant="secondary">{team.level}</Badge>
            {team.openForPlayers ? <Badge>Open to players</Badge> : null}
          </div>
        </div>
        <Button asChild variant="outline">
          <Link href={`/teams/${team.id}/manage`}>Manage</Link>
        </Button>
      </div>
      <p className="max-w-2xl text-sm text-muted-foreground">{team.description}</p>

      <Tabs defaultValue="roster" className="space-y-4">
        <TabsList>
          <TabsTrigger value="roster">Roster</TabsTrigger>
          <TabsTrigger value="matches">Matches</TabsTrigger>
          <TabsTrigger value="feed">Feed</TabsTrigger>
        </TabsList>
        <TabsContent value="roster">
          <TeamRoster team={team} />
        </TabsContent>
        <TabsContent value="matches">
          <TeamMatchesList matches={teamMatches} />
        </TabsContent>
        <TabsContent value="feed">
          <div className="space-y-3">
            {teamFeed.length ? (
              teamFeed.map((post) => <FeedPostCard key={post.id} post={post} />)
            ) : (
              <Card>
                <CardContent className="p-4 text-sm text-muted-foreground">
                  No posts yet.
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </MainShell>
  );
}

