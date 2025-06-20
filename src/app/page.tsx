import Image from "next/image";
import Nav from "./components/navbar/Nav";
import Hero from "./components/hero/Hero";
import About from "./components/about/About";
import Listing from "./components/Listing";

export default function Home() {
  return (
    <div className="">
      <Nav />
      <Hero />
      <About />
      <Listing />
    </div>
  );
}
