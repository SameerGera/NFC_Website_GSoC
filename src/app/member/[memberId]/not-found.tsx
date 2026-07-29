import Link from "next/link";

export default function MemberNotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-bg px-4 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
        <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
      </div>

      <h1 className="text-2xl font-bold text-text-primary">Member Not Found</h1>
      <p className="text-text-secondary">
        The member ID you are looking for does not exist or may have been removed.
      </p>
      <Link
        href="/"
        className="rounded-full bg-primary px-6 py-3 font-medium text-white transition hover:bg-primary-light"
      >
        Go Home
      </Link>
    </div>
  );
}
