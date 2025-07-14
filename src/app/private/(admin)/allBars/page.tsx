"use client";
import React from "react";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  BoxIconLine,
  GroupIcon,
} from "@/app/icons";
import { createClient } from "@/app/utils/supabase/clientApp";
import Badge from "@/app/components/ui/badge/Badge";
import Image from "next/image";

type Bar = {
  id: number;
  title: string;
  address: string;
  stars: number;
  price: number;
  desc: string;
  image: string;
};

const EcommerceMetrics = () => {
  const [fetchData, setFetchData] = React.useState<Bar[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  const fetchItems = async () => {
    const supabase = await createClient();
    setLoading(true);
    const { data: bars, error } = await supabase.from("bars").select("*");
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
    <>
      <h2 className="text-4xl text-white uppercase font-bold py-7">All Bars</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
        {/* Reservation Metric */}
        {fetchData.map((bar, key) => (
          <div
            className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6"
            key={key}
          >
            {/* 🖼️ Image on Top */}
            <div className="mb-4">
              <Image
                src={bar?.image || "Loading"} // 🔁 Replace with dynamic or actual image path
                alt={bar?.title || "Bar Image"}
                width={300}
                height={100}
                className="w-full h-48 object-cover rounded-xl text-white"
                unoptimized
              />
            </div>

            {/* 📍 Title + Address */}
            <div className="mt-5">
              <h4 className="text-xl font-bold text-gray-800 dark:text-white/90">
                {bar?.title || "Loading..."}
              </h4>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {bar?.address || "Loading...."}
              </p>
            </div>

            {/* 📝 Description */}
            <div className="mt-4">
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {bar?.desc || "Loading..."}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default EcommerceMetrics;
