"use client";

import React, { useState } from "react";
import Input from "../Input";
import Button from "../Button";
import Link from "next/link";
import { createClient } from "@/app/utils/supabase/clientApp";
import { useRouter } from "next/navigation";

const SignupForm = () => {
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

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: "http://localhost:3000/auth/login",
        data: {
          username: formData.get("username"),
          phone: formData.get("phone"),
          first_name: formData.get("first_name"),
          last_name: formData.get("last_name"),
        },
      },
    });

    // Handle Supabase error
    if (error) {
      if (error.message.includes("Signups not allowed")) {
        setErrorMsg("Signups are currently disabled.");
      } else if (error.message.includes("User already registered")) {
        setErrorMsg("User with that email already exists.");
      } else {
        setErrorMsg(error.message);
      }
    } else {
      // Handle scenario where user is created but email is not confirmed
      if (data.user && !data.session) {
        setErrorMsg(
          "Account created. Please check your email to confirm, or Login."
        );
      } else {
        setErrorMsg(null);
        router.push("/auth/login");
      }
    }

    setLoading(false);
  };

  return (
    <form className="py-10 w-full" method="post" onSubmit={handleSubmit}>
      {errorMsg && <p className="text-red-500 mb-3">{errorMsg}</p>}

      <div className="flex not-md:flex-col items-center gap-4 my-3">
        <Input
          name="first_name"
          id="first_name"
          label="First Name"
          inputType="text"
          placeHolder="First Name"
        />
        <Input
          name="last_name"
          id="last_name"
          label="Last Name"
          inputType="text"
          placeHolder="Last Name"
        />
      </div>

      <div className="flex not-md:flex-col items-center gap-4 my-3">
        <Input
          name="username"
          id="username"
          label="Username"
          inputType="text"
          placeHolder="Username"
        />
        <Input
          name="phone"
          id="phone"
          label="Phone Number"
          inputType="text"
          placeHolder="Phone Number"
        />
      </div>

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
          Already have an account?{" "}
          <Link href={"/auth/login"} className="text-[#ff3b59]">
            Login
          </Link>
        </p>
      </div>
      {loading ? (
        <Button name="Loading" bgColor="#ff3b59" color="white" disabled />
      ) : (
        <Button name="Get Started" bgColor="#ff3b59" color="white" />
      )}
    </form>
  );
};

export default SignupForm;
