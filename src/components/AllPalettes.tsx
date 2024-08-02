"use client";
import axios from "axios";
import React, { useEffect, useLayoutEffect, useState } from "react";

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

interface AllPalettesProps {
  palettesData: PaletteProps[];
  total: number;
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

export default function AllPalettes() {
  const [isCopyCSSVar, setIsCopyCSSVar] = useState(false);
  const [isCopyJson, setIsCopyJson] = useState(false);
  const [palettes, setPalettes] = useState<PaletteProps[]>([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const pageSize = 20;

  async function fetchPalettes(pageNumber: number) {
    try {
      const { data } = await axios.get(
        `/api/palettes/all?page=${pageNumber}&pageSize=${pageSize}`
      );
      setPalettes(data?.palettesData);
      setTotalCount(data?.total);
    } catch (error) {
      console.log("Error while fetching palettes", error);
    }
  }
  useLayoutEffect(() => {
    fetchPalettes(page);
  }, [page]);

  const totalPages = Math.ceil(totalCount / pageSize);

  const handleNextPage = () => {
    if (page < totalPages) setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage((prevPage) => prevPage - 1);
  };

  return (
    <>
      <div className="flex flex-col h-screen justify-between gap-5">
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
          {palettes.map((palette) => (
            <div
              className="card bg-base-100  w-full shadow-xl"
              key={palette._id}
            >
              <div className="card-body p-5">
                <div className="flex flex-col rounded-md">
                  <ColorItem
                    color={palette.primaryColor.toUpperCase()}
                    className={"rounded-t-lg"}
                  />
                  <ColorItem color={palette.secondaryColor.toUpperCase()} />
                  <ColorItem color={palette.accentColor.toUpperCase()} />
                  <ColorItem
                    color={palette.neutralColor.toUpperCase()}
                    className={"rounded-b-lg"}
                  />
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
                              `--primary: ${palette.primaryColor};\n\t--secondary: ${palette.secondaryColor};\n\t--accent: ${palette.accentColor};\n\t--neutral: ${palette.neutralColor};`
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
                              primary: palette.primaryColor,
                              secondary: palette.secondaryColor,
                              accent: palette.accentColor,
                              neutral: palette.neutralColor,
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
          ))}
        </div>
        <div className="join grid grid-cols-2 max-w-xs mt-4 self-center">
          <button
            onClick={handlePreviousPage}
            disabled={page === 1}
            className="join-item btn btn-outline btn-primary"
          >
            Previous page
          </button>
          <button
            onClick={handleNextPage}
            disabled={page === totalPages}
            className="join-item btn btn-outline btn-primary"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}
