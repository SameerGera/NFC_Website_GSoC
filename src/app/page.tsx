import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-card px-4">
      <main className="flex flex-col items-center gap-8 text-center max-w-sm">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          <svg className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-text-primary">
          GSOCK ID
        </h1>

        <p className="text-text-secondary">
          Digital identity platform for GSOCK club members. Tap your NFC-enabled
          ID card to view your profile.
        </p>

        <Link
          href="/admin/login"
          className="rounded-full border border-card-border bg-card px-6 py-3 font-medium text-text-primary transition hover:bg-primary-bg"
        >
          Admin Login
        </Link>
      </main>

      <footer className="mt-24 text-xs text-text-secondary">
        &copy; {new Date().getFullYear()} GSOCK Club. All rights reserved.
      </footer>
    </div>
  );
}
