"use client";
import Link from "next/link";
import Button from "../Button";
import { navItems } from "../data/Navdata";
import { AlignLeft } from "@deemlol/next-icons";
import MobileNav from "./MobileNav";
import { useEffect, useState } from "react";

const Nav = () => {
  const [scroll, setScroll] = useState(false);
  const [nav, setNav] = useState(false);

  const toggleNav = () => {
    setNav(!nav);
  };
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 10);
    });
  });

  return (
    <>
      <nav
        className={`flex items-center md:justify-around justify-between px-10 py-5 fixed w-full top-0 bg-white ${
          scroll ? "sticky" : ""
        }`}
      >
        <div className="logo">
          <h2 className="text-2xl font-extrabold uppercase">
            <span className="text-[#ff3b59]">Bush</span>Bar{" "}
          </h2>
        </div>

        <ul className="md:flex items-center gap-7 text-sm hidden">
          {navItems.map((item, id) => (
            <li className="" key={id}>
              <Link href={item.link}> {item.name}</Link>
            </li>
          ))}
        </ul>

        <ul className="md:flex hidden items-center px-2">
          <Link href={"/auth/login"}>
            {" "}
            <Button name="Login" bgColor="transparent" color="black" />
          </Link>
          <Link href={"/auth/signup"}>
            {" "}
            <Button name="Signup" bgColor="#ff3b59" color="white" />
          </Link>
        </ul>

        <div className="md:hidden" onClick={toggleNav}>
          <button>
            <AlignLeft size={24} color="#000" />
          </button>
        </div>
      </nav>
      {nav && <MobileNav toggleNav={toggleNav} />}
    </>
  );
};

export default Nav;
