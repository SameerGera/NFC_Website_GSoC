import { NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";

export async function GET() {
  try {
    const db = getAdminDb();
    const snapshot = await db.collection("members").get();
    const docs = snapshot.docs.map((d) => ({ id: d.id, fields: Object.keys(d.data()) }));
    return NextResponse.json({ count: docs.length, docs });
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 });
  }
}
