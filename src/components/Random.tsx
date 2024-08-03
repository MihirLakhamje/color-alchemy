"use client";
import React, { useEffect, useState } from "react";
import chroma from "chroma-js";
import ColorPalette from "./ColorPalette";

interface ColorItemProps {
  color: string;
  className?: string;
}

interface PaletteProps {
  _id: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  neutralColor: string;
}

function ColorItem({ color, className }: ColorItemProps) {
  const [copy, setCopy] = useState("");
  return (
    <>
      <div
        className={`w-full h-8 flex justify-end ${className}`}
        style={{ backgroundColor: color }}
      >
        <div
          className={`text-xs  text-white h-full  flex items-center justify-end ${className}`}
        >
          <button
            className={`btn btn-sm text-xs btn-neutral w-20 rounded-none ${className} no-animation`}
            onClick={async () => {
              await navigator.clipboard.writeText(color);
              setCopy(color);
              setTimeout(() => {
                setCopy("");
              }, 1000);
            }}
          >
            {copy === color ? "Copied" : color}
          </button>
        </div>
      </div>
    </>
  );
}

export default function Random() {
  const [isCopyCSSVar, setIsCopyCSSVar] = useState(false);
  const [isCopyJson, setIsCopyJson] = useState(false);

  function getRandomColor() {
    return chroma.random().hex();
  }
  const [palette, setPalette] = useState<PaletteProps>({
    _id: "random",
    primaryColor: "#aaaaaa",
    secondaryColor: "#bbbbbb",
    accentColor: "#cccccc",
    neutralColor: "#dddddd",
  });
  const [paletteRandom, setPaletteRandom] = useState<PaletteProps>({
    _id: "random",
    primaryColor: "#bbbbbb",
    secondaryColor: "#cccccc",
    accentColor: "#dddddd",
    neutralColor: "#eeeeee",
  });

  function generatePalette() {
    const primary = chroma.random().hex();
    const secondary = chroma(primary).set("hsl.h", "+100").hex();
    const accent = chroma(primary).set("hsl.h", "-100").hex();
    const neutral = chroma.mix(primary, "white", 0.7, "hsl").hex();

    setPalette({
      _id: "random",
      primaryColor: primary,
      secondaryColor: secondary,
      accentColor: accent,
      neutralColor: neutral,
    });
  }
  function generateRandomPalette() {
    const primary = getRandomColor();
    const secondary = getRandomColor();
    const accent = getRandomColor();
    const neutral = getRandomColor();

    setPaletteRandom({
      _id: "random",
      primaryColor: primary,
      secondaryColor: secondary,
      accentColor: accent,
      neutralColor: neutral,
    });
  }

  useEffect(() => {
    generatePalette();
  }, []);
  useEffect(() => {
    generateRandomPalette();
  }, []);

  return (
    <>
      <div className="flex flex-wrap gap-5 justify-around items-center h-dvh">
        <div className="flex flex-col gap-5 max-w-sm w-full">
          <div className="flex items-center justify-between gap-5">
            <h2>Constructive Random Palette</h2>
            <button
              onClick={generatePalette}
              className="btn btn-primary btn-xs"
            >
              Generate
            </button>
          </div>
          <ColorPalette
            _id={palette?._id!}
            primaryColor={palette?.primaryColor!}
            secondaryColor={palette?.secondaryColor!}
            accentColor={palette?.accentColor!}
            neutralColor={palette?.neutralColor!}
          />
        </div>
        <div className="flex flex-col gap-5 max-w-sm w-full">
          <div className="flex items-center justify-between gap-5">
            <h2>Complete Random Palette</h2>
            <button
              onClick={generateRandomPalette}
              className="btn btn-primary btn-xs"
            >
              Generate
            </button>
          </div>
          <ColorPalette
            _id={palette?._id!}
            primaryColor={paletteRandom?.primaryColor!}
            secondaryColor={paletteRandom?.secondaryColor!}
            accentColor={paletteRandom?.accentColor!}
            neutralColor={paletteRandom?.neutralColor!}
          />
        </div>
      </div>
    </>
  );
}
