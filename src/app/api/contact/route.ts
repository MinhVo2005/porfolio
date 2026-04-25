import { NextRequest, NextResponse } from "next/server";
import { ContactService } from "@/services/contactService";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const submission = await ContactService.submit(body);
    return NextResponse.json(submission, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function GET() {
  try {
    const submissions = await ContactService.getAll();
    return NextResponse.json(submissions);
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
