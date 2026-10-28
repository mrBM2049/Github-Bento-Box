export function SkeletonBento() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-5 animate-pulse">
      <div className="col-span-12 sm:col-span-6 lg:col-span-3 min-h-[220px] rounded-bento bg-dusk/20" />
      <div className="col-span-12 sm:col-span-6 lg:col-span-5 min-h-[220px] rounded-bento bg-white/70" />
      <div className="col-span-12 md:col-span-6 lg:col-span-4 lg:row-span-2 min-h-[460px] rounded-bento bg-indigo/30" />
      <div className="col-span-12 lg:col-span-8 min-h-[240px] rounded-bento bg-dusk/20" />
      <div className="col-span-12 sm:col-span-6 lg:col-span-4 min-h-[220px] rounded-bento bg-dusk/30" />
      <div className="col-span-12 sm:col-span-6 lg:col-span-3 min-h-[220px] rounded-bento bg-indigo/20" />
      <div className="col-span-12 lg:col-span-5 min-h-[220px] rounded-bento bg-teal/30" />
    </div>
  );
}

