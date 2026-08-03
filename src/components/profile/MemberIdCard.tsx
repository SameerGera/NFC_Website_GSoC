"use client";

import { useState, useRef, MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Member } from "@/types/member";
import { QRCodeSVG } from "qrcode.react";

interface Props {
  member: Member;
}

export default function MemberIdCard({ member }: Props) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showCopied, setShowCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const hasImage = !!member["profile Image"] && !imgError;
  
  const profileUrl = `https://id.gsock.tech/member/${member.username}`;
  
  const cardRef = useRef<HTMLDivElement>(null);
  
  // 3D Tilt Effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);
  
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    const svg = document.querySelector("#qr-card-svg svg") as SVGElement | null;
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    canvas.width = 300;
    canvas.height = 300;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const img = new window.Image();
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

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
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
    <div 
      className="flex justify-center items-center py-2"
      style={{ perspective: 1200 }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" } as any}
        className="relative w-full max-w-[320px] aspect-[1.58]"
      >
        <motion.div
          onClick={() => setIsFlipped(!isFlipped)}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          style={{ transformStyle: "preserve-3d" } as any}
          className="w-full h-full cursor-pointer"
        >
          {/* Front Face */}
          <div 
            className="absolute inset-0 rounded-2xl overflow-hidden shadow-xl bg-card border border-card-border"
            style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: "rotateY(0deg) translateZ(1px)" } as any}
          >
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 opacity-10 bg-[linear-gradient(110deg,transparent_20%,var(--color-primary)_30%,transparent_40%,var(--color-accent)_60%,transparent_80%)] animate-[shimmer_3s_infinite_linear]" />
              <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
            </div>

            <div className="relative z-10 p-5 h-full flex flex-col justify-between text-text-primary bg-card/40 backdrop-blur-[2px]">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-surface rounded-lg flex items-center justify-center p-1 border border-card-border">
                    <img src="/gsoc-logo.jpeg" alt="GSOCK" className="w-full h-full object-contain rounded-md" />
                  </div>
                  <span className="font-bold tracking-widest text-xs opacity-90">GSOCK ID</span>
                </div>
                <div className="text-[10px] font-mono text-text-secondary tracking-wider uppercase">
                  ID: {member.username.substring(0, 10)}
                </div>
              </div>

              <div className="flex gap-4 items-end">
                <div className="w-16 h-16 rounded-full border-2 border-primary/20 bg-surface flex-shrink-0 flex items-center justify-center shadow-md overflow-hidden">
                  {hasImage ? (
                    <img 
                      key={member["profile Image"]}
                      src={member["profile Image"]!} 
                      alt={member.name} 
                      className="w-full h-full object-cover"
                      onError={() => setImgError(true)}
                    />
                  ) : (
                    <span className="text-2xl font-bold text-primary">{member.name.charAt(0)}</span>
                  )}
                </div>
                
                <div className="flex-1 pb-1">
                  <h3 className="font-bold text-lg leading-tight tracking-tight drop-shadow-sm">{member.name}</h3>
                  <p className="text-xs text-primary font-medium tracking-wide mt-0.5 drop-shadow-sm">{member.clubrole}</p>
                  {(member.department || member.year) && (
                    <p className="text-[10px] text-text-secondary mt-1 uppercase tracking-wider">
                      {member.department} {member.year && `· ${member.year}`}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="absolute top-1/2 right-4 -translate-y-1/2 flex flex-col items-center gap-1 opacity-40 hover:opacity-100 transition-opacity">
                <svg className="w-5 h-5 text-text-secondary animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                <span className="text-[8px] uppercase tracking-widest text-text-secondary">Tap to Flip</span>
              </div>
            </div>
          </div>

          {/* Back Face */}
          <div 
            className="absolute inset-0 rounded-2xl overflow-hidden shadow-xl bg-card border border-card-border flex flex-col items-center justify-center p-4"
            style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: "rotateY(180deg) translateZ(1px)" } as any}
          >
            <div className="text-xs font-bold text-text-primary mb-2 uppercase tracking-wider">Scan to Verify</div>
            
            <div id="qr-card-svg" className="bg-white p-2 rounded-xl shadow-sm border border-card-border">
              <QRCodeSVG
                value={profileUrl}
                size={110}
                bgColor="#FFFFFF"
                fgColor="#111827"
                level="M"
                includeMargin={false}
              />
            </div>
            
            <p className="text-[9px] text-text-secondary mt-2 text-center max-w-[200px] truncate">
              {profileUrl.replace('https://', '')}
            </p>

            <div className="flex gap-2 mt-3 w-full">
              <button
                onClick={handleDownload}
                className="flex-1 bg-primary text-white text-[10px] font-bold uppercase tracking-wider py-2 rounded-lg hover:bg-primary-light transition-colors"
              >
                {downloaded ? "Saved!" : "Save QR"}
              </button>
              <button
                onClick={handleShare}
                className="flex-1 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider py-2 rounded-lg hover:bg-primary/20 transition-colors"
              >
                {showCopied ? "Copied!" : "Share"}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
