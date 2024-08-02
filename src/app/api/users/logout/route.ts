
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
    try {
        cookies().set("session", "", { expires: new Date(0)});
        return NextResponse.json({ message: "User logged in successfully" }, { status: 200 });
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
