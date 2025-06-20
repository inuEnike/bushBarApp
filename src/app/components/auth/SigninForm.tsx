import React, { useState } from "react";
import Input from "../Input";
import Button from "../Button";
import Link from "next/link";
import { Loader } from "@deemlol/next-icons";

const SigninForm = () => {
  const [loading, setLoading] = useState(false);

  const isLoading = () => {
    loading && <Loader size={24} color="#FFFFFF" />;
  };
  const inputChange = () => {};
  return (
    <form className="py-10 w-full">
      <div className="flex not-md:flex-col items-center gap-4 my-3">
        <Input
          name=""
          label="Email"
          inputType="email"
          placeHolder="last name"
          value=""
          onChange={inputChange}
        />

        <Input
          name=""
          label="Password"
          inputType="password"
          placeHolder="password"
          value=""
          onChange={inputChange}
        />
      </div>
      <div className="pb-2 md:pb-5 text-right">
        <p>
          Don't have an account{" "}
          <Link href={"/auth/signup"} className="text-[#ff3b59]">
            Signup
          </Link>
        </p>
      </div>
      <Button name="Login" bgColor="#ff3b59" color="white" />
    </form>
  );
};

export default SigninForm;
