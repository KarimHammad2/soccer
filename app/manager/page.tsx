"use client";

import { MainShell } from "@/components/layout/main-shell";
import { SquadBuilder } from "@/components/manager/squad-builder";

export default function ManagerPage() {
  return (
    <MainShell>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Manager mode</h1>
        <p className="text-muted-foreground">
          Build a virtual squad from available players. Selections are stored per-user in
          memory for this session.
        </p>
        <SquadBuilder />
      </div>
    </MainShell>
  );
}

