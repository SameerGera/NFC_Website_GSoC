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
        onClick={() => setIsFlipped(!isFlipped)}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" } as any}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="relative w-full max-w-[320px] aspect-[1.58] cursor-pointer"
      >
        {/* Front Face */}
        <div 
          className="absolute inset-0 rounded-2xl overflow-hidden shadow-xl"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Holographic background */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black z-0">
            <div className="absolute inset-0 opacity-30 bg-[linear-gradient(110deg,transparent_20%,rgba(59,130,246,0.3)_30%,transparent_40%,rgba(168,85,247,0.3)_60%,transparent_80%)] animate-[shimmer_3s_infinite_linear]" />
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
          </div>

          <div className="relative z-10 p-5 h-full flex flex-col justify-between text-white">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center p-1">
                  <img src="/gsoc-logo.jpeg" alt="GSOCK" className="w-full h-full object-contain rounded-md" />
                </div>
                <span className="font-bold tracking-widest text-xs opacity-90">GSOCK ID</span>
              </div>
              <div className="text-[10px] font-mono opacity-60 tracking-wider">
                ID: {member.username.toUpperCase().substring(0, 10)}
              </div>
            </div>

            <div className="flex gap-4 items-end">
              {member["profile Image"] ? (
                <img 
                  src={member["profile Image"]} 
                  alt={member.name} 
                  className="w-16 h-16 rounded-full object-cover border-2 border-white/20 shadow-md bg-gray-800"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-gray-700 border-2 border-white/20 flex items-center justify-center shadow-md">
                  <span className="text-2xl font-bold">{member.name.charAt(0)}</span>
                </div>
              )}
              
              <div className="flex-1 pb-1">
                <h3 className="font-bold text-lg leading-tight tracking-tight shadow-black/50 drop-shadow-md">{member.name}</h3>
                <p className="text-xs text-blue-300 font-medium tracking-wide shadow-black/50 drop-shadow-md">{member.clubrole}</p>
                {(member.department || member.year) && (
                  <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider">
                    {member.department} {member.year && `· ${member.year}`}
                  </p>
                )}
              </div>
            </div>
            
            <div className="absolute top-1/2 right-4 -translate-y-1/2 flex flex-col items-center gap-1 opacity-20 group-hover:opacity-100 transition-opacity">
              <svg className="w-6 h-6 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              <span className="text-[8px] uppercase tracking-widest">Tap to Flip</span>
            </div>
          </div>
        </div>

        {/* Back Face */}
        <div 
          className="absolute inset-0 rounded-2xl overflow-hidden shadow-xl bg-white border-2 border-gray-100 flex flex-col items-center justify-center p-4"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="text-xs font-bold text-gray-800 mb-2">Scan to Verify</div>
          
          <div id="qr-card-svg" className="bg-white p-2 rounded-xl shadow-sm border border-gray-100">
            <QRCodeSVG
              value={profileUrl}
              size={110}
              bgColor="#FFFFFF"
              fgColor="#111827"
              level="M"
              includeMargin={false}
            />
          </div>
          
          <p className="text-[9px] text-gray-400 mt-2 text-center max-w-[200px] truncate">
            {profileUrl.replace('https://', '')}
          </p>

          <div className="flex gap-2 mt-3 w-full">
            <button
              onClick={handleDownload}
              className="flex-1 bg-gray-900 text-white text-[10px] font-bold uppercase tracking-wider py-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              {downloaded ? "Saved!" : "Save QR"}
            </button>
            <button
              onClick={handleShare}
              className="flex-1 bg-blue-50 text-blue-600 border border-blue-100 text-[10px] font-bold uppercase tracking-wider py-2 rounded-lg hover:bg-blue-100 transition-colors"
            >
              {showCopied ? "Copied!" : "Share"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
