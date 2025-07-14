import Image from "next/image";
import Nav from "./components/navbar/Nav";
import Hero from "./components/hero/Hero";
import About from "./components/about/About";
import Listing from "./components/Listing";
import Footer from "./components/footer/footer";

export default function Home() {
  return (
    <div className="">
      <Nav />
      <Hero />
      <About />
      <Listing />
      <Footer />
    </div>
  );
}
