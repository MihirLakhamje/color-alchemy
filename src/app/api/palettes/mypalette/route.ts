import { getSession } from "@/libs/auth";
import dbConfig from "@/libs/dbConfig";
import Palette from "@/models/Palette";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

dbConfig();
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "10");
  const session = await getSession();

  const skip = (page - 1) * pageSize;
  try {
    if (!session?._id) {
      return NextResponse.json(
        { message: "You are not logged in" },
        { status: 401 }
      );
    }
    const existPalette = await Palette.findOne({
      owner: session?._id,
    });

    if (!existPalette) {
      return NextResponse.json(
        { message: "You don't have any palette" },
        { status: 404 }
      );
    }
    const palettes = await Palette.aggregate([
      {
        $match: { owner: new mongoose.Types.ObjectId(session?._id as string) },
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $facet: {
          metadata: [{ $count: "total" }],
          data: [{ $skip: skip }, { $limit: pageSize }],
        },
      },
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
