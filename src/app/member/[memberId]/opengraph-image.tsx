import { ImageResponse } from "next/og";
import { getMember } from "@/lib/get-member";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-dynamic";

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ memberId: string }>;
}) {
  const { memberId } = await params;
  let member = null;
  try {
    member = await getMember(memberId);
  } catch {
    member = null;
  }

  const status = member?.status ?? "Verified";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#F5F8FF",
          color: "#111827",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {member && status === "Verified" ? (
          <>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 32,
                marginBottom: 24,
              }}
            >
              {member["profile Image"] ? (
                <img
                  src={member["profile Image"]}
                  alt=""
                  width={120}
                  height={120}
                  style={{ borderRadius: 60, border: "4px solid rgba(59,130,246,0.3)" }}
                />
              ) : (
                <div
                  style={{
                    width: 120,
                    height: 120,
                    borderRadius: 60,
                    background: "#EFF6FF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 48,
                    color: "#3B82F6",
                    border: "4px solid rgba(59,130,246,0.3)",
                  }}
                >
                  {member.name?.charAt(0)}
                </div>
              )}
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: 48, fontWeight: 700, color: "#111827" }}>
                  {member.name}
                </span>
                <span style={{ fontSize: 24, color: "#3B82F6" }}>
                  {member.clubrole}
                </span>
                <span style={{ fontSize: 18, color: "#6B7280", marginTop: 4 }}>
                  {member.department} &middot; {member.username}
                </span>
              </div>
            </div>
            <span style={{ fontSize: 16, color: "#6B7280", marginTop: 16 }}>
              id.gsock.tech/member/{memberId}
            </span>
          </>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
            }}
          >
            <span style={{ fontSize: 64, fontWeight: 800, color: "#111827" }}>GSOCK ID</span>
            <span style={{ fontSize: 24, color: "#6B7280" }}>
              {member ? "Profile Not Available" : "Member Not Found"}
            </span>
            <span style={{ fontSize: 16, color: "#6B7280" }}>
              id.gsock.tech
            </span>
          </div>
        )}
      </div>
    ),
    { ...size }
  );
}
