import React from "react";
import { AiOutlineUser } from "react-icons/ai";

interface IInput {
  name: string;
  label: string;
  inputType: string;
  placeHolder: string;
  value?: string;
  id: string;
}
const Input: React.FC<IInput> = ({
  name,
  inputType,
  label,
  placeHolder,
  id,
  value,
}) => {
  return (
    <div className="input flex flex-col w-full">
      <label htmlFor="">{label}</label>
      <div className="flex shadow-sm items-center w-full my-2 md:my-5 px-5 ">
        <AiOutlineUser size={20} />
        <input
          name={name}
          type={inputType}
          className="focus:outline-none py-4 px-3 w-90"
          required
          id={id}
          placeholder={`Enter your ${placeHolder}`}
          value={value}
        />
      </div>
    </div>
  );
};

export default Input;
