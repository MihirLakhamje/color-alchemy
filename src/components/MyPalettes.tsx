"use client";
import axios, { isAxiosError } from "axios";
import React, { useEffect, useLayoutEffect, useState } from "react";
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

export default function MyPalettes() {
  const [isCopyCSSVar, setIsCopyCSSVar] = useState(false);
  const [isCopyJson, setIsCopyJson] = useState(false);
  const [palettes, setPalettes] = useState<PaletteProps[]>([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [error, setError] = useState("");
  const pageSize = 20;

  async function fetchPalettes(pageNumber: number) {
    try {
      const { data } = await axios.get(
        `/api/palettes/mypalette?page=${pageNumber}&pageSize=${pageSize}`
      );
      setPalettes(data?.palettesData);
      setTotalCount(data?.total);
      setError("");
    } catch (error) {
      if(isAxiosError(error)){
        setError(error.response?.data.message);
      }
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

  async function handleDelete(id: string) {
    try {
      await axios.delete(`/api/palettes/delete`, {data: {id}});
      fetchPalettes(page);
    } catch (error) {
      console.log("Error while deleting palette", error);
    }
  }
  

  return (
    <>
      <div className={error ? "" : "flex flex-col h-screen justify-between gap-5"}>
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
        {error ? (
          <div>
            <h2 className="text-xl font-bold">{error}</h2>
          </div>
            
        ):(
          <>
          
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
          </>
        )}
      </div>
    </>
  );
}
