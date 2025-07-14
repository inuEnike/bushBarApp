"use client";
import Image from "next/image";
import React from "react";
import Button from "./Button";
import Link from "next/link";
import { createClient } from "../utils/supabase/clientApp";

const Listing = () => {
  const [fetchData, setFetchData] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  const fetchItems = async () => {
    const supabase = await createClient();
    setLoading(true);
    const { data: bars, error } = await supabase
      .from("bars")
      .select("*")
      .limit(4);
    if (error) {
      console.error("Error fetching bars:", error);
      setLoading(false);
      return;
    }
    setFetchData(bars ?? []);
    setLoading(false);
  };

  React.useEffect(() => {
    fetchItems();
  }, []);

  return (
    <main className="p-10 bg-gray-100 min-h-screen">
      <div className="my-10">
        <h1 className="text-center text-bushbar-pink text-4xl font-bold uppercase">
          Discover Our Unique Bush Bars
        </h1>
        <p className="text-center text-3xl font-bold uppercase py-3 text-[#ff3b59]">
          A Perfect Home for Tourists.
        </p>
      </div>
      {/* Show loading indicator */}
      {loading && (
        <div className="flex justify-center items-center py-10">
          <span className="text-bushbar-pink text-lg font-semibold">
            Loading...
          </span>
        </div>
      )}
      <div className="grid md:grid-cols-2 gap-8 py-5">
        {fetchData.map((bushBar: any, key) => (
          <div
            key={key}
            // className="flex flex-col md:flex-row bg-white rounded-lg shadow-md overflow-hidden max-w-2xl mx-auto transition-transform duration-200 hover:-translate-y-1 h-[300px]"
            className="flex flex-col md:flex-row bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-200 hover:-translate-y-1 md:w-[70%] m-auto"
          >
            <div className="relative w-full md:w-2/5 h-[250px] z-50">
              <Image
                src={bushBar.image}
                alt={bushBar.title}
                layout="fill"
                objectFit="cover"
                className="rounded-t-lg md:rounded-l-lg md:rounded-t-none z-auto"
                unoptimized
              />
            </div>

            <div className="p-4 w-full md:w-3/5 flex flex-col justify-between h-[250px]">
              <div>
                <h3 className="text-bushbar-pink text-xl font-semibold mb-1">
                  {bushBar.title}
                </h3>
                <p className="text-gray-600 text-sm mb-1">{bushBar.address}</p>
                <p className="text-gray-700 text-sm line-clamp-2 mb-3">
                  {bushBar.desc}
                </p>
              </div>
              <Link href={`/items/details/${bushBar.id}`}>
                <Button name="View Details" bgColor="#ff3b59" color="white" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center w-full my-3 md:my-12">
        <Link href="/items/details/">
          <Button name="View More" bgColor="#ff3b59" color="white" />
        </Link>
      </div>
    </main>
  );
};

export default Listing;
