"use client";
import React, { useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import Button from "../../Button";
import { createClient } from "@/app/utils/supabase/clientApp";
import { Navigation } from "@deemlol/next-icons";
import { useRouter } from "next/navigation";

export default function DefaultInputs() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    address: "",
    stars: "",
    price: "",
    desc: "",
    imageFile: null as File | null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;
    if (name === "image" && files) {
      setFormData((prev) => ({ ...prev, imageFile: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    let imageUrl = "";

    try {
      // Upload image
      if (formData.imageFile) {
        const file = formData.imageFile;
        const fileName = `public/${file.name}`;

        const { error: uploadError } = await supabase.storage
          .from("bushbar-images")
          .upload(fileName, file, { upsert: true });

        if (uploadError) {
          console.error("Image upload failed:", uploadError.message);
          return;
        }

        const {
          data: { publicUrl },
        } = supabase.storage.from("bushbar-images").getPublicUrl(fileName);

        imageUrl = publicUrl;
      }

      // Insert bar data
      const { error: insertError } = await supabase.from("bars").insert([
        {
          title: formData.title,
          address: formData.address,
          stars: Number(formData.stars),
          price: Number(formData.price),
          desc: formData.desc,
          image: imageUrl,
        },
      ]);

      if (insertError) {
        console.error("Insert error:", insertError.message);
        return;
      }

      alert("Bar added successfully!");
      router.push("/private");
      // Reset form
      setFormData({
        title: "",
        address: "",
        stars: "",
        price: "",
        desc: "",
        imageFile: null,
      });
    } catch (err: any) {
      console.error("Submission failed:", err.message || err);
    }
  };

  return (
    <ComponentCard title="Add Bars">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label>Title</Label>
          <Input
            name="title"
            type="text"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>Address</Label>
          <Input
            name="address"
            type="text"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>Stars</Label>
          <Input
            name="stars"
            type="number"
            placeholder="Stars"
            value={formData.stars}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>Price</Label>
          <Input
            name="price"
            type="number"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>Description</Label>
          <textarea
            name="desc"
            rows={15}
            className="w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
            placeholder="Description"
            value={formData.desc}
            onChange={handleChange}
          ></textarea>
        </div>
        <div>
          <Label>Image</Label>
          <input
            name="image"
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="focus:border-ring-brand-300 h-11 w-full overflow-hidden rounded-lg border border-gray-300 bg-transparent text-sm text-gray-500 shadow-theme-xs transition-colors file:mr-5 file:border-collapse file:cursor-pointer file:rounded-l-lg file:border-0 file:border-r file:border-solid file:border-gray-200 file:bg-gray-50 file:py-3 file:pl-3.5 file:pr-3 file:text-sm file:text-gray-700 placeholder:text-gray-400 hover:file:bg-gray-100 focus:outline-hidden focus:file:ring-brand-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400 dark:file:border-gray-800 dark:file:bg-white/[0.03] dark:file:text-gray-400 dark:placeholder:text-gray-400 dark:focus:border-brand-800"
          />
        </div>

        <Button name="Add Bars" bgColor="#ff3b59" color="white" type="submit" />
      </form>
    </ComponentCard>
  );
}
