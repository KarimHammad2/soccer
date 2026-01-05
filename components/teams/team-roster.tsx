import { players } from "@/lib/data/players";
import { Team } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export function TeamRoster({ team }: { team: Team }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {team.members.map((member) => {
        const player = players.find((p) => p.id === member.playerId);
        if (!player) return null;
        return (
          <div
            key={member.playerId}
            className="flex items-center justify-between rounded-lg border bg-card p-3"
          >
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={player.avatar} />
                <AvatarFallback>{player.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{player.name}</div>
                <div className="text-xs text-muted-foreground">
                  {player.positions.join(" / ")}
                </div>
              </div>
            </div>
            <Badge variant="secondary">{member.role}</Badge>
          </div>
        );
      })}
    </div>
  );
}

