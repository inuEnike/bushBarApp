"use client";
import React from "react";
import Button from "../Button";
import Image from "next/image";
import hero from "../../assets/bushbar1.webp";
import hero2 from "../../assets/bushbar2.jpeg";
import hero3 from "../../assets/bushbar3.webp";
import Link from "next/link";
import { Typewriter } from "react-simple-typewriter";

const Hero = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between px-10 py-20 md:py-30 w-full md:w-[80%] m-auto h-[100vh]">
      <div className="w-full md:w-[50%] not-md:text-center flex-wrap">
        <p className="text-md font-extrabold text-[#999999] py-3">
          Your favorite place for relaxation and fun.
        </p>
        <h1 className="text-3xl md:text-4xl text-[#03231E] uppercase font-extrabold py-3 md:leading-12">
          Discover a unique blend of great pleasure. <br />
          Perfect<span className="text-[#ff3b59]"> home </span> for
          <span className="text-[#ff3b59]">
            <Typewriter
              cursor
              cursorBlinking
              delaySpeed={1000}
              deleteSpeed={25}
              loop={0}
              typeSpeed={75}
              words={[" tourists", " tourism"]}
            />
          </span>
        </h1>
        <Link href={"/auth/signup"}>
          <Button name="Get Started" bgColor="#ff3b59" color="white" />
        </Link>
        <p className="text-sm font-semibold text-[#999999] py-3">
          Try BushBar for free for 7 days. No credit card required.
        </p>
      </div>
      <div className="w-full md:w-[50%] flex justify-center items-center not-md:mt-10">
        <div className="grid grid-cols-2 gap-3">
          <Image src={hero} alt="hero image" className="w-full md:w-[100%]" />
          <Image src={hero} alt="hero image" className="w-full md:w-[70%]" />
          <Image src={hero2} alt="hero image" className="w-full md:w-[75%]" />
          <Image src={hero3} alt="hero image" className="w-full md:w-[70%]" />
          <Image src={hero} alt="hero image" className="w-full md:w-[70%]" />
          <Image src={hero} alt="hero image" className="md:hidden w-[100%]" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
