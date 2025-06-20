import React from "react";

interface ButtonProps {
  name: string;
  bgColor: string;
  color: string;
}

const Button: React.FC<ButtonProps> = ({ name, bgColor, color }) => {
  return (
    <button
      className="px-7 py-2 rounded-md font-bold text-md  not-md:w-full cursor-pointer transition-all duration-300 ease-in-out hover:scale-105"
      style={{ backgroundColor: bgColor, color: color }}
    >
      {name}
    </button>
  );
};

export default Button;
