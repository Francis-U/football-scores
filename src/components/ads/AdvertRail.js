import { Megaphone } from "lucide-react";
export default function AdvertRail({ adverts }) {
  return (
    <aside className="min-w-0 space-y-4 lg:sticky lg:top-4 lg:self-start">
      <h2 className="flex items-center gap-2 px-1 text-sm font-extrabold">
        <Megaphone size={17} className="text-blue-700" /> Our partners
      </h2>
      {adverts.map((ad) => (
        <div
          key={ad.id}
          className={`side-ad ad-${ad.theme} rounded-2xl p-4 shadow-sm`}
        >
          <span className="text-[9px] font-black tracking-widest opacity-70">
            {ad.brand}
          </span>
          <h3 className="mt-4 text-xl font-black">{ad.headline}</h3>
          <p className="mt-2 text-xs opacity-80">{ad.subline}</p>
          <div className="mt-6 rounded-lg border border-current/30 px-3 py-2 text-center text-[10px] font-black">
            ADVERTISING SPACE
          </div>
        </div>
      ))}
    </aside>
  );
}
