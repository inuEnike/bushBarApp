import React from "react";
import hero3 from "@/app/assets/hero2.webp";
import Image from "next/image";
import { AiOutlineUser } from "react-icons/ai";
import Input from "../Input";
import Button from "../Button";
import Link from "next/link";

const SIgnupForm = () => {
  const inputChange = () => {};
  return (
    <form className="py-10 w-full">
      <div className="flex not-md:flex-col items-center gap-4 my-3">
        <Input
          name=""
          label="First Name"
          inputType="text"
          placeHolder="first name"
          value=""
          onChange={inputChange}
        />
        <Input
          name=""
          label="Last Name"
          inputType="text"
          placeHolder="last name"
          value=""
          onChange={inputChange}
        />
      </div>
      <div className="flex not-md:flex-col items-center gap-4 my-3">
        <Input
          name=""
          label="Username"
          inputType="text"
          placeHolder="username"
          value=""
          onChange={inputChange}
        />
        <Input
          name=""
          label="Phone Number"
          inputType="phone"
          placeHolder="Phone Number"
          value=""
          onChange={inputChange}
        />
      </div>
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
          Already having an account{" "}
          <Link href={"/auth/login"} className="text-[#ff3b59]">
            Login
          </Link>
        </p>
      </div>
      <Button name="Get Started" bgColor="#ff3b59" color="white" />
    </form>
  );
};

export default SIgnupForm;
