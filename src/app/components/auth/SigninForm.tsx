"use client";

import React, { useState } from "react";
import Input from "../Input";
import Button from "../Button";
import Link from "next/link";
import { createClient } from "@/app/utils/supabase/clientApp";
import { useRouter } from "next/navigation";

const SigninForm = () => {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setLoading(false);

      // Check if the error is due to unconfirmed email
      if (error.message.toLowerCase().includes("email not confirmed")) {
        setErrorMsg("Please confirm your email before logging in.");
      } else if (
        error.message.toLowerCase().includes("invalid login credentials")
      ) {
        setErrorMsg("Invalid email or password.");
        setLoading(false);
      } else {
        setErrorMsg(error.message);
        setLoading(false);
      }
    } else {
      setErrorMsg(null);
      router.push("/private"); // redirect to dashboard or private route
    }

    setLoading(false);
  };

  return (
    <form className="py-10 w-full" onSubmit={handleSubmit}>
      {errorMsg && <p className="text-red-500 mb-3">{errorMsg}</p>}

      <div className="flex not-md:flex-col items-center gap-4 my-3">
        <Input
          name="email"
          id="email"
          label="Email"
          inputType="email"
          placeHolder="Email"
        />

        <Input
          name="password"
          id="password"
          label="Password"
          inputType="password"
          placeHolder="Password"
        />
      </div>

      <div className="pb-2 md:pb-5 text-right">
        <p>
          Don't have an account
          <Link href={"/auth/signup"} className="text-[#ff3b59]">
            {" "}
            Signup
          </Link>
        </p>
      </div>

      {loading ? (
        <Button name="Loading..." bgColor="#ff3b59" color="white" disabled />
      ) : (
        <Button name="Get Started" bgColor="#ff3b59" color="white" />
      )}
    </form>
  );
};

export default SigninForm;
