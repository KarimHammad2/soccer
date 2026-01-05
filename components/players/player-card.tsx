import Link from "next/link";
import { Star } from "lucide-react";

import { Player } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function PlayerCard({ player, className }: { player: Player; className?: string }) {
  return (
    <Card className={cn(className, "h-full")}>
      <CardHeader className="flex flex-row items-center gap-3 space-y-0">
        <Avatar>
          <AvatarImage src={player.avatar} />
          <AvatarFallback>{player.name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-base">{player.name}</CardTitle>
          <p className="text-sm text-muted-foreground">{player.location}</p>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {player.positions.map((pos) => (
            <Badge key={pos} variant="secondary">
              {pos}
            </Badge>
          ))}
          <Badge variant="outline">{player.skillLevel}</Badge>
        </div>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-500" />
          <span>{player.rating ?? "N/A"}</span>
          <span>({player.ratingsCount ?? 0})</span>
        </div>
        <Button asChild className="w-full">
          <Link href={`/players/${player.id}`}>View profile</Link>
        </Button>
      </CardContent>
    </Card>
  );
}

