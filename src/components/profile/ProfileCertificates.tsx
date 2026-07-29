import { Certificate } from "@/types/member";

interface Props {
  certificates?: Certificate[];
}

const orgColors: Record<string, string> = {
  google: "bg-blue-50 text-blue-600",
  meta: "bg-indigo-50 text-indigo-600",
  microsoft: "bg-cyan-50 text-cyan-600",
  default: "bg-primary/10 text-primary",
};

const getOrgStyle = (org: string) => {
  const lower = org.toLowerCase();
  return orgColors[lower] || orgColors.default;
};

export default function ProfileCertificates({ certificates }: Props) {
  if (!certificates || certificates.length === 0) return null;

  return (
    <div className="rounded-2xl bg-card border border-card-border p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10">
            <svg className="h-3.5 w-3.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h2 className="text-sm font-semibold text-text-primary">Certificates</h2>
        </div>
      </div>

      <div className="flex gap-2.5 overflow-x-auto hide-scrollbar pb-1 -mx-1 px-1">
        {certificates.map((cert, i) => (
          <div
            key={i}
            className="min-w-[180px] max-w-[180px] flex-shrink-0 rounded-xl bg-primary-bg/30 border border-card-border p-3 transition active:scale-[0.98]"
          >
            <div className={`mb-2 flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold ${getOrgStyle(cert.issuingOrganization)}`}>
              {cert.issuingOrganization.charAt(0)}
            </div>
            <h3 className="mb-0.5 text-[13px] font-semibold text-text-primary line-clamp-2">{cert.name}</h3>
            <p className="text-[11px] text-text-secondary">{cert.issuingOrganization}</p>
            <div className="mt-1.5 flex items-center justify-between">
              <span className="text-[10px] text-text-secondary">{cert.issueDate}</span>
              <svg className="h-3 w-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
