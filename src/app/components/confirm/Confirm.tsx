import { X } from "@deemlol/next-icons";
import React from "react";
import check from "@/app/assets/check.svg";
import Image from "next/image";

const Confirm = () => {
  return (
    <div className="fixed top-0 left-0 bg-[rgba(0,0,0,0.5)] w-full h-[100vh] z-[100]">
      <div className="flex  bg-white md:w-[30%] h-[50vh] flex-col m-auto rounded-b-2xl">
        <button className="flex justify-end p-3">
          <X size={24} color="#000" />
        </button>
        <div className="flex flex-col items-center my-10">
          <Image src={check} alt="check" width={100} height={100} />
          <h2 className="text-2xl font-bold text-center mt-4">
            Your account has been created successfully!
          </h2>
          <p className="text-md text-gray-600 mt-2">
            You can now log in and start using our services, Thanks.
          </p>
          <button className="mt-6 px-6 py-2 bg-[#ff3b59] text-white rounded-md font-bold transition-all duration-300 hover:scale-105">
            Go to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
