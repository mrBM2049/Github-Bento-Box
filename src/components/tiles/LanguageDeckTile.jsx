import { motion } from "framer-motion";
import { tileVariants } from "../../constants/motion";

export function LanguageDeckTile({ topLanguages }) {
  if (!topLanguages || topLanguages.length === 0) {
    return (
      <motion.div
        variants={tileVariants}
        className="col-span-12 md:col-span-6 lg:col-span-8 md:order-3 lg:order-none min-h-[220px] rounded-bento bg-white border border-prussian/10 p-6 flex items-center justify-center shadow-sm"
      >
        <span className="text-xs font-mono text-gh-gray-4 uppercase tracking-wider">
          No public languages detected
        </span>
      </motion.div>
    );
  }

  const getSubLabel = (idx) => {
    if (idx === 0) return "Primary";
    if (idx === 1) return "Secondary";
    if (idx === 2) return "Tertiary";
    if (idx === 3) return "Supporting";
    return "Language";
  };

  const isSingle = topLanguages.length === 1;

  return (
    <motion.div
      variants={tileVariants}
      className="col-span-12 md:col-span-6 lg:col-span-8 md:order-3 lg:order-none min-h-[220px] rounded-bento overflow-hidden bg-canvas border border-prussian/10 shadow-sm flex flex-col justify-between"
    >
      <div className="flex flex-col sm:flex-row w-full h-full min-h-[220px]">
        {topLanguages.map((lang, index) => {
          const isOverlapping = !isSingle && index > 0;
          return (
            <div
              key={`${lang.name}-${index}`}
              style={{
                backgroundColor: lang.bg,
                color: lang.text,
                zIndex: index + 1,
              }}
              className={`flex-1 min-w-0 p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 hover:flex-[1.4] cursor-default select-none min-h-[70px] sm:min-h-[220px] ${
                isSingle
                  ? "rounded-bento"
                  : isOverlapping
                  ? "-mt-3 sm:mt-0 sm:-ml-5 rounded-t-bento sm:rounded-t-none sm:rounded-l-bento shadow-2xl border-t sm:border-t-0 sm:border-l border-white/10"
                  : ""
              }`}
            >
              <div>
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider block opacity-75">
                  {getSubLabel(index)}
                </span>
                <span className="font-sans font-bold text-sm sm:text-base leading-tight block truncate mt-1">
                  {lang.name}
                </span>
              </div>

              <div className="flex sm:block items-baseline justify-between mt-2 sm:mt-0">
                <div className="font-mono text-xl sm:text-2xl font-bold leading-none">
                  {lang.percentage}%
                </div>
                <div className="text-[10px] sm:text-xs font-mono opacity-80 mt-1 truncate">
                  {lang.count} repos
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
