import { players } from "@/lib/data/players";
import { MatchRSVP } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export function MatchRSVPList({ attendees }: { attendees: MatchRSVP[] }) {
  if (!attendees.length) {
    return <p className="text-sm text-muted-foreground">No RSVPs yet.</p>;
  }
  return (
    <div className="space-y-2">
      {attendees.map((attendee) => {
        const player = players.find((p) => p.id === attendee.playerId);
        if (!player) return null;
        return (
          <div
            key={attendee.playerId}
            className="flex items-center justify-between rounded-md border bg-card p-2"
          >
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={player.avatar} />
                <AvatarFallback>{player.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <div className="text-sm font-medium">{player.name}</div>
                <div className="text-xs text-muted-foreground">
                  {player.positions.join(" / ")}
                </div>
              </div>
            </div>
            <Badge variant="secondary">{attendee.status}</Badge>
          </div>
        );
      })}
    </div>
  );
}

