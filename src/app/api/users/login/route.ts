import { NextRequest, NextResponse } from "next/server";
import dbConfig from "@/libs/dbConfig";
import User from "@/models/User";
import bcryptjs from "bcryptjs";
import { encrypt } from "@/libs/auth";
import { cookies } from "next/headers";

function setCookie(key: string, value: string, options: any) {
  return cookies().set(key, value, options);
}

export async function POST(request: NextRequest) {
  await dbConfig();
  try {
    const body = await request.json();
    const { email, password } = body;
    if (!email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const isPasswordCorrect = await bcryptjs.compare(password, user.password);
    if (!isPasswordCorrect) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const expires = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000);
    const session = await encrypt({
      _id: user?._id,
      email: user?.email,
      role: user?.role,
    });

    const options = { expires };
    setCookie("session", session, options);

    return NextResponse.json(
      { message: "User logged in successfully" },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: "Something went wrong", error: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
