import Image from "next/image";
import React from "react";
import Head from "next/head";
import { DUMMY_BUSHBARS } from "./data/items";
import Button from "./Button";

const Listing = () => {
  return (
    <main className="p-10 bg-gray-100 min-h-screen">
      <div className="my-10">
        <h1 className="text-center text-bushbar-pink text-4xl font-bold  uppercase">
          Discover Our Unique Bush Bars
        </h1>
        <p className="text-center text-3xl font-bold uppercase py-3 text-[#ff3b59]">
          A Perect Home for tourists.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-8 py-5">
        {DUMMY_BUSHBARS.map((bushBar: any, key) => (
          <div
            className="flex flex-col md:flex-row bg-white rounded-lg shadow-md overflow-hidden mb-5 max-w-2xl mx-auto transition-transform duration-200 hover:-translate-y-1"
            key={key}
          >
            <div className="relative w-full md:w-2/5 min-h-[200px] md:min-h-0">
              <Image
                src={bushBar.imageUrl}
                alt={bushBar.name}
                layout="fill"
                objectFit="cover"
                className="rounded-t-lg md:rounded-l-lg md:rounded-t-none" // Adjusts border-radius for responsiveness
              />
            </div>

            <div className="p-5 w-full md:w-3/5 flex flex-col justify-between">
              <h3 className="text-bushbar-pink text-2xl font-semibold mb-2">
                {bushBar.name}
              </h3>

              <p className="text-gray-600 text-sm mb-1">{bushBar.location}</p>

              <p className="text-gray-700 text-base leading-relaxed mb-4 flex-grow">
                {bushBar.description}
              </p>
              <Button name="View Details" bgColor="#ff3b59" color="white" />
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center w-full my-3 md:my-12">
        <Button name="View More" bgColor="#ff3b59" color="white" />
      </div>
    </main>
  );
};

export default Listing;
