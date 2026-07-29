import { Achievement } from "@/types/member";

interface Props {
  achievements: Achievement[];
}

export default function ProfileAchievements({ achievements }: Props) {
  if (!achievements || achievements.length === 0) return null;

  return (
    <div className="rounded-2xl bg-card border border-card-border p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
            <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
          </div>
          <h2 className="text-base font-semibold text-text-primary">Achievements</h2>
        </div>
        <span className="text-xs text-primary">View all</span>
      </div>

      <div className="space-y-3">
        {achievements.map((achievement, i) => (
          <div
            key={i}
            className="flex items-start gap-3 rounded-xl bg-primary-bg/30 border border-card-border p-3"
          >
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
              <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-text-primary">{achievement.title}</p>
              <p className="text-xs text-text-secondary">
                {achievement.event}{achievement.date ? ` • ${achievement.date}` : ""}
              </p>
              {achievement.description && (
                <p className="mt-1 text-xs text-text-secondary">{achievement.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
