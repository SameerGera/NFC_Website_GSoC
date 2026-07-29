import "server-only";

import { getAdminDb } from "@/lib/firebase-admin";
import { Member } from "@/types/member";

export async function getMember(memberId: string): Promise<Member | null> {
  try {
    const doc = await getAdminDb().collection("members").doc(memberId).get();
    if (!doc.exists) return null;
    const data = doc.data();
    if (!data) return null;
    return data as Member;
  } catch {
    return null;
  }
}
