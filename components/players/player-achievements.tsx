import { Award, Sparkles, Trophy } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Achievement } from "@/lib/types";

const iconMap: Record<string, React.ReactNode> = {
  Sparkles: <Sparkles className="h-4 w-4 text-yellow-500" />,
  Star: <Award className="h-4 w-4 text-blue-500" />,
  Trophy: <Trophy className="h-4 w-4 text-amber-500" />,
};

export function PlayerAchievements({
  achievements,
}: {
  achievements: Achievement[];
}) {
  if (!achievements.length) {
    return (
      <Card>
        <CardContent className="p-6 text-sm text-muted-foreground">
          No achievements yet.
        </CardContent>
      </Card>
    );
  }
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {achievements.map((ach) => (
        <Card key={ach.id}>
          <CardHeader className="flex flex-row items-center gap-3 space-y-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
              {iconMap[ach.icon] ?? <Award className="h-4 w-4" />}
            </div>
            <div>
              <CardTitle className="text-base">{ach.title}</CardTitle>
              <Badge variant="secondary" className="mt-1">
                {ach.icon}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-0 text-sm text-muted-foreground">
            {ach.description}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

