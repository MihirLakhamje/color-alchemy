import dbConfig from "@/libs/dbConfig";
import Palette from "@/models/Palette";
import { NextRequest, NextResponse } from "next/server";

dbConfig();
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "10");

  const skip = (page - 1) * pageSize;
  try {
    const palettes = await Palette.aggregate([
      {
        $facet: {
          metadata: [{ $count: "total" }],
          data: [{ $skip: skip }, { $limit: pageSize }],
        },
      }
    ]);

    const total = palettes[0].metadata[0].total;
    const palettesData = palettes[0].data;
    return NextResponse.json({ total, palettesData }, { status: 200 });
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
