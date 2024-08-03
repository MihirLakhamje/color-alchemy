"use client";
import axios from "axios";
import React from "react";
import { useState } from "react";
import Toast from "./Toast";
import { useRouter } from "next/navigation";
import ReCAPTCHA from "react-google-recaptcha";

interface ColorInputProps {
  color: string;
  handleColor: (color: React.ChangeEvent<HTMLInputElement>) => void;
}

function HexInput({ color, handleColor }: ColorInputProps) {
  return (
    <>
      <div className="flex gap-4 w-full">
        <input
          type="color"
          className="input focus:outline-none w-full p-0 border-0"
          value={color}
          onChange={handleColor}
        />
        <input
          type="text"
          className="input input-bordered w-28"
          value={color}
          onChange={handleColor}
        />
      </div>
    </>
  );
}

export default function ColorInput() {
  const [isChanged, setIsChanged] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [primaryColor, setPrimaryColor] = useState<string>("#aaaaaa");
  const [secondaryColor, setSecondaryColor] = useState<string>("#bbbbbb");
  const [accentColor, setAccentColor] = useState<string>("#cccccc");
  const [neutralColor, setNeutralColor] = useState<string>("#dddddd");
  const [capcha, setCapcha] = useState<string | null>();

  const [toast, setToast] = useState<string | null>(null);
  const { replace, refresh } = useRouter();
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = {
      primaryColor,
      secondaryColor,
      accentColor,
      neutralColor,
    };
    setLoading(true);
    try {
      if(!capcha) {
        setLoading(false);
        setToast("Please verify you are not a robot");
        setTimeout(() => setToast(null), 3000);
        return;
      }
      await axios.post("/api/palettes/create", data);
      setLoading(false);
      setToast("Palette created successfully");
      setTimeout(() => setToast(null), 3000);
      setPrimaryColor("#aaaaaa");
      setSecondaryColor("#bbbbbb");
      setAccentColor("#cccccc");
      setNeutralColor("#dddddd");
      setIsChanged(false);
      replace("/mypalettes");
      refresh();
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChanged(true);
    setPrimaryColor(e.target.value);
  };

  return (
    <>
      <div className="card-title">
        <h2 className="text-center">Create Palette</h2>
      </div>
      <form
        className="max-w-md w-full card-body p-5 justify-center items-center"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col items-center gap-4 w-full">
          <HexInput color={primaryColor} handleColor={handleChange} />
          <HexInput
            color={secondaryColor}
            handleColor={(e) => setSecondaryColor(e.target.value)}
          />
          <HexInput
            color={accentColor}
            handleColor={(e) => setAccentColor(e.target.value)}
          />
          <HexInput
            color={neutralColor}
            handleColor={(e) => setNeutralColor(e.target.value)}
          />
        </div>
        <ReCAPTCHA
          sitekey={process.env.NEXT_PUBLIC_RECAPCHA_SITE_KEY!} 
          className="mx-auto" 
          onChange={setCapcha}
        />
        <label className="form-control w-full max-w-sm mt-2">
          <button
            type="submit"
            className="btn btn-primary bt-sm"
            disabled={!isChanged || loading}
          >
            Continue
            {loading && <span className="loading loading-spinner"></span>}
          </button>
        </label>
      </form>

      {toast === "Palette created successfully" && (
        <Toast message={toast} type="success" />
      )}
    </>
  );
}
