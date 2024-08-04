import SignupForm from "@/components/SignupForm";
import { Metadata } from "next";

export const metadata:Metadata = {
  title: "Signup",
  description: "Signup to your account",
};

export default function SignupPage() {
  return (
    <>
      <div className="flex items-center justify-center card mt-20">
        <SignupForm />
      </div>
    </>
  );
}
