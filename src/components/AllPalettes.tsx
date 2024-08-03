"use client";
import axios from "axios";
import React, { useLayoutEffect, useState } from "react";
import ColorPalette from "./ColorPalette";

interface PaletteProps {
  _id: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  neutralColor: string;
}

export default function AllPalettes() {
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
            <ColorPalette 
              key={palette._id} 
              _id={palette._id} 
              primaryColor={palette.primaryColor.toUpperCase()} 
              secondaryColor={palette.secondaryColor.toUpperCase()} 
              accentColor={palette.accentColor.toUpperCase()} 
              neutralColor={palette.neutralColor.toUpperCase()}
            />
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
