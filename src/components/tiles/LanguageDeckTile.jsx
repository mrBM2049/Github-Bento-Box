import { motion } from "framer-motion";
import { tileVariants } from "../../constants/motion";

export function LanguageDeckTile({ topLanguages }) {
  const getSubLabel = (idx) => {
    if (idx === 0) return "Primary";
    if (idx === 1) return "Secondary";
    if (idx === 2) return "Tertiary";
    if (idx === 3) return "Supporting";
    return "Minor";
  };

  return (
    <motion.div
      variants={tileVariants}
      className="col-span-12 md:col-span-6 lg:col-span-8 md:order-3 lg:order-none min-h-[240px] rounded-bento overflow-hidden bg-canvas border border-prussian/10 shadow-sm flex flex-col justify-between"
    >
      <div className="flex flex-col sm:flex-row w-full h-full min-h-[240px]">
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
              className={`flex-1 min-w-0 p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 hover:flex-[1.4] cursor-default select-none min-h-[70px] sm:min-h-[240px] ${
                isOverlapping
                  ? "-mt-4 sm:mt-0 sm:-ml-7 rounded-t-bento sm:rounded-t-none sm:rounded-l-bento shadow-2xl border-t sm:border-t-0 sm:border-l border-white/10"
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

              <div className="flex sm:block items-baseline justify-between mt-2 sm:mt-0">
                <div className="font-mono text-xl sm:text-2xl font-bold leading-none">
                  {lang.percentage > 0 ? `${lang.percentage}%` : lang.hex}
                </div>
                <div className="text-[10px] sm:text-xs font-mono opacity-80 mt-1 truncate">
                  {lang.count > 0 ? `${lang.count} repos` : "Palette Swatch"}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
