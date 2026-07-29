export default function Loading() {
  return (
    <div className="min-h-screen bg-bg">
      <div className="mx-auto max-w-lg px-4 pb-12">
        <div className="flex flex-col items-center gap-3 pt-6 pb-4">
          <div className="h-24 w-24 animate-pulse rounded-full bg-primary/10" />
          <div className="h-5 w-40 animate-pulse rounded-full bg-primary/10" />
          <div className="h-3 w-24 animate-pulse rounded-full bg-primary/10" />
          <div className="h-3 w-56 animate-pulse rounded-full bg-primary/10" />
        </div>

        <div className="mb-4 flex gap-2 rounded-full bg-card border border-card-border p-1">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-10 flex-1 animate-pulse rounded-full bg-primary/5" />
          ))}
        </div>

        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-2xl bg-card border border-card-border p-5">
              <div className="mb-3 flex items-center gap-2.5">
                <div className="h-8 w-8 animate-pulse rounded-full bg-primary/10" />
                <div className="h-4 w-20 animate-pulse rounded-full bg-primary/10" />
              </div>
              <div className="space-y-2">
                <div className="h-3 w-full animate-pulse rounded-full bg-primary/5" />
                <div className="h-3 w-3/4 animate-pulse rounded-full bg-primary/5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
