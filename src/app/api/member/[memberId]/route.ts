import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ memberId: string }> }
) {
  const { memberId } = await params;

  try {
    const doc = await getAdminDb().collection("members").doc(memberId).get();

    if (!doc.exists) {
      return NextResponse.json({ error: "Member not found" }, { status: 404 });
    }

    const data = doc.data();

    if (data?.status !== "Verified") {
      return NextResponse.json(
        { error: "Member profile is not active" },
        { status: 403 }
      );
    }

    return NextResponse.json({ id: doc.id, ...data }, {
      headers: {
        "Cache-Control": "public, max-age=60, s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
