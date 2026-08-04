"use client";

import { motion } from "framer-motion";
import { Member } from "@/types/member";

interface Props {
  member: Member;
}

export default function AddToContactsButton({ member }: Props) {
  const handleAddContact = () => {
    const profileUrl = `https://id.gsock.tech/member/${member.username}`;

    // Build vCard 3.0 string
    const lines: string[] = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `FN:${member.name}`,
      `N:${formatName(member.name)}`,
    ];

    if (member.clubrole) {
      lines.push(`TITLE:${member.clubrole}`);
    }

    lines.push("ORG:GSOCK Club");

    if (member.department) {
      lines.push(`X-DEPARTMENT:${member.department}`);
    }

    if (member.email) {
      lines.push(`EMAIL;TYPE=WORK:${member.email}`);
    }

    if (member.phone) {
      lines.push(`TEL;TYPE=CELL:${member.phone}`);
    }

    if (member.linkedin) {
      lines.push(`URL;TYPE=LinkedIn:${member.linkedin}`);
    }

    if (member.github) {
      lines.push(`URL;TYPE=GitHub:${member.github}`);
    }

    if (member.portfolio) {
      lines.push(`URL;TYPE=Portfolio:${member.portfolio}`);
    }

    lines.push(`URL:${profileUrl}`);

    if (member.bio) {
      // Escape newlines and special chars for vCard
      lines.push(`NOTE:${member.bio.replace(/\n/g, "\\n").replace(/,/g, "\\,")}`);
    }

    // Add profile photo if available (as a URL reference)
    if (member["profile Image"]) {
      lines.push(`PHOTO;VALUE=URI:${member["profile Image"]}`);
    }

    lines.push("END:VCARD");

    const vcf = lines.join("\r\n");
    const blob = new Blob([vcf], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${member.name.replace(/\s+/g, "_")}.vcf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <motion.button
      onClick={handleAddContact}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3 text-sm font-medium text-white shadow-lg shadow-primary/20 transition-colors hover:bg-primary-light active:shadow-md"
    >
      <svg
        className="h-[18px] w-[18px]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
        />
      </svg>
      Add to Contacts
    </motion.button>
  );
}

/** Converts "John Doe" → "Doe;John;;;" for vCard N field */
function formatName(fullName: string): string {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 1) return `${parts[0]};;;;`;
  const last = parts.pop()!;
  const first = parts.join(" ");
  return `${last};${first};;;`;
}
