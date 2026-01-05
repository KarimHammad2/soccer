import { Player } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function PlayerProfileHeader({ player }: { player: Player }) {
  return (
    <div className="flex flex-col gap-4 rounded-lg border bg-card p-4 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={player.avatar} />
          <AvatarFallback>{player.name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-xl font-semibold">{player.name}</h1>
          <p className="text-sm text-muted-foreground">
            {player.location} • {player.preferredFoot}-footed
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {player.positions.map((pos) => (
              <Badge key={pos} variant="secondary">
                {pos}
              </Badge>
            ))}
            <Badge variant="outline">{player.skillLevel}</Badge>
          </div>
        </div>
      </div>
      {player.bio ? (
        <p className="max-w-xl text-sm text-muted-foreground">{player.bio}</p>
      ) : null}
    </div>
  );
}

