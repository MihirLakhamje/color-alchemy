"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios, { isAxiosError } from "axios";
import Toast from "./Toast";

interface IFormInput {
  email: string;
  password: string;
}

const loginSchema = yup.object({
  email: yup.string().email().required("Email is required"),
  password: yup.string().required("Password is required"),
});
export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const { refresh, replace } = useRouter();

  async function loginSubmit(input: IFormInput) {
    setLoading(true);
    try {
      await axios.post("/api/users/login", input);
      setLoading(false);
      replace("/");
      refresh();
    } catch (error) {
      setLoading(false);
      if(isAxiosError(error)) {
        if(error.response) {
          const { data } = error.response;
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
      <form className="max-w-sm w-full card-body p-5 justify-center" onSubmit={handleSubmit(loginSubmit)}>
        <div className="card-title">
          <h2 className="text-start">Login</h2>
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
              <span className="label-text-alt">{errors.email.message}</span>
            </div>
          )}
        </label>
        <label className="form-control w-full max-w-sm">
          <div className="label">
            <span className="label-text">Password</span>
          </div>
          <input
            placeholder="******"
            className="input input-bordered w-full max-w-sm"
            {...register("password")}
          />
          {errors.password && (
            <div className="label">
              <span className="label-text-alt">{errors.password.message}</span>
            </div>
          )}
        </label>
        <label className="label">
          <a href="/signup" className="label-text-alt link link-hover">
            Create an account?
          </a>
          <a href="/signup" className="label-text-alt link link-hover">
            Forgot password?
          </a>
        </label>
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
