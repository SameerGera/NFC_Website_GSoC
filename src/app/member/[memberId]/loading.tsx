export default function Loading() {
  return (
    <div className="min-h-[100dvh] bg-bg">
      <div className="mx-auto max-w-xl px-3 pb-8 sm:px-4 sm:max-w-2xl">
        <div className="flex flex-col items-center gap-2 pt-4 pb-3">
          <div className="h-20 w-20 animate-pulse rounded-full bg-primary/10" />
          <div className="h-4 w-36 animate-pulse rounded-full bg-primary/10" />
          <div className="h-3 w-28 animate-pulse rounded-full bg-primary/10" />
          <div className="h-3 w-48 animate-pulse rounded-full bg-primary/10" />
        </div>

        <div className="mb-3 flex gap-1 rounded-2xl bg-card border border-card-border p-1">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-9 flex-1 animate-pulse rounded-xl bg-primary/5" />
          ))}
        </div>

        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-2xl bg-card border border-card-border p-4">
              <div className="mb-2.5 flex items-center gap-2.5">
                <div className="h-7 w-7 animate-pulse rounded-full bg-primary/10" />
                <div className="h-3.5 w-20 animate-pulse rounded-full bg-primary/10" />
              </div>
              <div className="space-y-1.5">
                <div className="h-2.5 w-full animate-pulse rounded-full bg-primary/5" />
                <div className="h-2.5 w-3/4 animate-pulse rounded-full bg-primary/5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
