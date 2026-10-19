"use client";
import { useEffect, useMemo, useState } from "react";
import { matches as initialMatches, adverts } from "@/lib/data";
import { sortMatches } from "@/lib/football";
import SiteHeader from "@/components/layout/SiteHeader";
import FixturePanel from "@/components/layout/FixturePanel";
import MatchCentre from "@/components/matches/MatchCentre";
import Leaderboard from "@/components/leaderboards/Leaderboard";
import AdvertRail from "@/components/ads/AdvertRail";
export default function Home() {
  const [matches] = useState(initialMatches);
  const [tab, setTab] = useState("fixtures");
  const ordered = useMemo(() => sortMatches(matches), [matches]);
  const [selectedId, setSelectedId] = useState(
    () =>
      sortMatches(initialMatches).find((m) => m.status === "live")?.id ||
      initialMatches[0].id,
  );
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const selected = ordered.find((m) => m.id === selectedId) || ordered[0];
  const clockFor = (m) =>
    m.status === "live" && m.startedAt
      ? Math.min(
          90,
          Math.floor((now - new Date(m.startedAt).getTime()) / 60000),
        )
      : m.minute || 0;
  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      <SiteHeader matches={matches} />
      <div className="mx-auto grid max-w-[1800px] grid-cols-1 items-start gap-4 px-4 py-5 sm:px-6 lg:grid-cols-[minmax(270px,.9fr)_minmax(360px,1.4fr)_minmax(210px,.65fr)] xl:gap-5 xl:px-8">
        <FixturePanel
          tab={tab}
          setTab={setTab}
          matches={matches}
          ordered={ordered}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
          clockFor={clockFor}
        />
        <section className="min-w-0 space-y-4">
          <MatchCentre match={selected} clock={clockFor(selected)} />
          <Leaderboard matches={matches} kind="goals" />
          <Leaderboard matches={matches} kind="assists" />
        </section>
        <AdvertRail adverts={adverts} />
      </div>
      <footer className="pb-8 text-center text-xs text-slate-400">
        Football Scores · Demo data only; not connected to live scores.
      </footer>
    </main>
  );
}
