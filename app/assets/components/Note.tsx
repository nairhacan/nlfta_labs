export default function Note({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-6 my-8 backdrop-blur-sm">
      <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-indigo-400 to-indigo-600"></div>
      <div className="flex items-start gap-4">
        <div className="mt-1 flex-shrink-0">
          <svg className="h-5 w-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="text-[1.05rem] leading-relaxed text-indigo-100/90 font-medium italic">
          {children}
        </div>
      </div>
    </div>
  );
}
