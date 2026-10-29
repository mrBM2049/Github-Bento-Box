import { useState } from "react";
import { motion } from "framer-motion";
import { tileVariants } from "../../constants/motion";

export function BrandMarkTile({ login }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!login) return;
    navigator.clipboard.writeText(`https://github.com/${login}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <motion.div
      variants={tileVariants}
      onClick={handleCopy}
      title="Click to copy profile URL"
      className="col-span-12 md:col-span-2 lg:col-span-3 md:order-1 lg:order-none min-h-[220px] rounded-bento bg-indigo text-white p-6 flex flex-col justify-between cursor-pointer transition-transform hover:-translate-y-0.5 duration-200 select-none relative"
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs tracking-wider text-teal font-semibold">OCTO // 01</span>
        <span className="w-2.5 h-2.5 rounded-full bg-teal animate-pulse" />
      </div>

      <div className="flex items-center justify-center my-auto">
        <div className="relative">
          <svg className="w-20 h-20 text-white" viewBox="0 0 80 80" fill="none">
            <rect x="22" y="6" width="36" height="68" rx="18" fill="currentColor" fillOpacity="0.12" />
            <rect x="6" y="22" width="68" height="36" rx="18" fill="currentColor" fillOpacity="0.12" />
            <path
              d="M40 14V66M14 40H66"
              stroke="currentColor"
              strokeWidth="9"
              strokeLinecap="round"
            />
            <circle cx="40" cy="40" r="7" fill="#0FBF3E" />
          </svg>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs font-mono">
        <span className="text-white/60">BRAND MARK</span>
        <span className="text-teal font-medium">
          {copied ? "URL COPIED ✓" : "CLICK TO COPY"}
        </span>
      </div>
    </motion.div>
  );
}
