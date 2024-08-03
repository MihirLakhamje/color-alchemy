"use client";
import React, { useState } from "react";

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

export default function ColorPalette({
  _id,
  primaryColor,
  secondaryColor,
  accentColor,
  neutralColor,
}: PaletteProps) {
  const [isCopyCSSVar, setIsCopyCSSVar] = useState(false);
  const [isCopyJson, setIsCopyJson] = useState(false);
  return (
    <>
      <div className="card bg-base-100 sm:max-w-sm w-full shadow-xl" key={_id}>
        <div className="card-body p-5">
          <div className="flex flex-col rounded-md">
            <ColorItem color={primaryColor} className={"rounded-t-lg"} />
            <ColorItem color={secondaryColor} />
            <ColorItem color={accentColor} />
            <ColorItem color={neutralColor} className={"rounded-b-lg"} />
          </div>
          <div className="divider m-0"></div>
          <div className="card-actions justify-between">
            <div className="dropdown dropdown-right dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-xs btn-secondary btn-outline"
              >
                copy as
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-[1] w-36 p-2 shadow"
              >
                <li>
                  <button
                    onClick={async () => {
                      await navigator.clipboard.writeText(
                        `--primary: ${primaryColor};\n\t--secondary: ${secondaryColor};\n\t--accent: ${accentColor};\n\t--neutral: ${neutralColor};`
                      );
                      setIsCopyCSSVar(true);
                      setTimeout(() => {
                        setIsCopyCSSVar(false);
                      }, 1000);
                    }}
                  >
                    {isCopyCSSVar ? "Copied" : "CSS variable"}
                  </button>
                </li>
                <li>
                  <button
                    onClick={async () => {
                      const colorJson = {
                        primary: primaryColor,
                        secondary: secondaryColor,
                        accent: accentColor,
                        neutral: neutralColor,
                      };
                      await navigator.clipboard.writeText(
                        JSON.stringify(colorJson, null, 2)
                      );
                      setIsCopyJson(true);
                      setTimeout(() => {
                        setIsCopyJson(false);
                      }, 1000);
                    }}
                  >
                    {isCopyJson ? "Copied" : "JSON"}
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
