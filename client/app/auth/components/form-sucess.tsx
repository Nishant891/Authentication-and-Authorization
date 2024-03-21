import React from "react";
import { FiCheckCircle } from "react-icons/fi";

interface FormSucessProps {
  message: string;
}

export const FormSucess = ({ message }: FormSucessProps) => {
  if (!message) {
    return null;
  }
  return (
    <div className="w-full bg-emerald-300/75 flex items-center gap-2 p-2 rounded-md mt-4">
      <FiCheckCircle className="text-green-500" />
      <p className="text-green-500">{message}</p>
    </div>
  );
};

export default FormSucess;
