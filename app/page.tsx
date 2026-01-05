"use client";

import Link from "next/link";
import { ArrowRight, ShieldHalf, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 py-16">
        <header className="text-center">
          <p className="text-sm font-semibold uppercase text-primary">
            Social network + Manager mode
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Organize, play, and manage your football world
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Profiles, teams, matches, RSVPs, feed, messaging, and a light squad
            builder — all powered by mock data and ready for a real backend later.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link href="/dashboard">
                Go to dashboard <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/login">Start as demo player</Link>
            </Button>
          </div>
        </header>

        <section className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "For Players",
              desc: "Create a profile, join matches, get ratings, and earn achievements.",
            },
            {
              title: "For Teams",
              desc: "Manage rosters, organize events, and keep a shared feed.",
            },
            {
              title: "For Managers",
              desc: "Build virtual squads from real player profiles and track balance.",
            },
          ].map((item) => (
            <Card key={item.title}>
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {item.desc}
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="rounded-2xl border bg-card p-8 shadow-sm">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-semibold uppercase text-primary">
                <Users className="h-4 w-4" />
                Community-first
              </div>
              <h2 className="text-2xl font-semibold">
                Bring players, teams, and matches into one collaborative hub.
              </h2>
              <p className="text-muted-foreground">
                Browse players, set RSVPs, chat with teammates, and share updates in the
                feed. The architecture uses a mock data layer so swapping to Postgres/Prisma
                later is straightforward.
              </p>
              <div className="flex gap-3">
                <Button asChild>
                  <Link href="/players">Browse players</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/matches">View matches</Link>
                </Button>
              </div>
            </div>
            <div className="rounded-xl border bg-gradient-to-br from-primary/10 via-background to-accent p-6">
              <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                <ShieldHalf className="h-4 w-4" />
                Manager mode preview
              </div>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                <li>• Drag/drop style squad slots (GK, DEF, MID, FWD)</li>
                <li>• Quick stats: average rating and position balance</li>
                <li>• Powered by mock player data; ready for live DB later</li>
              </ul>
              <Button asChild className="mt-6 w-full">
                <Link href="/manager">Open manager mode</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
