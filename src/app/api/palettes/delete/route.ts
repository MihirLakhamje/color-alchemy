import dbConfig from "@/libs/dbConfig";
import Palette from "@/models/Palette";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  try {
    await dbConfig();
    await Palette.findByIdAndDelete(id);
    return NextResponse.json({
      message: "Palette deleted successfully",
    });
  } catch (error) {
    return NextResponse.json({
      message: "Something went wrong",
      error,
    });
  }
}