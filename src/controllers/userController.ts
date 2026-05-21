import { NextResponse } from "next/server";
import { UserServices } from "@/service/userService";
import figlet from "figlet";

export async function getCurrentUserHandler() {
  const t0 = performance.now();
  const user = await UserServices.getCurrentUser();
  console.log(`[api] db query: ${(performance.now() - t0).toFixed(1)}ms`);
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });
  const t1 = performance.now();
  const banner = figlet.textSync(user.name.toUpperCase(), { font: "ANSI Shadow" });
  return NextResponse.json({ ...user, banner });
}
