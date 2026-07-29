"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Member } from "@/types/member";
import { QRCodeSVG } from "qrcode.react";

interface Props {
  member: Member;
}

export default function MemberIdCard({ member }: Props) {
  const [showCopied, setShowCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const profileUrl = `https://id.gsock.tech/member/${member.username}`;

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
      a.download = `gsock-id-${member.username}.png`;
      a.href = canvas.toDataURL("image/png");
      a.click();
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 2000);
    };
    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${member.name} - GSOCK ID`,
          text: `Check out ${member.name}'s profile on GSOCK ID`,
          url: profileUrl,
        });
      } catch {
        await navigator.clipboard.writeText(profileUrl);
        setShowCopied(true);
        setTimeout(() => setShowCopied(false), 2000);
      }
    } else {
      await navigator.clipboard.writeText(profileUrl);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.3 }}
      className="rounded-2xl bg-card border border-card-border p-4"
    >
      <div className="mb-3 flex items-center gap-2.5">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10">
          <svg className="h-3.5 w-3.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
          </svg>
        </div>
        <h2 className="text-sm font-semibold text-text-primary">Member ID Card</h2>
      </div>

      <div className="flex flex-col items-center gap-3">
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 400, damping: 30 }}
          className="flex h-36 w-36 items-center justify-center rounded-xl bg-white p-2 shadow-sm border border-card-border"
          id="qr-code"
        >
          <QRCodeSVG
            value={profileUrl}
            size={128}
            bgColor="#FFFFFF"
            fgColor="#111827"
            level="M"
            includeMargin={false}
          />
        </motion.div>
        <p className="text-[11px] text-text-secondary">
          Scan this QR to view and verify this profile
        </p>
        <div className="flex w-full gap-2">
          <motion.button
            onClick={handleDownload}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.02 }}
            className="group flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-primary px-3 py-2.5 text-xs font-medium text-white transition-colors duration-200 hover:bg-primary-light hover:shadow-lg hover:shadow-primary/25"
          >
            <svg className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {downloaded ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              )}
            </svg>
            {downloaded ? "Saved!" : "Download QR"}
          </motion.button>
          <motion.button
            onClick={handleShare}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.02 }}
            className="group flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-card-border bg-card px-3 py-2.5 text-xs font-medium text-text-primary transition-colors duration-200 hover:bg-primary/5 hover:border-primary/30 hover:text-primary"
          >
            <motion.svg
              animate={showCopied ? { rotate: [0, -10, 10, -5, 5, 0] } : {}}
              transition={{ duration: 0.5 }}
              className="h-3.5 w-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              {showCopied ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              )}
            </motion.svg>
            {showCopied ? "Copied!" : "Share Profile"}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
