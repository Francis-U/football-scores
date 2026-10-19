export default function AdBanner({ ad }) {
  return (
    <div
      className={`ad-banner ad-${ad.theme} flex min-h-[92px] items-center justify-between gap-4 rounded-2xl px-5 py-4 sm:px-8`}
    >
      <div>
        <p className="text-[10px] font-black tracking-[.22em] opacity-75">
          {ad.brand}
        </p>
        <h2 className="mt-1 text-xl font-black sm:text-2xl">{ad.headline}</h2>
        <p className="mt-1 text-xs opacity-80">{ad.subline}</p>
      </div>
      <span className="hidden rounded-full border border-current/30 px-4 py-2 text-xs font-bold sm:block">
        SPONSOR SPOTLIGHT
      </span>
    </div>
  );
}
