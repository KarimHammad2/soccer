import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Stat = { label: string; value: string | number; hint?: string };

export function PlayerStatsSummary({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              {stat.label}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{stat.value}</div>
            {stat.hint ? (
              <p className="text-xs text-muted-foreground">{stat.hint}</p>
            ) : null}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

