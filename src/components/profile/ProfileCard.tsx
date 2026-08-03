"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Member } from "@/types/member";
import ThemeToggle from "./ThemeToggle";
import AddToContactsButton from "./AddToContactsButton";

interface Props {
  member: Member;
}

const socialBtn =
  "flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-all duration-200 hover:bg-primary hover:text-white hover:shadow-lg hover:shadow-primary/25 active:scale-90";

export default function ProfileCard({ member }: Props) {
  const isVerified = member.status === "Verified";
  const [imgError, setImgError] = useState(false);
  const hasImage = !!member["profile Image"] && !imgError;

  return (
    <>
      <ThemeToggle />

      {/* Branding logo — top left */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, type: "spring" as const, stiffness: 300, damping: 25 }}
        className="fixed top-4 left-4 z-50"
      >
        <Image
          src="/gsoc-logo.jpeg"
          alt="GSOCK"
          width={28}
          height={28}
          className="h-7 w-7 rounded-lg object-contain opacity-70 transition-opacity hover:opacity-100"
          priority
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative flex flex-col items-center gap-3 pt-6 pb-5 rounded-3xl bg-card/60 border border-card-border shadow-xl"
      >
        {/* Avatar with pulsing ring + verified badge */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.15, type: "spring", stiffness: 300, damping: 25 }}
          className="relative"
        >
          {/* Pulsing golden ring */}
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 opacity-75 blur-sm animate-pulse" />
          <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500" />

          {/* Avatar */}
          <div className="relative h-24 w-24 overflow-hidden rounded-full border-[3px] border-card bg-card">
            {hasImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={member["profile Image"]!}
                alt={member.name}
                className="h-full w-full object-cover"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-3xl font-bold text-primary">
                {member.name?.charAt(0)}
              </div>
            )}
          </div>

          {/* Verified badge overlay */}
          {isVerified && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 500, damping: 20 }}
              className="absolute -bottom-0.5 -right-0.5 flex h-7 w-7 items-center justify-center rounded-full border-[2.5px] border-card bg-verified shadow-md"
            >
              <svg className="h-3.5 w-3.5 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </motion.div>
          )}
        </motion.div>

        {/* Name */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 20 }}
          className="text-center"
        >
          <h1 className="text-xl font-bold text-text-primary">{member.name}</h1>

          {/* Achievement stars */}
          {member.achievements && member.achievements.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="mt-1 flex items-center justify-center gap-0.5"
            >
              {member.achievements.slice(0, 10).map((_, i) => (
                <motion.svg
                  key={i}
                  initial={{ opacity: 0, scale: 0, rotate: -30 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{
                    delay: 0.4 + i * 0.06,
                    type: "spring" as const,
                    stiffness: 500,
                    damping: 15,
                  }}
                  className="h-3.5 w-3.5 text-amber-400 drop-shadow-[0_0_3px_rgba(251,191,36,0.5)]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 9H4.5a2.5 2.5 0 010-5H6" />
                  <path d="M18 9h1.5a2.5 2.5 0 000-5H18" />
                  <path d="M4 22h16" />
                  <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20 7 22" />
                  <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20 17 22" />
                  <path d="M18 2H6v7a6 6 0 0012 0V2Z" />
                </motion.svg>
              ))}
              {member.achievements.length > 10 && (
                <motion.span
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + 10 * 0.06, type: "spring" as const, stiffness: 500, damping: 15 }}
                  className="ml-1 text-[10px] font-semibold text-amber-500"
                >
                  +{member.achievements.length - 10}
                </motion.span>
              )}
            </motion.div>
          )}
        </motion.div>

        {/* Club role badge */}
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, type: "spring", stiffness: 300, damping: 20 }}
          className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary"
        >
          {member.clubrole}
        </motion.p>

        {/* Department + year */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center text-xs text-text-secondary leading-relaxed"
        >
          {member.department} Department, {member.year}
        </motion.p>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="flex items-center gap-3"
        >
          {member.github && (
            <motion.a
              href={member.github}
              target="_blank"
              rel="noopener noreferrer"
              className={socialBtn}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </motion.a>
          )}
          {member.linkedin && (
            <motion.a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={socialBtn}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </motion.a>
          )}
          {member.portfolio && (
            <motion.a
              href={member.portfolio}
              target="_blank"
              rel="noopener noreferrer"
              className={socialBtn}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </motion.a>
          )}
          {member.email && (
            <motion.a
              href={`mailto:${member.email}`}
              className={socialBtn}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </motion.a>
          )}
        </motion.div>

        {/* Add to Contacts button */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="w-full px-6"
        >
          <AddToContactsButton member={member} />
        </motion.div>
      </motion.div>
    </>
  );
}
