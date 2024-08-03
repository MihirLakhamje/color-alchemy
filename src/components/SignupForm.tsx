"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import axios, { Axios, AxiosError, isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import Toast from "./Toast";
import ReCAPTCHA from "react-google-recaptcha";

interface IFormInput {
  email: string;
  password: string;
}
const signupSchema = yup.object({
  email: yup.string().email().required("Email is required"),
  password: yup.string().min(6).required("Password is required"),
});
export default function SignupForm() {
  const [capcha, setCapcha] = useState<string | null>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(signupSchema) });

  const [toast, setToast] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const { push } = useRouter();

  async function signupSubmit(input: IFormInput) {
    try {
      if(!capcha) {
        setLoading(false);
        setToast("Please verify you are not a robot");
        setTimeout(() => setToast(null), 3000);
        return;
      }
      setLoading(true);
      await axios.post("/api/users/signup", input);
      setLoading(false);
      push("/login");
    } catch (error) {
      setLoading(false);
      console.log(error);
      if(isAxiosError(error)) {
        if(error.response) {
          const { data } = error.response;
          console.log(data);
          if(data.message) {
            setToast(data.message);
            setTimeout(() => setToast(null), 3000);
          }
        }
      }
      else {
        setToast("Something went wrong");
        setTimeout(() => setToast(null), 3000);
      }
    }
  }
  return (
    <>
      <form
        className="max-w-sm w-full card-body p-5 justify-center"
        onSubmit={handleSubmit(signupSubmit)}
      >
        <div className="card-title">
          <h2 className="text-start">Signup</h2>
        </div>
        <label className="form-control w-full max-w-sm">
          <div className="label">
            <span className="label-text">Email</span>
          </div>
          <input
            placeholder="email address"
            className="input input-bordered w-full max-w-sm"
            {...register("email")}
          />
          {errors.email && (
            <div className="label">
              <span className="label-text-alt text-error">
                {errors.email.message}
              </span>
            </div>
          )}
        </label>
        <label className="form-control w-full max-w-sm">
          <div className="label">
            <span className="label-text">Password</span>
          </div>
          <input
            placeholder="atleast 6 characters"
            className="input input-bordered w-full max-w-sm"
            {...register("password")}
          />
          {errors.password && (
            <div className="label">
              <span className="label-text-alt text-error">
                {errors.password.message}
              </span>
            </div>
          )}
        </label>
        <label className="label">
          <a href="/login" className="label-text-alt link link-hover">
            Already have an account?
          </a>
        </label>
        <ReCAPTCHA 
          sitekey={process.env.NEXT_PUBLIC_RECAPCHA_SITE_KEY!} 
          className="mx-auto" 
          onChange={setCapcha}
        />
        <label className="form-control w-full max-w-sm mt-2">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            Continue
            {loading && <span className="loading loading-spinner"></span>}
          </button>
        </label>
      </form>
      
      {toast && <Toast message={toast} type="error" />}
    </>
  );
}
