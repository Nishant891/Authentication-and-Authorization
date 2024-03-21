import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";

interface FormErrorProps {
  message: string;
}

export const FormError = ({ message }: FormErrorProps) => {
  if (!message) {
    return null;
  }
  return (
    <div className="w-full bg-red-300/75 flex items-center gap-2 p-2 rounded-md mt-4">
      <FaExclamationTriangle className="text-red-500" />
      <p className="text-red-500">{message}</p>
    </div>
  );
};

export default FormError;
