export function SkeletonBento() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-5 animate-pulse w-full">
      <div className="col-span-12 md:col-span-2 lg:col-span-3 md:order-1 lg:order-none min-h-[220px] rounded-bento bg-dusk/20" />
      <div className="col-span-12 md:col-span-4 lg:col-span-5 md:order-2 lg:order-none min-h-[220px] rounded-bento bg-white/70" />
      <div className="col-span-12 md:col-span-3 lg:col-span-4 lg:row-span-2 md:order-4 lg:order-none min-h-[460px] rounded-bento bg-indigo/30" />
      <div className="col-span-12 md:col-span-6 lg:col-span-8 md:order-3 lg:order-none min-h-[240px] rounded-bento bg-dusk/20" />
      <div className="col-span-12 md:col-span-3 lg:col-span-4 md:order-6 lg:order-none min-h-[220px] rounded-bento bg-dusk/30" />
      <div className="col-span-12 md:col-span-3 lg:col-span-3 md:order-5 lg:order-none min-h-[220px] rounded-bento bg-indigo/20" />
      <div className="col-span-12 md:col-span-3 lg:col-span-5 md:order-7 lg:order-none min-h-[220px] rounded-bento bg-teal/30" />
    </div>
  );
}
