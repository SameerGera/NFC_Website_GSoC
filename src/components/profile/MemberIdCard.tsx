"use client";

import { Member } from "@/types/member";
import { QRCodeSVG } from "qrcode.react";

interface Props {
  member: Member;
}

export default function MemberIdCard({ member }: Props) {
  const profileUrl = `https://id.gsock.tech/member/${member.memberId}`;

  const handleDownload = () => {
    const svg = document.querySelector("#qr-code svg") as SVGElement | null;
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    canvas.width = 300;
    canvas.height = 300;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const img = new Image();
    img.onload = () => {
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, 300, 300);
      ctx.drawImage(img, 0, 0, 300, 300);
      const a = document.createElement("a");
      a.download = `gsock-id-${member.memberId}.png`;
      a.href = canvas.toDataURL("image/png");
      a.click();
    };
    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: `${member.name} - GSOCK ID`,
        text: `View ${member.name}'s profile on GSOCK ID`,
        url: profileUrl,
      });
    } else {
      navigator.clipboard.writeText(profileUrl);
    }
  };

  return (
    <div className="rounded-2xl bg-card border border-card-border p-5">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
          <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
          </svg>
        </div>
        <h2 className="text-base font-semibold text-text-primary">Member ID Card</h2>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex-1">
          <div className="mb-3 flex h-32 w-32 items-center justify-center rounded-xl bg-white p-2 shadow-sm border border-card-border" id="qr-code">
            <QRCodeSVG
              value={profileUrl}
              size={112}
              bgColor="#FFFFFF"
              fgColor="#111827"
              level="M"
              includeMargin={false}
            />
          </div>
          <p className="mb-3 text-xs text-text-secondary">
            Scan this QR to view and verify this profile
          </p>
          <div className="flex gap-2">
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-white transition hover:bg-primary-light"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download QR
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 rounded-full border border-card-border bg-card px-4 py-2.5 text-sm font-medium text-text-primary transition hover:bg-primary-bg"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              Share Profile
            </button>
          </div>
        </div>
        <div className="hidden sm:block">
          <QRCodeSVG
            value={profileUrl}
            size={160}
            bgColor="#FFFFFF"
            fgColor="#111827"
            level="M"
            includeMargin={false}
          />
        </div>
      </div>
    </div>
  );
}
