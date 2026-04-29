import { NextResponse } from "next/server";
import { UserServices } from "@/service/userService";
import figlet from "figlet";

export async function getCurrentUserHandler() {
  const user = await UserServices.getCurrentUser();
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });
  const banner = figlet.textSync(user.name.toUpperCase(), { font: "ANSI Shadow" });
  return NextResponse.json({ ...user, banner });
}
