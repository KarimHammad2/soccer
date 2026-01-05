import Link from "next/link";
import { CalendarClock, MapPin, Users } from "lucide-react";

import { Match } from "@/lib/types";
import { formatDateTime } from "@/lib/utils/formatting";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function MatchCard({
  match,
  rsvpLabel,
}: {
  match: Match;
  rsvpLabel?: string;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-base">{match.title}</CardTitle>
        <Badge variant="secondary">{match.type}</Badge>
      </CardHeader>
      <CardContent className="space-y-2 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <CalendarClock className="h-4 w-4" />
          <span>{formatDateTime(match.date)}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          <span>{match.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          <span>{match.attendees.length} RSVP</span>
          <Badge variant="outline">{match.skillLevel}</Badge>
        </div>
        {rsvpLabel ? <div className="text-xs">Your RSVP: {rsvpLabel}</div> : null}
        <Button asChild size="sm" className="mt-2">
          <Link href={`/matches/${match.id}`}>View match</Link>
        </Button>
      </CardContent>
    </Card>
  );
}

