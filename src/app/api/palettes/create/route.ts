import { getSession } from "@/libs/auth";
import Palette from "@/models/Palette";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const session = await getSession()
    const { primaryColor, secondaryColor, accentColor, neutralColor } = body;
    if(!primaryColor || !secondaryColor || !accentColor || !neutralColor) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }
    if([primaryColor, secondaryColor, accentColor, neutralColor].some(color => !color.match(/^#([0-9a-f]{6})$/i))) {
      return NextResponse.json({ message: "Invalid color format" }, { status: 400 });
    }
    const userId = session?._id?.toString();
    const palette = await Palette.create({
      owner: userId,
      primaryColor,
      secondaryColor,
      accentColor,
      neutralColor,
    })

    if(!palette) {
      return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
    await palette.save();

    return NextResponse.json({ message: "Palette created successfully" }, { status: 201 });
  } catch (error) {
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
