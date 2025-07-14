"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { createClient } from "@/app/utils/supabase/clientApp";
import Image from "next/image";
import hero3 from "../../assets/bushbar2.jpeg";
import Nav from "@/app/components/navbar/Nav";
import Button from "@/app/components/Button";
import { AiOutlineUser } from "react-icons/ai";

const ReservationForm = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    fromTime: "",
    toTime: "",
  });
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const barId = params?.id as string;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const supabase = createClient();

    const { error } = await supabase.from("reservations").insert({
      bar_id: barId,
      full_name: form.fullName,
      email: form.email,
      phone: form.phone,
      from_time: form.fromTime,
      to_time: form.toTime,
    });

    if (!error) {
      await fetch("/api/sendAdminEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: form.fullName,
          email: form.email,
          phone: form.phone,
          fromTime: form.fromTime,
          toTime: form.toTime,
          barId,
        }),
      });

      alert("Reservation successful!");
      setForm({
        fullName: "",
        email: "",
        phone: "",
        fromTime: "",
        toTime: "",
      });
    } else {
      alert("Reservation failed. Please try again.");
    }

    setLoading(false);
  };

  return (
    <>
      <Nav />

      <div className="container mx-auto px-4 py-20 my-10 md:my-20">
        <h1 className="text-3xl font-bold text-center mb-10">
          Make a Reservation
        </h1>

        <div className="flex flex-col md:flex-row items-center gap-10">
          {/* Image Section */}
          <div className="w-full md:w-1/2">
            <Image
              src={hero3}
              alt="hero image"
              className="rounded-lg w-full h-auto object-cover"
              priority
            />
          </div>

          {/* Form Section */}
          <form
            onSubmit={handleSubmit}
            className="w-full md:w-[70%] space-y-6 bg-white p-6 rounded-2xl shadow-lg"
          >
            {/* Input Fields */}
            {[
              {
                label: "Full Name",
                name: "fullName",
                type: "text",
                placeholder: "Enter your full name",
              },
              {
                label: "Email",
                name: "email",
                type: "email",
                placeholder: "Enter your email",
              },
              {
                label: "Phone Number",
                name: "phone",
                type: "tel",
                placeholder: "Enter your phone number",
              },
              { label: "From Time", name: "fromTime", type: "datetime-local" },
              { label: "To Time", name: "toTime", type: "datetime-local" },
            ].map(({ label, name, type, placeholder = "" }) => (
              <div key={name}>
                <label className="block text-sm font-medium mb-1">
                  {label}
                </label>
                <div className="flex items-center bg-gray-100 px-3 py-2 rounded-xl shadow-inner">
                  <AiOutlineUser size={20} className="text-gray-500" />
                  <input
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    value={(form as any)[name]}
                    onChange={handleChange}
                    className="ml-2 w-full bg-transparent focus:outline-none text-sm text-gray-700"
                    required
                  />
                </div>
              </div>
            ))}

            {/* Buttons */}
            <div className="flex flex-col md:flex-row gap-4">
              {loading ? (
                <Button
                  name="Submitting..."
                  bgColor="#ff3b59"
                  color="white"
                  type="button"
                  disabled={true}
                />
              ) : (
                <Button
                  name="Make Reservation"
                  bgColor="#ff3b59"
                  color="white"
                  type="submit"
                />
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ReservationForm;
