import Link from "next/link";
import { CalendarClock } from "lucide-react";

import { Match } from "@/lib/types";
import { formatDateTime } from "@/lib/utils/formatting";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export function TeamMatchesList({ matches }: { matches: Match[] }) {
  if (!matches.length) {
    return (
      <Card>
        <CardContent className="p-4 text-sm text-muted-foreground">
          No matches scheduled.
        </CardContent>
      </Card>
    );
  }
  return (
    <div className="space-y-3">
      {matches.map((match) => (
        <Link key={match.id} href={`/matches/${match.id}`}>
          <Card className="hover:border-primary/50">
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <div className="font-medium">{match.title}</div>
                <div className="text-sm text-muted-foreground">
                  {match.location} • {formatDateTime(match.date)}
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CalendarClock className="h-4 w-4" />
                <Badge variant="secondary">{match.skillLevel}</Badge>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}

