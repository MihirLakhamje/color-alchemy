import Random from "@/components/Random";
import { Metadata } from "next";
import React from "react";

export const metadata:Metadata = {
  title: "Random",
  description: "Generate a random color palette and copy it to your clipboard.",
  keywords: ["random", "color", "palette", "generator", "randomize", "colorize", "constructive random", "constructive color palettes"],
};

export default function RandomPages() {
  return (
    <>
      <Random />
    </>
  );
}
