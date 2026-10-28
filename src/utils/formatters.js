export function formatNumber(num) {
  if (num == null) return "0";
  if (num >= 1000000) return `${(num / 1000000).toFixed(1).replace(/\.0$/, "")}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  return String(num);
}

export function formatYear(dateStr) {
  if (!dateStr) return new Date().getFullYear();
  return new Date(dateStr).getFullYear();
}

