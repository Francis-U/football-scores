"use client";

import { useEffect, useState } from "react";
import { Trophy, Activity } from "lucide-react";
import { adverts, teams } from "@/lib/data";
import AdBanner from "@/components/ads/AdBanner";

function getEventIcon(type) {
  switch (type?.toLowerCase()) {
    case "goal":
      return "⚽";
    case "yellow":
    case "yellow-card":
    case "yellow_card":
      return "🟨";
    case "red":
    case "red-card":
    case "red_card":
      return "🟥";
    default:
      return "⚽";
  }
}

function getPlayerName(event) {
  if (typeof event.player === "string") return event.player;

  return event.player?.name || event.playerName || null;
}

function getPlayerImage(event) {
  return (
    event.playerImage ||
    event.playerPhoto ||
    event.player?.image ||
    event.player?.photo ||
    event.player?.avatar ||
    null
  );
}

function getTeamName(event, match) {
  const teamId =
    typeof event.team === "string"
      ? event.team
      : event.team?.id || event.teamId;

  const team = teams.find((t) => t.id === teamId);

  if (team) return team.name;

  if (typeof event.teamName === "string") {
    return event.teamName;
  }

  const home = match.homeTeam || match.home;
  const away = match.awayTeam || match.away;

  if (typeof home === "object" && home?.name && home.id === teamId) {
    return home.name;
  }

  if (typeof away === "object" && away?.name && away.id === teamId) {
    return away.name;
  }

  return "";
}
const EVENT_WINDOW = 60 * 1000;

export default function SiteHeader({ matches }) {
  const [ad, setAd] = useState(0);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const adInterval = setInterval(() => {
      setAd((v) => (v + 1) % adverts.length);
    }, 7000);

    const clockInterval = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => {
      clearInterval(adInterval);
      clearInterval(clockInterval);
    };
  }, []);

  const liveMatches = matches.filter((match) => match.status === "live");

  const latestEvent =
    liveMatches
      .flatMap((match) =>
        (match.events || []).map((event) => ({
          ...event,
          match,
          eventTime: event.timestamp
            ? new Date(event.timestamp).getTime()
            : NaN,
        })),
      )
      .filter(
        (event) =>
          Number.isFinite(event.eventTime) &&
          event.eventTime <= now &&
          now - event.eventTime < EVENT_WINDOW,
      )
      .sort((a, b) => b.eventTime - a.eventTime)[0] || null;

  // Hide the entire event panel when there is nothing recent to show.
  //only use the below when you want to show 'no live natches'
  // const showEventPanel = Boolean(latestEvent) || !liveMatches.length;
  const showEventPanel = Boolean(latestEvent);
  return (
    <header className="border-b bg-white">
      <div className="mx-auto max-w-[1800px] px-4 py-4 sm:px-6 xl:px-8">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="rounded-xl bg-blue-700 p-3 text-white">
              <Trophy />
            </span>

            <div className="text-xl font-black">
              FOOTBALL <span className="text-blue-700">SCORES</span>
              <p className="text-[10px] uppercase tracking-widest text-slate-400">
                Tournament central
              </p>
            </div>
          </div>

          <span className="text-xs font-bold text-emerald-700">
            ● Demo tournament
          </span>
        </div>

        <AdBanner ad={adverts[ad]} />

        <div className="mt-2 flex justify-center gap-2">
          {adverts.map((x, i) => (
            <button
              key={x.id}
              onClick={() => setAd(i)}
              className={`h-1.5 rounded-full ${
                i === ad ? "w-6 bg-blue-700" : "w-2 bg-slate-300"
              }`}
              aria-label={`Show advert ${i + 1}`}
            />
          ))}
        </div>

        {showEventPanel && (
          <div className="mt-3 rounded-xl border p-3">
            <div className="mb-2 flex items-center gap-2 text-xs font-bold">
              <Activity size={15} />
              Latest match event
              <span className="ml-auto text-slate-400">Last 60 seconds</span>
            </div>

            {!liveMatches.length ? (
              <p className="text-xs text-slate-500">No live matches.</p>
            ) : latestEvent ? (
              <div className="flex items-center gap-2 text-xs">
                <span className="shrink-0 text-base">
                  {getEventIcon(latestEvent.type)}
                </span>

                {getPlayerImage(latestEvent) ? (
                  <img
                    src={getPlayerImage(latestEvent)}
                    alt={getPlayerName(latestEvent)}
                    className="h-8 w-8 shrink-0 rounded-full object-cover"
                  />
                ) : (
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[10px] text-slate-400"
                    aria-label="Player photo unavailable"
                  >
                    {/* N/A */}
                  </span>
                )}

                <span className="min-w-0">
                  <span className="font-semibold">
                    {getPlayerName(latestEvent)}
                  </span>
                  {" · "}
                  {latestEvent.minute ?? "—"}'
                  {getTeamName(latestEvent, latestEvent.match) && (
                    <span className="text-slate-500">
                      {" "}
                      {getTeamName(latestEvent, latestEvent.match)}
                    </span>
                  )}
                </span>
              </div>
            ) : (
              <p className="text-xs text-slate-500">No recent events.</p>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
