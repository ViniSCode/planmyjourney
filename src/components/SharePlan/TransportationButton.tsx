import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  transportation?: boolean;
}

export function TransportationButton({
  children,
  transportation,
  ...rest
}: Props) {
  return (
    <button
      type="button"
      className={`dark:button-blue-bg button-blue-bg bg-gray-200 rounded-lg w-12 h-12 flex items-center justify-center text-gray-700 ${
        transportation === true && "bg-pink-500 text-white"
      }`}
      {...rest}
    >
      {children}
    </button>
  );
}
