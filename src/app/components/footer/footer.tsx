import Link from "next/link";
import React from "react";
import Button from "../Button";
import { navItems } from "../data/Navdata";
import Input from "../Input";

const Footer = () => {
  return (
    <div>
      <div className="my-7 mx-7 py-7 grid md:grid-cols-3 gap-4 grid-cols-1 md:gap-6">
        <div className="flex flex-col items-center">
          <div className="logo">
            <h2 className="text-2xl font-extrabold uppercase">
              ABdullahi
              <span className="text-[#ff3b59]"> BushBar</span>{" "}
            </h2>
            <p className="text-sm text-gray-500 my-5">
              Lorem ipsum dolor sit amet consectetur <br />
              adipisicing elit. Explicabo harum dolores tempore.
            </p>
          </div>
        </div>
        <div className=" flex justify-center items-center flex-col my-5">
          <ul className="flex items-center flex-wrap justify-center gap-7 text-md font-bold">
            {navItems.map((item, id) => (
              <li className="" key={id}>
                <Link href={item.link}> {item.name}</Link>
              </li>
            ))}
          </ul>

          <ul className="flex my-7 ">
            <Link href={"/auth/login"}>
              {" "}
              <Button name="Login" bgColor="transparent" color="black" />
            </Link>
            <Link href={"/auth/signup"}>
              {" "}
              <Button name="Signup" bgColor="#ff3b59" color="white" />
            </Link>
          </ul>
        </div>
        <div className="w-[80%] m-auto">
          <Input
            name="email"
            id="email"
            label="Signup to our newsletter"
            inputType="email"
            placeHolder="Email"
          />
        </div>
      </div>
      <div className=" text-center my-5">
        <p className="text-xl text-gray-500 uppercase italic ">
          Always a vicoty !!!!
        </p>
      </div>
    </div>
  );
};

export default Footer;
