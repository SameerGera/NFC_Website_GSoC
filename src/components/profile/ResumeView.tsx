import { Member } from "@/types/member";

export default function ResumeView({ member }: { member: Member }) {
  return (
    <div className="hidden print:block text-black bg-white w-full max-w-4xl mx-auto p-10 font-sans">
      <style>{`
        @page { size: A4; margin: 15mm; }
        @media print {
          body { background: white !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
      `}</style>

      {/* Header */}
      <div className="flex items-center gap-6 border-b-2 border-gray-200 pb-6 mb-6">
        {member["profile Image"] && (
          <img
            src={member["profile Image"]}
            alt={member.name}
            className="w-24 h-24 rounded-full object-cover border-4 border-gray-100"
          />
        )}
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-gray-900 mb-1">{member.name}</h1>
          <h2 className="text-xl text-blue-600 font-semibold mb-2">
            {member.clubrole} {member.department ? `· ${member.department}` : ""}
          </h2>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600">
            {member.email && <span>📧 {member.email}</span>}
            {member.phone && <span>📱 {member.phone}</span>}
            {member.linkedin && <span>🔗 LinkedIn</span>}
            {member.github && <span>💻 GitHub</span>}
            {member.portfolio && <span>🌐 Portfolio</span>}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8">
        {/* Left Column (1/3) */}
        <div className="col-span-1 space-y-6">
          {member.bio && (
            <section>
              <h3 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-1 mb-2 uppercase tracking-wide">About Me</h3>
              <p className="text-sm text-gray-700 leading-relaxed">{member.bio}</p>
            </section>
          )}

          {member.skills && member.skills.length > 0 && (
            <section>
              <h3 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-1 mb-2 uppercase tracking-wide">Skills</h3>
              <div className="flex flex-wrap gap-1.5">
                {member.skills.map(skill => (
                  <span key={skill} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-md">
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {(member.year || member["registration number"]) && (
            <section>
              <h3 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-1 mb-2 uppercase tracking-wide">Details</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                {member.year && <li><strong>Year:</strong> {member.year}</li>}
                {member["registration number"] && <li><strong>Reg No:</strong> {member["registration number"]}</li>}
              </ul>
            </section>
          )}
        </div>

        {/* Right Column (2/3) */}
        <div className="col-span-2 space-y-6">
          {member.projects && member.projects.length > 0 && (
            <section>
              <h3 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-1 mb-3 uppercase tracking-wide">Projects</h3>
              <div className="space-y-4">
                {member.projects.map((proj, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h4 className="text-md font-bold text-gray-900">{proj.title}</h4>
                      <div className="text-xs text-blue-600 flex gap-2">
                        {proj.githubLink && <span>GitHub</span>}
                        {proj.liveDemo && <span>Live Demo</span>}
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mb-1">{proj.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {proj.technologies.map(tech => (
                        <span key={tech} className="text-[10px] uppercase text-gray-500 font-semibold tracking-wider">
                          {tech} {idx !== proj.technologies.length -1 ? "•" : ""}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {member.achievements && member.achievements.length > 0 && (
            <section>
              <h3 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-1 mb-3 uppercase tracking-wide">Achievements</h3>
              <div className="space-y-3">
                {member.achievements.map((ach, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between items-baseline">
                      <h4 className="text-md font-bold text-gray-900">{ach.title}</h4>
                      <span className="text-xs text-gray-500 font-medium">{ach.date}</span>
                    </div>
                    <p className="text-sm text-gray-700 font-medium text-blue-600 mb-0.5">{ach.event}</p>
                    {ach.description && <p className="text-sm text-gray-600">{ach.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {member.certificates && member.certificates.length > 0 && (
            <section>
              <h3 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-1 mb-3 uppercase tracking-wide">Certificates</h3>
              <div className="grid grid-cols-2 gap-4">
                {member.certificates.map((cert, idx) => (
                  <div key={idx} className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                    <h4 className="text-sm font-bold text-gray-900 leading-tight mb-1">{cert.name}</h4>
                    <p className="text-xs text-blue-600 font-medium mb-1">{cert.issuingOrganization}</p>
                    <p className="text-[10px] text-gray-500 uppercase tracking-wide">{cert.issueDate}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
