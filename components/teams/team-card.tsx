import Link from "next/link";
import { Users } from "lucide-react";

import { Team } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function TeamCard({ team }: { team: Team }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-base">
          <span>{team.name}</span>
          <Badge variant="secondary">{team.level}</Badge>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          {team.location} • {team.description}
        </p>
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="h-4 w-4" />
          <span>{team.members.length} members</span>
        </div>
        <Button asChild variant="outline" size="sm">
          <Link href={`/teams/${team.id}`}>View</Link>
        </Button>
      </CardContent>
    </Card>
  );
}

