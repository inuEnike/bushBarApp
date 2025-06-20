"use client";
import React from "react";
import SIgnupForm from "../../components/auth/SIgnupForm";
import { ArrowLeft } from "@deemlol/next-icons";
import Link from "next/link";

const signup = () => {
  return (
    <div className="md:flex items-center h-screen md:bg-gray-100">
      <div className="w-1/2 h-screen relative auth not-md:hidden">
        <div className="rounded-[100%] bg-white w-[3%] h-[3%]  text-center flex justify-center items-center m-5 cursor-pointer">
          <Link href={"/"}>
            <ArrowLeft size={24} color="#ff3b59" />
          </Link>
        </div>
      </div>
      <div className="px-3 md:px-7 not-md:my-5">
        <div className="logo flex flex-col not-md:text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold uppercase py-2">
            <span className="text-[#ff3b59]">Bush</span>Bar
          </h2>
          <h2 className="text-xl md:text-4xl font-bold">
            Kindly Enter your Details
          </h2>{" "}
        </div>
        <SIgnupForm />
      </div>
    </div>
  );
};

export default signup;
