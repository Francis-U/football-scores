import { teams } from "./data";
export const getTeam = (id) => teams.find((t) => t.id === id);
export function sortMatches(list) {
  const rank = { live: 0, upcoming: 1, finished: 2 };
  return [...list].sort(
    (a, b) =>
      rank[a.status] - rank[b.status] ||
      (a.status === "finished"
        ? new Date(b.kickoff) - new Date(a.kickoff)
        : new Date(a.kickoff) - new Date(b.kickoff)),
  );
}
export function getStandings(group, matches) {
  const rows = teams
    .filter((t) => t.group === group)
    .map((team) => ({
      team,
      played: 0,
      won: 0,
      drawn: 0,
      lost: 0,
      gf: 0,
      ga: 0,
      pts: 0,
    }));
  matches
    .filter(
      (m) =>
        m.group === group && m.status === "finished" && m.homeScore != null,
    )
    .forEach((m) => {
      const h = rows.find((r) => r.team.id === m.home),
        a = rows.find((r) => r.team.id === m.away);
      h.played++;
      a.played++;
      h.gf += m.homeScore;
      h.ga += m.awayScore;
      a.gf += m.awayScore;
      a.ga += m.homeScore;
      if (m.homeScore > m.awayScore) {
        h.won++;
        h.pts += 3;
        a.lost++;
      } else if (m.homeScore < m.awayScore) {
        a.won++;
        a.pts += 3;
        h.lost++;
      } else {
        h.drawn++;
        a.drawn++;
        h.pts++;
        a.pts++;
      }
    });
  return rows.sort(
    (a, b) => b.pts - a.pts || b.gf - b.ga - (a.gf - a.ga) || b.gf - a.gf,
  );
}
