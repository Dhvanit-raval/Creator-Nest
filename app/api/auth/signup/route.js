import { NextResponse } from "next/server";
import { createUser, findUserByEmail } from "@/lib/auth/users";

export const runtime = "nodejs";

export async function POST(request) {
  const body = await request.json();
  const email = String(body.email || "").trim();
  const password = String(body.password || "").trim();
  const name = String(body.name || "").trim();

  if (!name || !email || !password) {
    return NextResponse.json(
      { error: "Name, email, and password are required." },
      { status: 400 }
    );
  }

  if (password.length < 6) {
    return NextResponse.json(
      { error: "Password must be at least 6 characters." },
      { status: 400 }
    );
  }

  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    return NextResponse.json(
      { error: "An account with that email already exists." },
      { status: 409 }
    );
  }

  try {
    await createUser({ email, password, name });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Unable to create account. Please try again." },
      { status: 500 }
    );
  }
}
