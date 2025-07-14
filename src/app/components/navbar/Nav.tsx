"use client";
import Link from "next/link";
import Button from "../Button";
import { navItems } from "../data/Navdata";
import { AlignLeft } from "@deemlol/next-icons";
import MobileNav from "./MobileNav";
import { useEffect, useState } from "react";

const Nav = () => {
  // You might still want the scroll state for styling changes (e.g., adding shadow)
  const [scroll, setScroll] = useState(false);
  const [nav, setNav] = useState(false);

  const toggleNav = () => {
    setNav(!nav);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <>
      <nav
        // Keep it fixed and apply z-index.
        // Use a higher z-index like z-[999] or z-[100] for maximum certainty.
        // The 'scroll' state can be used for other styling, like a shadow.
        className={`fixed w-full top-0 z-[999] flex items-center md:justify-around justify-between px-10 py-5 bg-white ${
          scroll ? "shadow-md" : "" // Add a shadow on scroll for visual feedback
        }`}
      >
        <div className="logo">
          <h2 className="text-2xl font-extrabold uppercase">
            ABdullahi
            <span className="text-[#ff3b59]"> BushBar</span>{" "}
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
      {/* If MobileNav also needs to be on top, ensure it also has a high z-index and appropriate positioning */}
      {nav && <MobileNav toggleNav={toggleNav} />}
    </>
  );
};

export default Nav;
