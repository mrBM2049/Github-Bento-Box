export function LanguageDeckTile({ topLanguages }) {
  const getSubLabel = (idx) => {
    if (idx === 0) return "Primary";
    if (idx === 1) return "Secondary";
    if (idx === 2) return "Tertiary";
    if (idx === 3) return "Supporting";
    return "Minor";
  };

  return (
    <div className="col-span-12 lg:col-span-8 min-h-[240px] rounded-bento overflow-hidden bg-canvas border border-prussian/10 shadow-sm flex flex-col justify-between">
      <div className="flex w-full h-full min-h-[240px]">
        {topLanguages.map((lang, index) => {
          const isOverlapping = index > 0;
          return (
            <div
              key={`${lang.name}-${index}`}
              style={{
                backgroundColor: lang.bg,
                color: lang.text,
                zIndex: index + 1,
              }}
              className={`flex-1 min-w-[70px] sm:min-w-[90px] p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 hover:flex-[1.4] cursor-default select-none ${
                isOverlapping
                  ? "-ml-5 sm:-ml-7 rounded-l-bento shadow-2xl border-l border-white/10"
                  : ""
              }`}
            >
              <div>
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider block opacity-70">
                  {getSubLabel(index)}
                </span>
                <span className="font-sans font-bold text-sm sm:text-base leading-tight block truncate mt-1">
                  {lang.name}
                </span>
              </div>

              <div>
                <div className="font-mono text-xl sm:text-2xl font-bold leading-none">
                  {lang.percentage}%
                </div>
                <div className="text-[10px] sm:text-xs font-mono opacity-80 mt-1 truncate">
                  {lang.count > 0 ? `${lang.count} repos` : lang.hex}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

