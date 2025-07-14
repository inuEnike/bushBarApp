import Button from "@/app/components/Button";
import Nav from "@/app/components/navbar/Nav";
import { createClient } from "@/app/utils/supabase/clientApp";
import { Star } from "@deemlol/next-icons";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AiFillStar } from "react-icons/ai";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function ItemDetails({ params }: PageProps) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("bars")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !data) {
    notFound(); // or return a custom <NotFound /> component
  }

  return (
    <>
      <Nav />
      <div className="flex flex-col-reverse md:flex-row-reverse items-center justify-between gap-5 md:px-10 px-10 md:py-30 w-full md:w-[60%] m-auto h-[100vh]">
        <div className=" md:w-[50%]">
          <h1 className="text-4xl font-bold py-5">{data.title}</h1>
          <p className="text-lg py-5">Location: {data.address}</p>
          <p className="text-gray-700 py-5">
            <span className="font-bold">Description: </span>
            <br />
            {data.desc}
          </p>
          <div className="py-5 flex gap-5 items-center">
            <span className="text-lg font-semibold">Rating: </span>
            {Array.from({ length: 5 }).map((_, i) => (
              // <Star  />
              <AiFillStar
                size={20}
                key={i}
                color={i < data.stars ? "red" : "gray"}
              />
            ))}
          </div>
          <p className="text-lg font-semibold py-5">
            Price:{" "}
            <span className="text-bushbar-pink"> &#8358; {data.price}.00</span>
          </p>

          <Link href={`/reservations/${data.id}`}>
            <Button name="Make Reservations" bgColor="#ff3b59" color="white" />
          </Link>
        </div>

        {data.image && (
          <img
            src={data.image}
            alt={data.title}
            className="rounded-lg max-w-md border border-gray-200 rounded-bl-4xl rounded-e-4xl"
          />
        )}
      </div>
    </>
  );
}
