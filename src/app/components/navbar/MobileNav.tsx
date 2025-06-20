import React from "react";
import { navItems } from "../data/Navdata";
import Link from "next/link";
import Button from "../Button";
import { X } from "@deemlol/next-icons";

interface NavProp {
  toggleNav: () => void;
}

const MobileNav: React.FC<NavProp> = ({ toggleNav }) => {
  return (
    <div
      className="bg-[rgba(0,0,0,0.18)] w-full z-50 fixed top-0 h-[100vh] md:hidden"
      style={{
        animationDuration: "0.7s",
        animationName: "fadeInLeft",
        animationTimingFunction: "ease-in-out",
      }}
    >
      <div className=" bg-[#f0f0ec] h-[100vh] w-full sm:w-[55%] md:hidden">
        <div className="flex flex-col justify-evenly h-full px-10">
          <div className="logo flex justify-between gap-10 items-center">
            <h2 className="text-2xl font-extrabold uppercase">
              <span className="text-[#ff3b59]">Bush</span>Bar
            </h2>
            <button onClick={toggleNav}>
              <X size={24} color="#000" />
            </button>
          </div>
          <ul className="flex items-center flex-col justify-between text-center gap-20 text-md ">
            {navItems.map((item, id) => (
              <li className="" key={id}>
                <Link href={item.link}> {item.name}</Link>
              </li>
            ))}
          </ul>
          <ul className="flex items-center justify-between gap-5 px-2">
            <Link href={"/auth/login"}>
              {" "}
              <Button name="Login" bgColor="#ff3b59" color="white" />
            </Link>
            <Link href={"/auth/signup"}>
              {" "}
              <Button name="Signup" bgColor="#ff3b59" color="white" />
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
