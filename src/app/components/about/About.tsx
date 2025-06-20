import Image from "next/image";
import React from "react";
import hero3 from "../../assets/hero4.webp";

const About: React.FC = () => (
  <section className="about-section py-12 px-4 bg-gray-50">
    <div className="max-w-3xl mx-auto text-center">
      <Image
        src={hero3}
        alt="BushBar interior"
        className="mx-auto mb-6 rounded-lg shadow-lg w-full max-w-md"
        width={400}
        height={300}
        priority
      />
      <h2 className="text-3xl font-bold mb-4 text-green-800">About BushBar</h2>
      <p className="text-lg text-gray-700 mb-6">
        Welcome to BushBar, your go-to destination for authentic local cuisine
        and a vibrant atmosphere. We are passionate about bringing people
        together to enjoy great food, refreshing drinks, and unforgettable
        experiences.
      </p>
      <p className="text-gray-600">
        Whether you're here for a casual meal, a night out with friends, or a
        special celebration, our team is dedicated to making your visit
        memorable. Thank you for choosing BushBar!
      </p>
    </div>
  </section>
);

export default About;
