"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Cropper from "react-easy-crop";

interface Area {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface Point {
  x: number;
  y: number;
}

interface Props {
  file: File;
  onConfirm: (blob: Blob) => void;
  onCancel: () => void;
}

type Tab = "crop" | "adjust" | "background";

const overlays = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const panel = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring" as const, stiffness: 400, damping: 30 } },
  exit: { opacity: 0, y: 40, scale: 0.95, transition: { duration: 0.15 } },
};

export default function ImageEditor({ file, onConfirm, onCancel }: Props) {
  const [imageUrl] = useState(() => URL.createObjectURL(file));
  const [tab, setTab] = useState<Tab>("crop");

  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [aspect, setAspect] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);

  const [removingBg, setRemovingBg] = useState(false);
  const [bgRemoved, setBgRemoved] = useState(false);
  const [processedUrl, setProcessedUrl] = useState<string | null>(null);

  const onCropComplete = useCallback((_: Area, areaPixels: Area) => {
    setCroppedAreaPixels(areaPixels);
  }, []);

  const getCroppedImg = async (): Promise<Blob> => {
    const canvas = document.createElement("canvas");
    const img = new Image();
    img.src = processedUrl || imageUrl;
    await new Promise((r) => { img.onload = r; });

    if (!croppedAreaPixels) {
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d")!;
      ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`;
      ctx.drawImage(img, 0, 0);
    } else {
      canvas.width = croppedAreaPixels.width;
      canvas.height = croppedAreaPixels.height;
      const ctx = canvas.getContext("2d")!;
      ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`;
      ctx.drawImage(
        img,
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
        0,
        0,
        croppedAreaPixels.width,
        croppedAreaPixels.height
      );
    }

    return new Promise((resolve) => {
      canvas.toBlob((blob) => resolve(blob!), "image/jpeg", 0.92);
    });
  };

  const handleRemoveBg = async () => {
    setRemovingBg(true);
    try {
      const { removeBackground } = await import("@imgly/background-removal");
      const blob = await removeBackground(file);
      const url = URL.createObjectURL(blob);
      setProcessedUrl(url);
      setBgRemoved(true);
    } catch {
      alert("Background removal failed. Try again.");
    } finally {
      setRemovingBg(false);
    }
  };

  const handleConfirm = async () => {
    const blob = await getCroppedImg();
    onConfirm(blob);
    URL.revokeObjectURL(imageUrl);
    if (processedUrl) URL.revokeObjectURL(processedUrl);
  };

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    {
      id: "crop",
      label: "Crop",
      icon: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h4a1 1 0 010 2H6v3a1 1 0 01-2 0V5zM20 19a1 1 0 01-1 1h-4a1 1 0 010-2h3v-3a1 1 0 012 0v4z" />
        </svg>
      ),
    },
    {
      id: "adjust",
      label: "Adjust",
      icon: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      ),
    },
    {
      id: "background",
      label: "BG Remove",
      icon: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      ),
    },
  ];

  const aspectRatios = [
    { label: "1:1", value: 1 },
    { label: "4:5", value: 4 / 5 },
    { label: "3:4", value: 3 / 4 },
    { label: "Free", value: 0 },
  ];

  const filterStyle = tab === "adjust" ? `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)` : undefined;

  return (
    <AnimatePresence>
      <motion.div
        variants={overlays}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center"
      >
        <div className="absolute inset-0 bg-black/60" onClick={onCancel} />

        <motion.div
          variants={panel}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="relative z-10 w-full max-w-lg rounded-t-3xl sm:rounded-3xl bg-card border border-card-border shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-card-border px-4 py-3">
            <h3 className="text-sm font-semibold text-text-primary">Edit Photo</h3>
            <button onClick={onCancel} className="text-text-secondary hover:text-text-primary transition-colors">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Preview */}
          <div className="relative aspect-square w-full bg-black/5 overflow-hidden">
            {tab === "crop" ? (
              <Cropper
                image={processedUrl || imageUrl}
                crop={crop}
                zoom={zoom}
                aspect={aspect || undefined}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
                cropShape="round"
                style={{
                  containerStyle: { borderRadius: "1rem" },
                }}
              />
            ) : (
              <img
                src={processedUrl || imageUrl}
                alt="Preview"
                className="h-full w-full object-contain"
                style={tab === "adjust" ? { filter: filterStyle } : undefined}
              />
            )}

            {removingBg && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <div className="flex flex-col items-center gap-2">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  <span className="text-xs text-white">Removing background...</span>
                </div>
              </div>
            )}
          </div>

          {/* Tab bar */}
          <div className="flex border-b border-card-border">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex flex-1 items-center justify-center gap-1.5 py-2.5 text-xs font-medium transition-colors ${
                  tab === t.id
                    ? "text-primary border-b-2 border-primary"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {t.icon}
                {t.label}
              </button>
            ))}
          </div>

          {/* Controls */}
          <div className="px-4 py-3">
            {tab === "crop" && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-text-secondary shrink-0">Zoom</span>
                  <input
                    type="range"
                    min={1}
                    max={3}
                    step={0.01}
                    value={zoom}
                    onChange={(e) => setZoom(Number(e.target.value))}
                    className="w-full accent-primary"
                  />
                  <span className="text-xs text-text-secondary w-8 text-right">{zoom.toFixed(1)}x</span>
                </div>
                <div className="flex gap-2">
                  {aspectRatios.map((ar) => (
                    <button
                      key={ar.label}
                      onClick={() => setAspect(ar.value)}
                      className={`flex-1 rounded-xl py-1.5 text-xs font-medium transition-all ${
                        aspect === ar.value
                          ? "bg-primary text-white"
                          : "bg-primary/10 text-primary hover:bg-primary/20"
                      }`}
                    >
                      {ar.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {tab === "adjust" && (
              <div className="space-y-3">
                {[
                  { label: "Brightness", value: brightness, set: setBrightness },
                  { label: "Contrast", value: contrast, set: setContrast },
                  { label: "Saturation", value: saturation, set: setSaturation },
                ].map((s) => (
                  <div key={s.label} className="flex items-center gap-2">
                    <span className="text-xs text-text-secondary shrink-0 w-16">{s.label}</span>
                    <input
                      type="range"
                      min={50}
                      max={150}
                      value={s.value}
                      onChange={(e) => s.set(Number(e.target.value))}
                      className="w-full accent-primary"
                    />
                    <span className="text-xs text-text-secondary w-8 text-right">{s.value}%</span>
                  </div>
                ))}
                <button
                  onClick={() => { setBrightness(100); setContrast(100); setSaturation(100); }}
                  className="w-full rounded-xl bg-primary/10 py-1.5 text-xs font-medium text-primary hover:bg-primary/20 transition-colors"
                >
                  Reset
                </button>
              </div>
            )}

            {tab === "background" && (
              <div className="space-y-3">
                {bgRemoved ? (
                  <div className="flex items-center gap-2 rounded-xl bg-green-50 dark:bg-green-500/10 p-3">
                    <svg className="h-4 w-4 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-xs text-green-600 dark:text-green-400">Background removed</span>
                    <button
                      onClick={() => { setBgRemoved(false); setProcessedUrl(null); }}
                      className="ml-auto text-xs text-green-600 dark:text-green-400 underline"
                    >
                      Undo
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleRemoveBg}
                    disabled={removingBg}
                    className="w-full rounded-xl bg-primary/10 py-3 text-xs font-medium text-primary hover:bg-primary/20 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {removingBg ? (
                      <>
                        <div className="h-3 w-3 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Remove Background
                      </>
                    )}
                  </button>
                )}
                <p className="text-[10px] text-text-secondary text-center">
                  Runs entirely in your browser — no data sent to servers
                </p>
              </div>
            )}
          </div>

          {/* Confirm */}
          <div className="flex gap-3 border-t border-card-border px-4 py-3">
            <button
              onClick={onCancel}
              className="flex-1 rounded-2xl border border-card-border bg-card py-2.5 text-xs font-medium text-text-primary hover:bg-primary/5 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={removingBg}
              className="flex-1 rounded-2xl bg-primary py-2.5 text-xs font-medium text-white hover:bg-primary-light transition-colors disabled:opacity-50"
            >
              Confirm
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
