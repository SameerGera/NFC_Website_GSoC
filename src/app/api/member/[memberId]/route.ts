import { NextRequest, NextResponse } from "next/server";
import { getMember } from "@/lib/get-member";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ memberId: string }> }
) {
  const { memberId } = await params;

  try {
    const member = await getMember(memberId);

    if (!member) {
      return NextResponse.json({ error: "Member not found" }, { status: 404 });
    }

    if (member.status !== "Verified") {
      return NextResponse.json(
        { error: "Member profile is not active" },
        { status: 403 }
      );
    }

    return NextResponse.json(member, {
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
