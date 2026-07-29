interface Props {
  bio: string;
}

export default function ProfileAbout({ bio }: Props) {
  if (!bio) return null;

  return (
    <div className="rounded-2xl bg-card border border-card-border p-5">
      <div className="mb-3 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
          <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <h2 className="text-base font-semibold text-text-primary">About Me</h2>
      </div>
      <p className="text-sm leading-relaxed text-text-secondary">{bio}</p>
    </div>
  );
}
