"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { MainShell } from "@/components/layout/main-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAppStore } from "@/lib/store/app-store";
import { Match, MatchRSVP, MatchType, SkillLevel } from "@/lib/types";

export default function CreateMatchPage() {
  const router = useRouter();
  const { createMatch } = useAppStore();
  const [form, setForm] = useState<Omit<Match, "id" | "attendees">>({
    title: "",
    location: "",
    date: "",
    type: "Pickup" as MatchType,
    skillLevel: "Intermediate" as SkillLevel,
  });

  const handleSubmit = () => {
    const match = createMatch({
      ...form,
      attendees: [] as MatchRSVP[],
    });
    router.push(`/matches/${match.id}`);
  };

  return (
    <MainShell>
      <Card>
        <CardHeader>
          <CardTitle>Create a match</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Title</Label>
            <Input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label>Location</Label>
            <Input
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label>Date & time</Label>
            <Input
              type="datetime-local"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Type</Label>
              <Input
                value={form.type}
              onChange={(e) =>
                setForm({ ...form, type: e.target.value as MatchType })
              }
              />
            </div>
            <div className="space-y-2">
              <Label>Skill level</Label>
              <Input
                value={form.skillLevel}
                onChange={(e) =>
                  setForm({
                    ...form,
                    skillLevel: e.target.value as SkillLevel,
                  })
                }
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Positions needed</Label>
            <Textarea placeholder="1 GK, 4 DEF, 4 MID, 2 FWD" />
          </div>
          <Button onClick={handleSubmit} disabled={!form.title || !form.date}>
            Create match
          </Button>
        </CardContent>
      </Card>
    </MainShell>
  );
}

