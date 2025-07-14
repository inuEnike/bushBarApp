import React from "react";

interface ButtonProps {
  name: string;
  bgColor: string;
  color: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset"; // ✅ Added type prop
}

const Button: React.FC<ButtonProps> = ({
  name,
  bgColor,
  disabled,
  color,
  type = "submit", // ✅ Default to submit
}) => {
  return (
    <button
      type={type} // ✅ Set the button type
      className="px-7 py-2 rounded-md font-bold text-md not-md:w-full cursor-pointer transition-all duration-300 ease-in-out hover:scale-105"
      style={{ backgroundColor: bgColor, color: color }}
      disabled={disabled}
    >
      {name}
    </button>
  );
};

export default Button;
