import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { createUser } from "@/lib/database";

export const runtime = "nodejs";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, surname, age, email, password } = body as Record<string, unknown>;
  if (
    typeof name !== "string" ||
    typeof surname !== "string" ||
    (typeof age !== "number" && typeof age !== "string") ||
    typeof email !== "string" ||
    typeof password !== "string"
  ) {
    return NextResponse.json(
      { error: "First name, last name, age, email, and password are required." },
      { status: 400 },
    );
  }

  const normalizedName = name.trim();
  const normalizedSurname = surname.trim();
  const parsedAge = typeof age === "number" ? age : Number(age);
  const normalizedEmail = email.trim().toLowerCase();
  if (
    normalizedName.length < 2 ||
    normalizedName.length > 80 ||
    normalizedSurname.length < 2 ||
    normalizedSurname.length > 80 ||
    !Number.isInteger(parsedAge) ||
    parsedAge < 1 ||
    parsedAge > 120 ||
    normalizedEmail.length > 254 ||
    !emailPattern.test(normalizedEmail) ||
    password.length < 8 ||
    Buffer.byteLength(password, "utf8") > 72
  ) {
    return NextResponse.json(
      {
        error:
          "Use first and last names with 2–80 characters, an age from 1 to 120, a valid email, and a password with 8–72 bytes.",
      },
      { status: 400 },
    );
  }

  try {
    const passwordHash = await bcrypt.hash(password, 12);
    const userId = await createUser(
      normalizedName,
      normalizedSurname,
      parsedAge,
      normalizedEmail,
      passwordHash,
    );
    if (!userId) {
      return NextResponse.json(
        { error: "An account with this email already exists." },
        { status: 409 },
      );
    }

    return NextResponse.json(
      {
        user: {
          id: userId,
          name: normalizedName,
          surname: normalizedSurname,
          age: parsedAge,
          email: normalizedEmail,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Failed to create Supabase account:", error);
    return NextResponse.json(
      { error: "Unable to create the account right now." },
      { status: 500 },
    );
  }
}
