import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-bg p-4">
      <div className="rounded-2xl bg-card border border-card-border p-8 text-center max-w-sm">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>
        </div>
        <h1 className="mb-2 text-lg font-bold text-text-primary">Member Not Found</h1>
        <p className="text-sm text-text-secondary">
          This member profile doesn&apos;t exist or may have been removed.
        </p>
        <Link
          href="/"
          className="mt-4 inline-block rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-light"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
